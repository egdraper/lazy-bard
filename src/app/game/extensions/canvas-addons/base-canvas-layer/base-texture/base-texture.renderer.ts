import { GSM } from "../../../../game-state-manager.service"
import { Cell, ElevationLayers, SpriteTile } from "../../../../models/map"
import { Renderer } from "../../../../models/renderer"

export class BaseTextureRenderer extends Renderer {
  public elevationLayer: ElevationLayers = ElevationLayers.BaseLayer
  public override excludeFromIndividualCellPainting: boolean = true

  public onDraw(cell: Cell, spriteTile: SpriteTile): void {
    this.ctx.drawImage(
      GSM.ImageController.getImage(spriteTile.imageUrl),
      spriteTile.spriteGridPosX,
      spriteTile.spriteGridPosY,
      32,
      32,
      cell.posX,
      cell.posY,
      32,
      32
    )
  }
}
