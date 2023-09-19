import { ComponentPropsWithoutRef, FC, PointerEventHandler } from "react"
import { proxy, useSnapshot } from "valtio"
import clsx from "clsx"

const MAX_PAN_X = Infinity
const MAX_PAN_Y = Infinity

const INITIAL_PAN_X = 600
const INITIAL_PAN_Y = 300

const panState = proxy({
  panX: INITIAL_PAN_X,
  panY: INITIAL_PAN_Y,
  isPanning: false,
})

const onPointerMove: PointerEventHandler = ({ movementX, movementY }) => {
  if (!panState.isPanning) return
  panState.panX = Math.min(MAX_PAN_X, Math.max(-MAX_PAN_X, panState.panX + movementX))
  panState.panY = Math.min(MAX_PAN_Y, Math.max(-MAX_PAN_Y, panState.panY + movementY))
}
const onPointerDown: PointerEventHandler = () => panState.isPanning = true
const onPointerUp: PointerEventHandler = () => panState.isPanning = false
const onPointerLeave: PointerEventHandler = () => panState.isPanning = false
const onLostPointerCapture: PointerEventHandler = () => panState.isPanning = false

type Props = ComponentPropsWithoutRef<'svg'>

const PannableSVG: FC<Props> = ({ children, className, ...props }) => {
  const { panX, panY, isPanning } = useSnapshot(panState)
  
  const panTransform = `translate(${panX}, ${panY})`

  return (
    <svg
      width="100%"
      height="100%"
      {...props}
      className={clsx(
        isPanning ? 'cursor-grabbing' : 'cursor-grab',
        className,
      )}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onLostPointerCapture={onLostPointerCapture}
    >
      <g transform={panTransform}>
        {children}
      </g>
    </svg>
  )
}

export default PannableSVG
