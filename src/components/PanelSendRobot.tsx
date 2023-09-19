import { FC, FormEventHandler } from "react"
import { RocketLaunchIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

import { Direction } from "@/types"
import InputField from "@/components/InputField"
import InputSelect from "@/components/InputSelect"
import Panel from "@/components/Panel"
import { TEMP_HEIGHT, TEMP_WIDTH } from "@/components/Grid"
import { startExploration } from "@/components/state"

/**
 * Since our form is very simple, there is no need to use 3rd party libraries
 * like react-hook-form or Zod.
 * 
 * To keep the application snappy and lag-free we are embracing uncontrolled
 * components here and reading the input field values directly from the DOM as
 * the form is submitted.
 * 
 * It may look weird to have an event handler outside a component trigger a
 * state update, but that is possible thanks to `valtio`. This means all our
 * event handlers are stable and are not going to trigger rerenders - this
 * component, for example, rerenders ZERO times.
 */
const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault()

  const x = parseInt(event.currentTarget['x'].value)
  const y = parseInt(event.currentTarget['y'].value)
  const direction = event.currentTarget['direction'].value as Direction
  const instructions = event.currentTarget['instructions'].value as string

  startExploration(x, y, direction, instructions)
}

const PanelSendRobot: FC = () => (
  <Panel icon={RocketLaunchIcon} title="Send robot">
    <form className="grid grid-cols-4 gap-5" onSubmit={onSubmit}>
      <InputField label="X" name="x" type="number" defaultValue={0} min={0} max={TEMP_WIDTH - 1} required />
      <InputField label="Y" name="y" type="number" defaultValue={0} min={0} max={TEMP_HEIGHT - 1} required />
      <InputSelect label="Direction" name="direction" className="col-span-2">
        <option value="N" defaultChecked>North (Top)</option>
        <option value="E">East (Right)</option>
        <option value="S">South (Bottom)</option>
        <option value="W">West (Left)</option>
      </InputSelect>
      <InputField label="Instructions" name="instructions" type="text" minLength={1} required className="col-span-4" />
      <button
        type="submit"
        className={clsx(
          'col-start-3 col-span-2',
          'flex items-center justify-center',
          'py-2.5 px-6 pr-8 rounded-md',
          'font-semibold',
          'bg-blue-200/50 hover:bg-blue-200/70',
          'text-blue-500',
          'duration-75 ease-in-out',
        )}
      >
        Deploy
      </button>
    </form>
  </Panel>
)

export default PanelSendRobot
