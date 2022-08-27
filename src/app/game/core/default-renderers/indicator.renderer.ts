import { GSM } from '../../game-state-manager.service'
import { PlaceableAsset } from '../../models/asset.model'
import { RenderingLayers } from '../../models/map'
import { Renderer } from '../../models/renderer'

export class IndicatorRenderer implements Renderer {
  public id: string = "IndicatorRenderer"
  public ctx: CanvasRenderingContext2D = GSM.CanvasManager.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.OverlayLayer
  public enabled: boolean = true
  
  public indicatorURL = null
 
  public onDraw(): void {
    const asset = GSM.AssetManager.selectedAssets[0] as PlaceableAsset
    const assets = GSM.ActionManager.assetsOfInterest

    if(!asset || assets.length === 0) { return }

    const movementOffsetX = asset?.movement ? asset.movement.movementOffset.x : asset.anchorCell.position.x
    const movementOffsetY = asset?.movement ? asset.movement.movementOffset.y : asset.anchorCell.position.y

    this.ctx.drawImage(
      GSM.ImageManager.getImage(GSM.Settings.indicatorIconUrl),
      0,
      0,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize,
      movementOffsetX + asset.attributes.xPosOffset + 6,
      movementOffsetY + asset.attributes.yPosOffset - (asset.baseZIndex * GSM.Settings.blockSize) - 12,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize
    )

    this.ctx.globalAlpha = 1
  }
}


