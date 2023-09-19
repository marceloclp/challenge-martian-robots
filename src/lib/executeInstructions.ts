import Robot2d from "./Robot2d"
import { RobotInstruction } from "./RobotInstruction"
import Surface2d from "./Surface2d"

export default function executeInstructions(
  surface: Surface2d,
  robot: Robot2d,
  instructions: string,
  instructionArray: RobotInstruction[]
) {
  const instructionMap = new Map(
    instructionArray.map((instruction) => [instruction.key, instruction])
  )

  for (const instructionKey of instructions) {
    const instruction = instructionMap.get(instructionKey)

    if (!instruction)
      throw new Error(
        `Invalid instruction ${instructionKey}. You either passed an invalid ` +
        `instruction or forgot to add the instruction to the instruction array.`
      )
    
    const result = instruction.execute(robot, surface)

    if (result.isLost)
      return `${robot.x} ${robot.y} ${robot.direction} LOST`
  }

  return `${robot.x} ${robot.y} ${robot.direction}`
}
