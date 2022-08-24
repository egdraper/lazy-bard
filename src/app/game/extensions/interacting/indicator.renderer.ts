import { GSM } from '../../game-state-manager.service'
import { RenderingLayers } from '../../models/map'
import { Renderer } from '../../models/renderer'

export class InteractionIndicatorRenderer implements Renderer {
  public id: string = "InteractionIndicatorRenderer"
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.OverlayLayer
  public enabled: boolean = false

  public asset = null
  public indicatorURL = null
 
  public onDraw(): void {
    if(!this.asset) { return }

    const movementOffsetX = this.asset?.movement ? this.asset.movement.movementOffset.x : this.asset.anchorCell.position.x
    const movementOffsetY = this.asset?.movement ? this.asset.movement.movementOffset.y : this.asset.anchorCell.position.y

    this.ctx.drawImage(
      GSM.ImageController.getImage(this.indicatorURL),
      0,
      0,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize,
      movementOffsetX + this.asset.attributes.xPosOffset + 6,
      movementOffsetY + this.asset.attributes.yPosOffset - (this.asset.baseZIndex * GSM.Settings.blockSize) - 12,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize
    )

    this.ctx.globalAlpha = 1
  }
}


