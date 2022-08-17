import { GSM } from '../game-state-manager.service'
import { PlaceableAsset } from '../models/asset.model'
import { RenderingLayers } from '../models/map'
import { Renderer } from '../models/renderer'
import { AssetTile } from '../models/sprite-tile.model'


export class ObjectRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.ObjectLayer
 
  public onDraw(asset: PlaceableAsset<AssetTile>, frame?: number, opacity: number = 1 ): void {
    const movementOffsetX = asset.movement ? asset.movement.movementOffset.x : asset.anchorCell.position.x
    const movementOffsetY = asset.movement ? asset.movement.movementOffset.y : asset.anchorCell.position.y

    this.ctx.globalAlpha = opacity
    this.ctx.drawImage(
      GSM.ImageController.getImage(asset.tile.imageUrl),
      asset.animation.xMotionTilePos[asset.animation.positionCounter],
      asset.animation.yDirectionTilePos[asset.orientation.currentOrientation],
      asset.attributes.drawSize.x,
      asset.attributes.drawSize.y,
      movementOffsetX + asset.attributes.xPosOffset,
      movementOffsetY + asset.attributes.yPosOffset - (asset.baseZIndex * GSM.Settings.blockSize),
      asset.attributes.drawSize.x,
      asset.attributes.drawSize.y
    )
    this.ctx.globalAlpha = 1
  }
}
