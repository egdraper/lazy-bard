import { getTopAssetBeingHovered } from '../../controllers/utils/selected-sprite-tile'
import { GSM } from '../../game-state-manager.service'
import { Asset } from '../../models/asset.model'
import { RenderingLayers } from '../../models/map'
import { Renderer } from '../../models/renderer'
import { AssetTile } from '../../models/sprite-tile.model'


export class AssetRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.AssetLayer

  // public beforeDraw(asset: Asset, frame?: number): void {
  //   this.ctx.fillStyle = '#424247'
  //   this.ctx.beginPath()

  //   const topAsset = GSM.AssetController.getTopAssetPerCell(asset, RenderingLayers.TerrainLayer)
  //   const movementOffsetX = asset.movement ? asset.movement.movementOffset.x : asset.ownedBlocks.position.x
  //   const movementOffsetY = asset.movement ? asset.movement.movementOffset.y : asset.ownedBlocks.position.y

  //   const walkOverAsset = getTopAssetBlockingCell(asset.ownedBlocks)
  //   let shadowZ = asset.baseZIndex
  //   if(walkOverAsset && walkOverAsset.baseZIndex <= shadowZ ) {
  //     shadowZ = walkOverAsset ? walkOverAsset.baseZIndex * GSM.Settings.blockSize : 0
  //   } 

  //   this.ctx.ellipse(
  //     movementOffsetX + GSM.Settings.blockSize / 2,
  //     (movementOffsetY + (GSM.Settings.blockSize / 2)) - ((topAsset ? topAsset.baseZIndex : 0) * GSM.Settings.blockSize),
  //      8, 
  //      4, 
  //      0, 
  //      0, 
  //      Math.PI * 2
  //      )   
  //   this.ctx.fill()
  // }
 
  //   if(asset.hovering) {
  //     this.ctx.beginPath()
  //     this.ctx.fillStyle = '#aaaaff'
  //     this.ctx.globalAlpha = .5
  //     this.ctx.ellipse(
  //       asset.movement.movementOffset.x + GSM.Settings.blockSize / 2,
  //       asset.movement.movementOffset.y + GSM.Settings.blockSize / 2 - (asset.baseZIndex * GSM.Settings.blockSize) + 5,
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
    const movementOffsetX = asset.movement ? asset.movement.movementOffset.x : asset.anchorCell.position.x
    const movementOffsetY = asset.movement ? asset.movement.movementOffset.y : asset.anchorCell.position.y

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
  }
}
