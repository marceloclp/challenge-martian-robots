import { FC, useEffect, useRef } from "react"
import { useSnapshot } from "valtio"
import { CommandLineIcon, PauseCircleIcon, PlayCircleIcon, PlayPauseIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

import { ExplorationStatus, state, toggleExploration } from "@/components/state"
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

  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Whenever a new exploration starts, we need to reset the horizontal
    // scroll position of the slider back to zero:
    if (sliderRef.current)
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' })
  }, [explorationId])

  useEffect(() => {
    if (!sliderRef.current) return
    if (instructionIndex >= sliderRef.current.children.length) return

    const sliderElem = sliderRef.current
    const itemElem = sliderElem.children[instructionIndex] as HTMLElement

    const sliderWidth = sliderElem.getBoundingClientRect().width
    const sliderScrollLeft = sliderElem.scrollLeft
    const itemOffset = itemElem.offsetLeft

    const scrollOffset = itemOffset - (sliderWidth + sliderScrollLeft)

    if (scrollOffset > 0) {
      // Scroll the currently active instruction item into view
      sliderElem.scrollBy({ left: scrollOffset, behavior: 'smooth' })
    }
  }, [instructionIndex])
  
  const isExplorationLost = explorationStatus === ExplorationStatus.LOST
  const isExplorationPlaying = explorationStatus === ExplorationStatus.PLAYING

  const isActive = (index: number) => index === instructionIndex
  const isPastActive = (index: number) => index < instructionIndex

  const getInstructionKey = (index: number) => `instruction-${explorationId}-${index}`

  return (
    <div className="flex flex-col gap-1">
      <h6 className="px-1.5 font-medium text-neutral-400">Instructions</h6>
      <div
        ref={sliderRef}
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

const ExplorationToggleButton: FC = () => {
  const { explorationStatus } = useSnapshot(state)

  const isPlaying = explorationStatus === ExplorationStatus.PLAYING
  const isPaused = explorationStatus === ExplorationStatus.PAUSED
  const isOngoing = isPlaying || isPaused

  const icon = (
    (isPlaying && <PauseCircleIcon className="w-5 h-5 stroke-[2.5]" />) ||
    (isPaused && <PlayCircleIcon className="w-5 h-5 stroke-[2.5]" />) ||
    <PlayPauseIcon className="w-5 h-5 stroke-[2.5]" />
  )

  const text = (
    (isPlaying && 'Pause exploration') ||
    (isPaused && 'Resume exploration') ||
    'No active exploration'
  )

  return (
    <button
      onClick={toggleExploration}
      type="button"
      className={clsx(
        'flex items-center gap-2',
        'py-2.5 px-6 pr-8 rounded-md',
        'font-semibold',
        'bg-slate-200/50 hover:bg-slate-200/100',
        'text-slate-500/70 hover:text-slate-500/90',
        'disabled:cursor-not-allowed',
        'duration-75 ease-in-out',
      )}
      disabled={!isOngoing}
    >
      {icon} {text}
    </button>
  )
}

const PanelExploration: FC = () => (
  <Panel icon={CommandLineIcon} title="Exploration">
    <div className="flex flex-col gap-5">
      <RobotInformation />
      <InstructionSlider />
      <div className="flex flex-row gap-3">
        <ExplorationToggleButton />
      </div>
    </div>
  </Panel>
)

export default PanelExploration
