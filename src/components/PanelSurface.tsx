import { FC, FormEventHandler } from "react"
import { GlobeAltIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

import {
  DEFAULT_SURFACE_RIGHT_X,
  DEFAULT_SURFACE_UPPER_Y,
  updateSurface,
} from "@/components/state"
import InputField from "@/components/InputField"
import Panel from "@/components/Panel"

/**
 * 
 */
const onUpdateSurface: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault()

  const x = parseInt(event.currentTarget['x'].value)
  const y = parseInt(event.currentTarget['y'].value)

  updateSurface(x, y)
}

const UpdateSurfaceForm: FC = () => (
  <form className="grid grid-cols-2 gap-5" onSubmit={onUpdateSurface}>
    <InputField name="x" label="Right-X" type="number" min={1} defaultValue={DEFAULT_SURFACE_RIGHT_X} />
    <InputField name="y" label="Upper-Y" type="number" min={1} defaultValue={DEFAULT_SURFACE_UPPER_Y} />
    <button
      type="submit"
      className={clsx(
        'col-start-2',
        'flex items-center justify-center gap-2',
        'py-2.5 px-6 pr-8 rounded-md',
        'font-semibold',
        'bg-slate-200/50 hover:bg-slate-200/100',
        'text-slate-500/70 hover:text-slate-500/90',
        'disabled:cursor-not-allowed',
        'duration-75 ease-in-out',
      )}
    >
      Update
    </button>
  </form>
)

const PanelSurface: FC = () => (
  <Panel icon={GlobeAltIcon} title="Surface">
    <div className="flex flex-col gap-3">
      <UpdateSurfaceForm />
    </div>
  </Panel>
)

export default PanelSurface
