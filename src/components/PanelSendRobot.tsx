import { FC, FormEventHandler } from "react"
import { RocketLaunchIcon } from "@heroicons/react/24/solid"

import { Direction } from "@/types"
import Panel from "@/components/Panel"
import { TEMP_HEIGHT, TEMP_WIDTH } from "@/components/Grid"

/**
 * 
 */
const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault()

  const x = parseInt(event.currentTarget['x'].value)
  const y = parseInt(event.currentTarget['y'].value)
  const direction = event.currentTarget['direction'].value as Direction
  const instructions = event.currentTarget['instructions'].value as string

  // TODO: do something with the new robot
  console.log({ x, y, direction, instructions })
}

const PanelSendRobot: FC = () => (
  <Panel icon={RocketLaunchIcon} title="Send robot">
    <form className="grid grid-cols-4 gap-5" onSubmit={onSubmit}>
      <input name="x" type="number" defaultValue={0} min={0} max={TEMP_WIDTH - 1} />
      <input name="y" type="number" defaultValue={0} min={0} max={TEMP_HEIGHT - 1} />
      <select name="direction" className="col-span-2">
        <option value="N" defaultChecked>North (Top)</option>
        <option value="E">East (Right)</option>
        <option value="S">South (Bottom)</option>
        <option value="W">West (Left)</option>
      </select>
      <input name="instructions" type="text" min={1} required className="col-span-4" placeholder="Instructions" />
      <button type="submit" className="bg-blue-100 col-start-3 col-span-2">Deploy</button>
    </form>
  </Panel>
)

export default PanelSendRobot
