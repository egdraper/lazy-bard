import { RenderingLayers } from "src/app/game/models/map"
import { GSM } from "../../../../game-state-manager.service"
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer"

export class BaseTextureRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer
  public override excludeFromIndividualCellPainting: boolean = true

  public onDraw(event: RenderOptionsEvent): void {
    if(!event.terrainTile || !event.terrainTile.imageUrl) { return }

    this.ctx.drawImage(
      GSM.ImageController.getImage(event.terrainTile.imageUrl),
      event.terrainTile.baseWith.x,
      event.terrainTile.baseWith.y,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize,
      event.cell.position.x,
      event.cell.position.y,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize
    )
  }
}
