import { FC } from "react"
import clsx from "clsx"
import {
  GRID_CELL_SIZE_PX,
  GRID_EDGE_SIZE_PX,
  getGridX,
  getGridY,
} from "./Grid"

const GridEdgeHorizontal: FC<{ width: number }> = ({ width }) => {
  const translateX = 0
  const translateY = getGridY(-1) + GRID_EDGE_SIZE_PX

  return (
    <g
      transform={`translate(${translateX}, ${translateY})`}
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
}

export default GridEdgeHorizontal
