import { GSM } from '../game-state-manager.service'
import { PlaceableAsset } from '../models/asset.model'
import { RenderingLayers } from '../models/map'
import { Renderer } from '../models/renderer'
import { AssetTile } from '../models/sprite-tile.model'


export class AssetRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.AssetLayer
  public enabled: boolean = true


  public beforeDraw(asset: PlaceableAsset, frame?: number, opacity: number = 1): void {
    this.ctx.beginPath()
    
    const movementOffsetX = asset.movement ? asset?.movement.movementOffset.x : asset.anchorCell.position.x
    const movementOffsetY = asset.movement ? asset?.movement.movementOffset.y : asset.anchorCell.position.y
    const topAsset = GSM.AssetController.getTopAssetByCell(asset.anchorCell, [RenderingLayers.AssetLayer, RenderingLayers.ObjectLayer])

    const shadowZ = topAsset ? topAsset.baseZIndex + topAsset.attributes.size.z : 0
    const coveringAsset = GSM.AssetController.getAssetBlocksCoveringCellAtZ(asset.anchorCell, shadowZ)
        
    this.ctx.fillStyle = '#424247'
    this.ctx.globalAlpha = .7
    if(coveringAsset.length > 0) { this.ctx.globalAlpha = .3 }
    this.ctx.ellipse(
      movementOffsetX + GSM.Settings.blockSize / 2,
      (movementOffsetY + (GSM.Settings.blockSize / 2)) - (shadowZ * GSM.Settings.blockSize),
      8, 
      4, 
      0, 
      0,
      Math.PI * 2
    )
    this.ctx.fill()
    this.ctx.globalAlpha = 1 
  }
 
  public onDraw(asset: PlaceableAsset<AssetTile>, frame?: number, opacity: number = 1 ): void {
    const movementOffsetX = asset.movement ? asset.movement.movementOffset.x : asset.anchorCell.position.x
    const movementOffsetY = asset.movement ? asset.movement.movementOffset.y : asset.anchorCell.position.y

    this.ctx.globalAlpha = opacity
    this.ctx.drawImage(
      GSM.ImageController.getImage(asset.tile.imageUrl),
      asset.movement.moving ? asset.animation.xMotionTilePos[asset.animation.positionCounter] : asset.animation.xMotionTilePos[1],
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
