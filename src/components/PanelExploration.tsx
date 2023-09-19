import { FC } from "react"
import { useSnapshot } from "valtio"
import { CommandLineIcon } from "@heroicons/react/24/solid"

import { state } from "@/components/state"
import InputField from "@/components/InputField"
import Panel from "@/components/Panel"

const RobotInformation: FC = () => {
  const {
    robot: { x, y, direction },
  } = useSnapshot(state)

  return (
    <div className="grid grid-cols-3 gap-5">
      <InputField label="X" readOnly disabled value={x} />
      <InputField label="Y" readOnly disabled value={y} />
      <InputField label="Direction" readOnly disabled value={direction} />
    </div>
  )
}

const PanelExploration: FC = () => (
  <Panel icon={CommandLineIcon} title="Exploration">
    <div className="flex flex-col gap-5">
      <RobotInformation />
    </div>
  </Panel>
)

export default PanelExploration
