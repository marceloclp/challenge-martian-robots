import { proxy, snapshot } from "valtio"

import Robot2d from "@/lib/Robot2d"
import Surface2d from "@/lib/Surface2d"
import executeInstructions from "@/lib/executeInstructions"
import {
  moveForwardInstruction,
  turnLeftInstruction,
  turnRightInstruction,
} from "@/lib/RobotInstruction"

import { Direction } from "@/types"

const INSTRUCTION_TICK_DELAY_MS = 1000

export enum ExplorationStatus {
  LOST = 'lost',
  PLAYING = 'playing',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export type ProcessedInstruction = {
  command: string
  isSkipped?: boolean
  isInvalid?: boolean
}

/**
 * To process each instruction in a wait-process loop (so that we can animate
 * the UI nicely), we will use a timeout loop. We will the store the currently
 * running timeout tick here so we can clear before starting another tick. This
 * is an important step necessary to prevent memory leaks.
 */
let timeout: NodeJS.Timeout

export const state = proxy({
  surface: new Surface2d(5, 5),
  robot: new Robot2d(0, 0, 'N'),
  robotInstructions: [
    moveForwardInstruction,
    turnLeftInstruction,
    turnRightInstruction,
  ],
  explorationId: 0,
  explorationStatus: ExplorationStatus.PAUSED,
  instructions: [] as ProcessedInstruction[],
  instructionIndex: 1,
})

const setStatus = (status: ExplorationStatus) => state.explorationStatus = status
const setSkippedInstruction = (index: number) => state.instructions[index].isSkipped = true
const setInvalidInstruction = (index: number) => state.instructions[index].isInvalid = true

/**
 * 
 */
const executeInstruction = () => {
  const {
    surface,
    robot,
    robotInstructions,
    instructions,
    instructionIndex,
  } = state

  const robotBeforeExecution = snapshot(robot) as Robot2d
  const { command } = instructions[instructionIndex]

  try {
    const report = executeInstructions(surface, robot, command, robotInstructions)

    if (report.includes('LOST'))
      return setStatus(ExplorationStatus.LOST)

    if (robot.isEqual(robotBeforeExecution))
      setSkippedInstruction(instructionIndex)
    
    if (instructionIndex === instructions.length - 1)
      return setStatus(ExplorationStatus.COMPLETED)
  } catch {
    setInvalidInstruction(instructionIndex)
  }
}

const executeTick = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    // Skip tick if the exploration was paused during the tick delay:
    if (state.explorationStatus !== ExplorationStatus.PLAYING) return
    // Fail-safe check to ensure we never try to execute an invalid instruction
    // due to some unexpected race condition (?)
    if (state.instructionIndex >= state.instructions.length) return

    executeInstruction()

    if (state.instructionIndex < state.instructions.length - 1)
      state.instructionIndex += 1

    if (state.explorationStatus === ExplorationStatus.PLAYING) executeTick()
  }, INSTRUCTION_TICK_DELAY_MS)
}

export const startExploration = (x: number, y: number, direction: Direction, instructions: string) => {
  state.robot = new Robot2d(x, y, direction)

  state.instructions = instructions.split('').map((command) => ({ command }))
  state.instructionIndex = 0

  state.explorationId += 1
  state.explorationStatus = ExplorationStatus.PLAYING

  executeTick()
}

export const toggleExploration = () => {
  if (state.explorationStatus === ExplorationStatus.PAUSED)
    return setStatus(ExplorationStatus.PLAYING) && executeTick()
  if (state.explorationStatus === ExplorationStatus.PLAYING)
    return setStatus(ExplorationStatus.PAUSED)
}
