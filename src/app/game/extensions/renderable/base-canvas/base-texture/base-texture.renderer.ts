import { GSM } from "../../../../game-state-manager.service"
import { Cell, RenderingLayers, SpriteTile } from "../../../../models/map"
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer"

export class BaseTextureRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer
  public override excludeFromIndividualCellPainting: boolean = true

  public onDraw(event: RenderOptionsEvent): void {
    this.ctx.drawImage(
      GSM.ImageController.getImage(event.spriteTile.imageUrl),
      event.spriteTile.spritePosX,
      event.spriteTile.spritePosY,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize,
      event.cell.posX,
      event.cell.posY,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize
    )
  }
}
