import { Movement } from "../extensions/renderable/foreground-canvas/asset/base.movement"
import { Cell } from "./map"

export class Asset {
  public id: string

  // location
  public cell: Cell
  public gridId: string
  public elevationIndex: number

  // image
  public animating = true
  public moving = false
  public animationFrame = 16
  public imageUrl: string
  public frameXPosition = [0, 26, 52, 26]
  public frameYPosition = 0
  public frameCounter = 0
  public positionX = 0
  public positionY = 0
  public selected: boolean
  public offsetX = -8
  public offsetY = -58

  // movement
  public movement: Movement
}

