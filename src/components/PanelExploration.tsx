import { FC } from "react"
import { useSnapshot } from "valtio"
import { CommandLineIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

import { ExplorationStatus, state } from "@/components/state"
import InputField from "@/components/InputField"
import Panel from "@/components/Panel"
import PingBadge from "@/components/PingBadge"

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

const InstructionSlider: FC = () => {
  const {
    explorationId,
    instructions,
    instructionIndex,
    explorationStatus,
  } = useSnapshot(state)
  
  const isExplorationLost = explorationStatus === ExplorationStatus.LOST
  const isExplorationPlaying = explorationStatus === ExplorationStatus.PLAYING

  const isActive = (index: number) => index === instructionIndex
  const isPastActive = (index: number) => index < instructionIndex

  const getInstructionKey = (index: number) => `instruction-${explorationId}-${index}`

  return (
    <div className="flex flex-col gap-1">
      <h6 className="px-1.5 font-medium text-neutral-400">Instructions</h6>
      <div
        className={clsx(
          'h-14 w-full p-2 rounded-md overflow-scroll',
          'flex flex-row items-center gap-2',
          'border border-neutral-300/60',
        )}
      >
        {instructions.map(({ command, isInvalid, isSkipped }, index) => (
          <div
            key={getInstructionKey(index)}
            className={clsx(
              'h-full min-w-[36px] max-w-[36px] rounded-md',
              'relative flex items-center justify-center',
              'font-mono font-bold text-white',
              // Apply colors based on the active/lost status:
              (
                (isExplorationLost && isActive(index) && 'bg-red-400') ||
                (isActive(index) && 'bg-blue-500') ||
                ('bg-neutral-400')
              ),
              isPastActive(index) && 'bg-opacity-50',
              isExplorationPlaying && isActive(index) && 'animate-pulse',
              'duration-300 ease-in-out',
              'select-none',
            )}
          >
            {isSkipped && <PingBadge color="amber" />}
            {isInvalid && <PingBadge color="red" />}
            {command}
          </div>
        ))}
      </div>
    </div>
  )
}

const PanelExploration: FC = () => (
  <Panel icon={CommandLineIcon} title="Exploration">
    <div className="flex flex-col gap-5">
      <RobotInformation />
      <InstructionSlider />
    </div>
  </Panel>
)

export default PanelExploration
