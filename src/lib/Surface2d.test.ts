import Surface2d from "./Surface2d"

describe('Surface2d', () => {
  it('should throw an error when rightX is lower or equal to 0', () => {
    expect(() => new Surface2d(-1, 10)).toThrowError()
    expect(() => new Surface2d(0, 10)).toThrowError()
  })

  it('should throw an error when upperY is lower or equal to 0', () => {
    expect(() => new Surface2d(10, -1)).toThrowError()
    expect(() => new Surface2d(10, 0)).toThrowError()
  })

  describe('given a surface whose upper-right coordinate is (5, 5)', () => {
    const surface = new Surface2d(5, 5)

    it('should not be out of bounds at the origin', () => {
      expect(surface.isOutOfBounds(0, 0)).toBe(false)
    })

    it('should not be out of bounds at the upper-right coordinate', () => {
      expect(surface.isOutOfBounds(5, 5)).toBe(false)
    })

    it('should be out of bounds when x is smaller than 0', () => {
      expect(surface.isOutOfBounds(-1, 3)).toBe(true)
    })

    it('should be out of bounds when x is greater than 5', () => {
      expect(surface.isOutOfBounds(10, 3)).toBe(true)
    })

    it('should be out of bounds when y is smaller than 0', () => {
      expect(surface.isOutOfBounds(3, -1)).toBe(true)
    })

    it('should be out of bounds when y is greater than 5', () => {
      expect(surface.isOutOfBounds(3, 10)).toBe(true)
    })
  })
})
