import { getTopAssetBlockingCell } from '../../controllers/utils/selected-sprite-tile'
import { GSM } from '../../game-state-manager.service'
import { Asset } from '../../models/asset.model'
import { RenderingLayers } from '../../models/map'
import { Renderer } from '../../models/renderer'
import { AssetTile } from '../../models/sprite-tile.model'


export class AssetRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.AssetLayer

  public beforeDraw(asset: Asset, frame?: number): void {
    this.ctx.fillStyle = '#424247'
    this.ctx.beginPath()

    const topAsset = GSM.AssetController.getTopAssetPerCell(asset.blocks, RenderingLayers.TerrainLayer)
    const movementOffsetX = asset.movement ? asset.movement.movementOffset.x : asset.blocks.position.x
    const movementOffsetY = asset.movement ? asset.movement.movementOffset.y : asset.blocks.position.y

    const walkOverAsset = getTopAssetBlockingCell(asset.blocks)
    let shadowZ = asset.zIndex
    if(walkOverAsset && walkOverAsset.zIndex <= shadowZ ) {
      shadowZ = walkOverAsset ? walkOverAsset.zIndex * GSM.Settings.blockSize : 0
    } 

    this.ctx.ellipse(
      movementOffsetX + GSM.Settings.blockSize / 2,
      (movementOffsetY + (GSM.Settings.blockSize / 2)) - ((topAsset ? topAsset.zIndex : 0) * GSM.Settings.blockSize),
       8, 
       4, 
       0, 
       0, 
       Math.PI * 2
       )   
    this.ctx.fill()
  }
 
  //   if(asset.hovering) {
  //     this.ctx.beginPath()
  //     this.ctx.fillStyle = '#aaaaff'
  //     this.ctx.globalAlpha = .5
  //     this.ctx.ellipse(
  //       asset.movement.movementOffset.x + GSM.Settings.blockSize / 2,
  //       asset.movement.movementOffset.y + GSM.Settings.blockSize / 2 - (asset.zIndex * GSM.Settings.blockSize) + 5,
  //       8, 
  //       4, 
  //       0, 
  //       0, 
  //       Math.PI * 2
  //     )   
  //     this.ctx.fill()
  //     this.ctx.globalAlpha = 1
  //   }
  // }

  public onDraw(asset: Asset<AssetTile>): void {
    const movementOffsetX = asset.movement ? asset.movement.movementOffset.x : asset.blocks.position.x
    const movementOffsetY = asset.movement ? asset.movement.movementOffset.y : asset.blocks.position.y

    this.ctx.drawImage(
      GSM.ImageController.getImage(asset.tile.imageUrl),
      asset.tile.assetDrawRules.xMotionTilePos[asset.animation.positionCounter],
      asset.tile.assetDrawRules.yDirectionTilePos[asset.animation.orientation.currentOrientation],
      asset.tile.assetDrawRules.size.x,
      asset.tile.assetDrawRules.size.y,
      movementOffsetX + asset.tile.assetDrawRules.xPosOffset,
      movementOffsetY + asset.tile.assetDrawRules.yPosOffset - (asset.zIndex * GSM.Settings.blockSize),
      asset.tile.assetDrawRules.drawSize.x,
      asset.tile.assetDrawRules.drawSize.y
    )
  }
}
