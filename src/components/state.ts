import Robot2d from "@/lib/Robot2d"
import { Direction } from "@/types"
import { proxy } from "valtio"

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

export const state = proxy({
  robot: new Robot2d(0, 0, 'N'),
  explorationId: 0,
  explorationStatus: ExplorationStatus.PAUSED,
  instructions: [] as ProcessedInstruction[],
  instructionIndex: 1,
})

export const startExploration = (x: number, y: number, direction: Direction, instructions: string) => {
  state.robot = new Robot2d(x, y, direction)

  state.explorationId += 1
  state.explorationStatus = ExplorationStatus.PLAYING

  state.instructions = instructions.split('').map((command) => ({ command }))
  state.instructionIndex = 1
}
