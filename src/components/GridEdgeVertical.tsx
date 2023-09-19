import { FC } from "react"
import clsx from "clsx"
import {
  GRID_CELL_SIZE_PX,
  GRID_CELL_SPACING_PX,
  GRID_EDGE_SIZE_PX,
  GRID_EDGE_SPACING_PX,
  getGridY,
} from "./Grid"

const GridEdgeVertical: FC<{ height: number }> = ({ height }) => {
  const translateX = -GRID_CELL_SPACING_PX - GRID_EDGE_SIZE_PX - GRID_EDGE_SPACING_PX
  const translateY = 0

  return (
    <g
      transform={`translate(${translateX}, ${translateY})`}
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
}

export default GridEdgeVertical
