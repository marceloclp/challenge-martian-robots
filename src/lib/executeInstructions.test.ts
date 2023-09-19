import Robot2d from "./Robot2d"
import { moveForwardInstruction, turnLeftInstruction, turnRightInstruction } from "./RobotInstruction"
import Surface2d from "./Surface2d"
import executeInstructions from "./executeInstructions"

const execute = (surface: Surface2d, robot: Robot2d, instructions: string) =>
  executeInstructions(surface, robot, instructions, [
    moveForwardInstruction,
    turnLeftInstruction,
    turnRightInstruction,
  ])

describe('executeInstructions()', () => {
  it('should throw an error if an invalid instruction is passed', () => {
    const surface = new Surface2d(5, 3)
    const robot = new Robot2d(1, 1, 'W')
    expect(() => {
      execute(surface, robot, 'X')
    }).toThrowError()
  })

  it('should report the final position of the robot when it has finished all instructions', () => {
    const surface = new Surface2d(5, 3)
    const robot = new Robot2d(1, 1, 'E')
    const response = execute(surface, robot, 'RFRFRFRF')
    expect(response).toBe('1 1 E')
  })

  it('should report the position BEFORE falling of the robot when it has fallen off the surface', () => {
    const surface = new Surface2d(5, 3)
    const robot = new Robot2d(3, 2, 'N')
    const response = execute(surface, robot, 'FRRFLLFFRRFLL')
    expect(response).toBe('3 3 N LOST')
  })

  describe('when a robot falls off the surface', () => {
    let surface = new Surface2d(5, 3)

    beforeEach(() => {
      surface = new Surface2d(5, 3)
      const robot = new Robot2d(3, 2, 'N')
      execute(surface, robot, 'FRRFLLFFRRFLL')
    })

    it('should leave a scent at the position it occupied before falling', () => {
      expect(surface.hasEntity(Robot2d.entities.SCENT, 3, 3)).toBe(true)
    })

    it('the next robot should use its scent to avoid falling off again at the same position', () => {
      const robot = new Robot2d(0, 3, 'W')
      const response = execute(surface, robot, 'LLFFFLFLFL')
      expect(response).toBe('2 3 S')
    })
  })

  describe('when a robot has left a scent at one of the EDGES of the surface', () => {
    let surface = new Surface2d(3, 3)

    beforeEach(() => {
      surface = new Surface2d(3, 3)
      const robot = new Robot2d(0, 1, 'E')
      // Robot will fall off at (4, 1), scent is left at (3, 1):
      execute(surface, robot, 'FFFFFFFF')
    })

    it('the next robot should use its scent to avoid falling off again at the same position', () => {
      const robot = new Robot2d(0, 1, 'E')
      const response = execute(surface, robot, 'FFFFFF')
      expect(response).toBe('3 1 E')
    })
  })

  describe('when a robot has left a scent at one of the CORNERS of the surface', () => {
    let surface = new Surface2d(3, 3)

    beforeEach(() => {
      surface = new Surface2d(3, 3)
      const robot = new Robot2d(3, 0, 'W')
      // Robot will fall off at (-1, 0), scent is left at the corner (0, 0):
      execute(surface, robot, 'FFFFFFFF')
    })

    it('the next robot should avoid falling off when moving vertically', () => {
      const robot = new Robot2d(0, 3, 'S')
      const response = execute(surface, robot, 'FFFFFFF')
      expect(response).toBe('0 0 S')
    })

    it('the next robot should avoid falling off when moving horizontally', () => {
      const robot = new Robot2d(3, 0, 'W')
      const response = execute(surface, robot, 'FFFFFF')
      expect(response).toBe('0 0 W')
    })
  })
})
