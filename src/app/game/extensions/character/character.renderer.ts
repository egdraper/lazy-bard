import { Asset, GridAsset } from 'src/app/game/models/sprite-tile.model'
import { getHoveredOverGridAsset } from '../../controllers/utils/selected-sprite-tile'
import { GSM } from '../../game-state-manager.service'
import { RenderingLayers } from '../../models/map'
import { Renderer } from '../../models/renderer'


export class PlayableAssetRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.CharacterLayer

  public beforeDraw(asset: Asset, frame?: number): void {
    this.ctx.fillStyle = '#424247'
    this.ctx.beginPath()

    const topAsset = GSM.AssetController.getTopAssetPerCell(asset.cell, RenderingLayers.TerrainLayer)

    const walkOverAsset = getHoveredOverGridAsset(asset.cell)
    let shadowZ = asset.zIndex
    if(walkOverAsset && walkOverAsset.zIndex <= shadowZ ) {
      shadowZ = walkOverAsset ? walkOverAsset.zIndex * GSM.Settings.blockSize : 0
    } 
    this.ctx.ellipse(
      asset.movementOffset.x + GSM.Settings.blockSize / 2,
      (asset.movementOffset.y + (GSM.Settings.blockSize / 2)) - ((topAsset ? topAsset.zIndex : 0) * GSM.Settings.blockSize),
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
        asset.movementOffset.x + GSM.Settings.blockSize / 2,
        asset.movementOffset.y + GSM.Settings.blockSize / 2 - (asset.zIndex * GSM.Settings.blockSize) + 5,
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

  public onDraw(asset: Asset): void {
    this.ctx.drawImage(
      GSM.ImageController.getImage(asset.tile.imageUrl),
      asset.tile.assetDrawRules.xWalkPos[asset.tile.animation.positionCounter],
      asset.tile.assetDrawRules.yWalkPos[asset.tile.animation.spriteYPosition],
      asset.tile.assetDrawRules.size.x,
      asset.tile.assetDrawRules.size.y,
      asset.movementOffset.x + asset.tile.assetDrawRules.xPosOffset,
      asset.movementOffset.y + asset.tile.assetDrawRules.yPosOffset - (asset.zIndex * GSM.Settings.blockSize),
      asset.tile.assetDrawRules.drawSize.x,
      asset.tile.assetDrawRules.drawSize.y
    )
  }
}
