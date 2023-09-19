import { ComponentPropsWithoutRef, FC, useId } from "react"
import { ChevronUpDownIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

type Props = Omit<ComponentPropsWithoutRef<'select'>, 'id'> & {
  label: string
}

const InputSelect: FC<Props> = ({ className, label, ...props }) => {
  const id = useId()

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="px-1.5 font-medium text-neutral-400">{label}</label>
      <div className="relative">
        <select
          {...props}
          id={id}
          className={clsx(
            'w-full px-3 py-2 rounded-md',
            'bg-white/70 border border-neutral-200/80',
            'text-neutral-500 shadow-sm',
            // Remove the default chevron from the select element:
            'appearance-none',
            'focus:outline-blue-500',
          )}
        />
        <ChevronUpDownIcon className="absolute top-1/2 right-1.5 -translate-y-1/2 w-5 h-5 stroke-2 text-neutral-500" />
      </div>
    </div>
  )
}

export default InputSelect
