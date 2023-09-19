import { ComponentPropsWithoutRef, FC, useId } from "react"
import clsx from "clsx"

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'id'> & {
  label: string
}

const InputField: FC<Props> = ({ className, label, ...props }) => {
  const id = useId()

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="px-1.5 font-medium text-neutral-400">{label}</label>
      <div className="relative">
        <input
          {...props}
          id={id}
          className={clsx(
            'w-full px-3 py-2 rounded-md',
            'bg-white/70 border border-neutral-200/80',
            'text-neutral-500',
            // Remove shadow on read-only inputs so we can use it as a simple
            // text container later on
            'shadow-sm read-only:shadow-none',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
          )}
        />
      </div>
    </div>
  )
}

export default InputField
