import { Movement } from "../extensions/renderable/foreground-canvas/asset/movement.ts/base.movement"
import { Cell, AssetTile } from "./map"

export type Speed = 1 | 2 | 4 | 8 | 16 | 32 | 64

export class Asset {
  public id: string
  public selected: boolean
  public assetTile: AssetTile
  public movement: Movement
  public moving = false
  public animating = true
  
  // location
  public cell: Cell
  public gridId: string
  public elevationIndex: number
  public posX = 0
  public posY = 0
  public posZ = 0  
}

export class SpriteAnimation {
  public changeEveryNthFrame: Speed = 16
  public spriteXPosition = [0, 26, 52, 26]
  public spriteYPosition = 0
  public positionCounter = 0
}
