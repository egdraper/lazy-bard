import { assetTileAnimation } from "src/app/game/db/animation.db";

export class SpriteDirection {
  down: number
  left: number
  right: number  
  up: number
}

export class AssetAnimationTile {
  id: string
  xMotionTilePos: number[]
  yDirectionTilePos: SpriteDirection
}

export class SpriteAnimation {
  public changeEveryNthFrame: number = 16;
  public positionCounter = 0;
  public xMotionTilePos: number[]
  public yDirectionTilePos: SpriteDirection

  constructor(animationTileId: string) {
    const animationTile = assetTileAnimation.find(animationTile => animationTile.id === animationTileId)
    this.xMotionTilePos = animationTile.xMotionTilePos
    this.yDirectionTilePos = animationTile.yDirectionTilePos
  }
}