import { Movement } from "../extensions/character/movement.ts/base.movement"
import { Cell, Position, Size } from "./map"
import { AssetTile } from "./sprite-tile.model"

export type Speed = 1 | 2 | 4 | 8 | 16 | 32 | 64



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
