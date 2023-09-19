import executeInstructions from "./executeInstructions"

describe('executeInstructions()', () => {
  it('should throw an error if an invalid instruction is passed', () => {})

  it('should report the final position of the robot when it has finished all instructions')

  it('should report the position BEFORE falling of the robot when it has fallen off the surface')

  describe('when a robot falls off the surface', () => {
    it('should leave a scent at the position it occupied before falling')

    it('the next robot should use its scent to avoid falling off again at the same position')
  })

  describe('when a robot has left a scent at one of the EDGES of the surface', () => {
    it('the next robot should use its scent to avoid falling off again at the same position')
  })

  describe('when a robot has left a scent at one of the CORNERS of the surface', () => {
    it('the next robot should avoid falling off when moving vertically')

    it('the next robot should avoid falling off when moving horizontally')
  })
})
