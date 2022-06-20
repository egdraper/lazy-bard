import { Asset } from '../../models/asset.model'
import { getTopAssetBlockingCell } from '../../controllers/utils/selected-sprite-tile'
import { GSM } from '../../game-state-manager.service'
import { RenderingLayers } from '../../models/map'
import { Renderer } from '../../models/renderer'
import { MotionObjectTile } from '../../models/sprite-tile.model'


export class PlayableAssetRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.CharacterLayer

  public beforeDraw(asset: Asset, frame?: number): void {
    if(asset.tile.layer !== RenderingLayers.CharacterLayer) { return }

    this.ctx.fillStyle = '#424247'
    this.ctx.beginPath()

    const topAsset = GSM.AssetController.getTopAssetPerCell(asset.cell, RenderingLayers.TerrainLayer)

    const walkOverAsset = getTopAssetBlockingCell(asset.cell)
    let shadowZ = asset.zIndex
    if(walkOverAsset && walkOverAsset.zIndex <= shadowZ ) {
      shadowZ = walkOverAsset ? walkOverAsset.zIndex * GSM.Settings.blockSize : 0
    } 
    this.ctx.ellipse(
      asset.movement.movementOffset.x + GSM.Settings.blockSize / 2,
      (asset.movement.movementOffset.y + (GSM.Settings.blockSize / 2)) - ((topAsset ? topAsset.zIndex : 0) * GSM.Settings.blockSize),
       8, 
       4, 
       0, 
       0, 
       Math.PI * 2
       )   
    this.ctx.fill()
    
 
    if(asset.hovering) {
      this.ctx.beginPath()
      this.ctx.fillStyle = '#aaaaff'
      this.ctx.globalAlpha = .5
      this.ctx.ellipse(
        asset.movement.movementOffset.x + GSM.Settings.blockSize / 2,
        asset.movement.movementOffset.y + GSM.Settings.blockSize / 2 - (asset.zIndex * GSM.Settings.blockSize) + 5,
        8, 
        4, 
        0, 
        0, 
        Math.PI * 2
      )   
      this.ctx.fill()
      this.ctx.globalAlpha = 1
    }
  }

  public onDraw(asset: Asset<MotionObjectTile>): void {
    if(asset.tile.layer !== RenderingLayers.CharacterLayer) { return }

    this.ctx.drawImage(
      GSM.ImageController.getImage(asset.tile.imageUrl),
      asset.tile.assetDrawRules.xMotionTilePos[asset.animation.positionCounter],
      asset.tile.assetDrawRules.yDirectionTilePos[asset.animation.orientation.currentOrientation],
      asset.tile.assetDrawRules.size.x,
      asset.tile.assetDrawRules.size.y,
      asset.movement.movementOffset.x + asset.tile.assetDrawRules.xPosOffset,
      asset.movement.movementOffset.y + asset.tile.assetDrawRules.yPosOffset - (asset.zIndex * GSM.Settings.blockSize),
      asset.tile.assetDrawRules.drawSize.x,
      asset.tile.assetDrawRules.drawSize.y
    )
  }
}
