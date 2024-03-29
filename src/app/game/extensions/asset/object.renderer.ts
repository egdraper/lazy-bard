import { GSM } from '../../game-state-manager.service'
import { Asset, AssetBlock } from '../../models/asset.model'
import { RenderingLayers } from '../../models/map'
import { Renderer } from '../../models/renderer'
import { AssetTile } from '../../models/sprite-tile.model'


export class ObjectRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.ObjectLayer
 
  public onDraw(asset: Asset<AssetTile>, frame?: number, opacity: number = 1 ): void {
    const movementOffsetX = asset.movement ? asset.movement.movementOffset.x : asset.anchorCell.position.x
    const movementOffsetY = asset.movement ? asset.movement.movementOffset.y : asset.anchorCell.position.y

    this.ctx.globalAlpha = opacity
    this.ctx.drawImage(
      GSM.ImageController.getImage(asset.tile.imageUrl),
      asset.tile.assetDrawRules.xMotionTilePos[asset.animation.positionCounter],
      asset.tile.assetDrawRules.yDirectionTilePos[asset.animation.orientation.currentOrientation],
      asset.tile.assetDrawRules.drawSize.x,
      asset.tile.assetDrawRules.drawSize.y,
      movementOffsetX + asset.tile.assetDrawRules.xPosOffset,
      movementOffsetY + asset.tile.assetDrawRules.yPosOffset - (asset.baseZIndex * GSM.Settings.blockSize),
      asset.tile.assetDrawRules.drawSize.x,
      asset.tile.assetDrawRules.drawSize.y
    )
    this.ctx.globalAlpha = 1
  }
}
