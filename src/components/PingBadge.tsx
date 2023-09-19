import { FC } from "react"
import clsx from "clsx"

type Props = {
  className?: string
  color: 'amber' | 'red'
}

const PingBadge: FC<Props> = ({ className, color }) => (
  <span className={clsx('absolute flex h-3 w-3 -top-1 -right-1', className)}>
    <span
      className={clsx(
        'absolute shadow-sm',
        'inline-flex h-full w-full rounded-full',
        'opacity-75 animate-ping',
        {
          amber: 'bg-amber-500',
          red: 'bg-red-500',
        }[color],
      )}
    />
    <span
      className={clsx(
        'relative shadow-sm',
        'inline-flex h-3 w-3 rounded-full',
        {
          amber: 'bg-amber-400',
          red: 'bg-red-400',
        }[color],
      )}
    />
  </span>
)

export default PingBadge
