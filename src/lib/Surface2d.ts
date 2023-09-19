export default class Surface2d {
  constructor(rightX: number, upperY: number) {
    if (rightX <= 0)
      throw new Error(`rightX can't be lower or equal to the origin X coordinate`)
    if (upperY <= 0)
      throw new Error(`upperY can't be lower or equal to the origin Y coordinate`)
    this._width = rightX + 1
    this._height = upperY + 1
  }

  private _width: number
  private _height: number

  private readonly _entities: Record<string, boolean> = {}

  get width() { return this._width }
  get height() { return this._height }
  get entities() { return this._entities }

  getEntityKey(type: string, x: number, y: number) {
    return [type, x, y].join('_')
  }

  createEntity(type: string, x: number, y: number) {
    this._entities[this.getEntityKey(type, x, y)] = true
  }

  removeEntity(type: string, x: number, y: number) {
    delete this._entities[this.getEntityKey(type, x, y)]
  }

  hasEntity(type: string, x: number, y: number) {
    return this.getEntityKey(type, x, y) in this._entities
  }

  isOutOfBounds(x: number, y: number) {
    return (x < 0 || y < 0 || x >= this.width || y >= this.height)
  }
}
