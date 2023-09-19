import Robot2d from "./Robot2d"
import Surface2d from "./Surface2d"

export type RobotInstructionResponse = {
  isLost: boolean
}

export type RobotInstructionCallback =
  (robot: Robot2d, surface: Surface2d) => RobotInstructionResponse

export type RobotInstruction = {
  key: string
  name: string
  execute: RobotInstructionCallback
}

const createInstruction = (
  key: string,
  name: string,
  execute: RobotInstructionCallback,
): RobotInstruction => {
  if (key.length !== 1)
    throw new Error(`Invalid robot instruction key: ${key}`)
  return { key, name, execute }
}

export const moveForwardInstruction = createInstruction('F', 'Forward', (robot, surface) => {
  const [nextX, nextY] = robot.computeForwardPosition(1)

  if (!surface.isOutOfBounds(nextX, nextY)) {
    robot.moveTo(nextX, nextY)
    return { isLost: false }
  }

  if (surface.hasEntity(Robot2d.entities.SCENT, robot.x, robot.y)) {
    return { isLost: false }
  }

  surface.createEntity(Robot2d.entities.SCENT, robot.x, robot.y)
  return { isLost: true }
})

export const turnLeftInstruction = createInstruction('L', 'Turn Left', (robot) => {
  robot.turnBy(-90)
  return { isLost: false }
})

export const turnRightInstruction = createInstruction('R', 'Turn Right', (robot) => {
  robot.turnBy(90)
  return { isLost: false }
})
