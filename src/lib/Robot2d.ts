import { Direction } from "@/types"

export default class Robot2d {
  static entities = {
    SCENT: 'scent',
  }

  private _x: number
  private _y: number
  private _rotation: number

  constructor(x: number, y: number, direction: Direction) {
    this._x = x
    this._y = y
    this._rotation = { N: 0, E: 90, S: 180, W: 270 }[direction]
  }

  get x() { return this._x }
  get y() { return this._y }
  get rotation() { return this._rotation }

  get direction() {
    // Normalize degrees within the range [0, 360)
    const degrees = (this.rotation % 360 + 360) % 360

    switch (degrees) {
      case 0: return 'N'
      case 90: return 'E'
      case 180: return 'S'
      case 270: return 'W'
      default: return 'N'
    }
  }

  computeForwardPosition(distance: number): [number, number] {
    // Normalize degrees within the range [0, 360)
    const degrees = (this.rotation % 360 + 360) % 360

    switch (degrees) {
      case 0: return [this.x, this.y + distance]
      case 90: return [this.x + distance, this.y]
      case 180: return [this.x, this.y - distance]
      case 270: return [this.x - distance, this.y]
      default: return [this.x, this.y]
    }
  }

  moveTo(x: number, y: number): void {
    this._x = x
    this._y = y
  }

  turnBy(degrees: number): void {
    this._rotation += degrees
  }

  isEqual(robot: Robot2d) {
    return (
      this.x === robot.x &&
      this.y === robot.y &&
      this.rotation === robot.rotation
    )
  }
}
