import WorldObject from './WorldObject'

export default class Character extends WorldObject {
  constructor(config, tileWidth, tileHeight) {
    super(config, tileWidth, tileHeight)

    this.lastAction = null
  }

  step() {

  }

  move(x, y) {
    this.x += x
    this.y += y
  }
}