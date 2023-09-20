import { FC, PropsWithChildren } from "react"
import type { PlayCircleIcon } from '@heroicons/react/24/solid'
import clsx from "clsx"

type Props = PropsWithChildren<{
  className?: string
  title: string
  icon?: typeof PlayCircleIcon
}>

const Panel: FC<Props> = ({ children, className, title, icon: Icon }) => (
  <section
    className={clsx(
      'relative',
      'w-full p-6 pt-10',
      'bg-white/70 backdrop-blur-md drop-shadow',
      'border border-neutral-200/80',
      'rounded-lg',
      className,
    )}
  >
    <span
      className={clsx(
        'flex items-center gap-2',
        'absolute top-0 left-0',
        '-translate-y-1/2 translate-x-6',
        'px-4 py-1.5 rounded-full',
        'bg-white/80 backdrop-blur-md',
        'border border-neutral-200/80',
        'font-medium text-neutral-500',
      )}
    >
      {Icon && (
        <Icon className="w-5 h-5 stroke-[2.5]" />
      )}
      {title}
    </span>
    <div className="flex-grow">{children}</div>
  </section>
)

export default Panel
