import { FC, useMemo } from "react"
import { useSnapshot } from "valtio"
import clsx from "clsx"

import { ExplorationStatus, state } from "@/components/state"
import PannableSVG from "@/components/PannableSVG"

export const GRID_CELL_SIZE_PX = 100
export const GRID_CELL_SPACING_PX = 6
export const GRID_EDGE_SIZE_PX = 6
export const GRID_EDGE_SPACING_PX = 4

const getGridX = (x: number) =>
  x * (GRID_CELL_SIZE_PX + GRID_CELL_SPACING_PX)

/**
 * The surface's y coordinates goes up as its height increases, while in an SVG
 * coordinate system, the y goes down as the height increases. For this reason,
 * we need to invert the y before computing the position inside the SVG grid.
 * 
 * We could overcome this by applying a simple transform to the contents of the
 * SVG, but this will cause confusion when handling rotations (as they will be
 * rotated towards the opposite direction), translating elements and scaling.
 */
const getGridY = (y: number) =>
  (state.surface.height - 1 - y) * (GRID_CELL_SIZE_PX + GRID_CELL_SPACING_PX)

const GridEdgeX: FC<{ width: number }> = ({ width }) => (
  <g
    transform={`translate(0, ${getGridY(-1) + GRID_EDGE_SIZE_PX})`}
    className={clsx(
      'fill-amber-400',
      'text-amber-500/30',
      'font-mono text-4xl font-bold',
      'select-none',
    )}
  >
    {Array(width).fill(0).map((_, x) => (
      <g key={x} transform={`translate(${getGridX(x)}, 0)`}>
        <rect width={GRID_CELL_SIZE_PX} height={GRID_EDGE_SIZE_PX} />
        <text
          x={GRID_CELL_SIZE_PX / 2}
          y={20}
          alignmentBaseline="hanging"
          textAnchor="middle"
          fill="currentColor"
        >
          {x}
        </text>
      </g>
    ))}
  </g>
)

const GridEdgeY: FC<{ height: number }> = ({ height }) => (
  <g
    transform={`translate(${-GRID_CELL_SPACING_PX - GRID_EDGE_SIZE_PX - GRID_EDGE_SPACING_PX}, 0)`}
    className={clsx(
      'fill-rose-400',
      'text-rose-500/30',
      'font-mono text-4xl font-bold',
      'select-none',
    )}
  >
    {Array(height).fill(0).map((_, y) => (
      <g key={y} transform={`translate(0, ${getGridY(y)})`}>
        <rect width={GRID_EDGE_SIZE_PX} height={GRID_CELL_SIZE_PX} />
        <text
          x={-20}
          y={GRID_CELL_SIZE_PX / 2}
          alignmentBaseline="middle"
          textAnchor="end"
          fill="currentColor"
        >
          {y}
        </text>
      </g>
    ))}
  </g>
)

const GridRobot: FC = () => {
  const {
    explorationStatus,
    robot: { x, y, rotation },
  } = useSnapshot(state)

  const translate = `translate(${getGridX(x)}, ${getGridY(y)})`
  // Rotate by an additional 180deg as the pin icon is initially pointing south:
  const rotate = `rotate(${rotation + 180}) scale(0.85)`

  const outerPathClassName = clsx('delay-300 duration-300 ease-in-out', {
    [ExplorationStatus.PAUSED]: 'stroke-slate-400 fill-slate-100',
    [ExplorationStatus.PLAYING]: 'stroke-green-600 fill-green-200',
    [ExplorationStatus.COMPLETED]: 'stroke-slate-400 fill-slate-100 opacity-70',
    [ExplorationStatus.LOST]: 'stroke-red-600 fill-red-200 opacity-50',
  }[explorationStatus])

  const innerPathClassName = clsx('delay-300 duration-300 ease-in-out', {
    [ExplorationStatus.PAUSED]: 'stroke-slate-400 fill-slate-200 animate-pulse',
    [ExplorationStatus.PLAYING]: 'stroke-green-700 fill-green-400 animate-pulse',
    [ExplorationStatus.COMPLETED]: 'stroke-slate-400 fill-slate-200 opacity-70',
    [ExplorationStatus.LOST]: 'stroke-red-400 fill-red-200 opacity-50',
  }[explorationStatus])

  return (
    <g transform={translate} className="origin-center duration-300 ease-in-out">
      <svg width="100" height="100" viewBox="0 0 24 24" className="stroke-2">
        <g className="origin-center duration-300 ease-in-out" transform={rotate}>
          <path xmlns="http://www.w3.org/2000/svg" d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" strokeLinecap="round" strokeLinejoin="round" className={outerPathClassName} />
          <path xmlns="http://www.w3.org/2000/svg" d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" strokeLinecap="round" strokeLinejoin="round" className={innerPathClassName} />
        </g>
      </svg>
    </g>
  )
}

/**
 * Each grid layout (width x height) is unique given its height (as it's the
 * only thing that needs to mapped to a different coordinate system, as per
 * above). By making sure the grid cell keys reflect that we can optimize the
 * layout to only render when the height has changed.
 */
const getGridCellKey = (x: number, y: number) =>
  `grid-cell-${getGridX(x)}-${getGridY(y)}`

const Grid: FC = () => {
  const {
    surface: { width, height },
  } = useSnapshot(state)

  const cells = useMemo(() => {
    return Array(height).fill(0).map((_, y) =>
      Array(width).fill(0).map((_, x) => ({ x, y, key: getGridCellKey(x, y) }))
    ).flat()
  }, [height, width])

  return (
    <PannableSVG className="fixed top-0 left-0 w-screen h-screen">
      <GridEdgeX width={width} />
      <GridEdgeY height={height} />
      {cells.map(({ x, y, key }) => (
        <rect key={key} x={getGridX(x)} y={getGridY(y)} width={GRID_CELL_SIZE_PX} height={GRID_CELL_SIZE_PX} rx={6} className="fill-gray-200" />
      ))}
      <GridRobot />
    </PannableSVG>
  )
}

export default Grid
