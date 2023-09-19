import { FC, useMemo } from "react"

export const GRID_CELL_SIZE_PX = 100
export const GRID_CELL_SPACING_PX = 6

// TEMP: hard coded for now
const width = 10
const height = 10

export const getGridX = (x: number) =>
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
export const getGridY = (y: number) =>
  (height - 1 - y) * (GRID_CELL_SIZE_PX + GRID_CELL_SPACING_PX)

/**
 * Each grid layout (width x height) is unique given its height (as it's the
 * only thing that needs to mapped to a different coordinate system, as per
 * above). By making sure the grid cell keys reflect that we can optimize the
 * layout to only render when the height has changed.
 */
const getGridCellKey = (x: number, y: number) =>
  `grid-cell-${getGridX(x)}-${getGridY(y)}`

const Grid: FC = () => {
  const cells = useMemo(() => {
    return Array(height).fill(0).map((_, y) =>
      Array(width).fill(0).map((_, x) => ({ x, y, key: getGridCellKey(x, y) }))
    ).flat()
  }, [])

  return (
    <svg className="fixed top-0 left-0 w-screen h-screen">
      {cells.map(({ x, y, key }) => (
        <rect key={key} x={getGridX(x)} y={getGridY(y)} width={GRID_CELL_SIZE_PX} height={GRID_CELL_SIZE_PX} rx={6} />
      ))}
    </svg>
  )
}

export default Grid
