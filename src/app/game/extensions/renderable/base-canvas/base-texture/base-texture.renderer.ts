import { GSM } from "../../../../game-state-manager.service"
import { Cell, RenderingLayers, AssetTile } from "../../../../models/map"
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer"

export class BaseTextureRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer
  public override excludeFromIndividualCellPainting: boolean = true

  public onDraw(event: RenderOptionsEvent): void {
    this.ctx.drawImage(
      GSM.ImageController.getImage(event.terrainTile.imageUrl),
      event.terrainTile.spritePosX,
      event.terrainTile.spritePosY,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize,
      event.cell.posX,
      event.cell.posY,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize
    )
  }
}
