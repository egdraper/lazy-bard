import { Movement } from "../extensions/renderable/foreground-canvas/asset/movement.ts/base.movement"
import { Cell, Size } from "./map"
import { AssetTile } from "./sprite-tile.model"

export type Speed = 1 | 2 | 4 | 8 | 16 | 32 | 64

export class Asset {
  public id: string
  public selected: boolean
  public assetTile: AssetTile
  public movement: Movement
  public moving = false
  public animating = false
  
  // location
  public cell: Cell
  public gridId: string
  public elevationIndex: number
  public posX = 0
  public posY = 0
  public posZ = 0  
}

export class WalkStepSpritePos {
  rightFootForward: number
  neutral: number
  leftFootForward: number  
}

export class WalkStepSpriteDirection {
  down: number
  left: number
  right: number  
  up: number
}

export class AssetItemsViewModel {
  id: string
  size: Size
  drawSize: Size
  xWalkPos: number[]
  yWalkPos: WalkStepSpriteDirection
  xPosOffset: number
  yPosOffset: number
}
