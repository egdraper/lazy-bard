import { GSM } from "../../../../game-state-manager.service"
import { Cell } from "../../../../models/map"
import { Renderer } from "../../../../models/renderer"

export class BaseTextureRenderer extends Renderer {
  public paintOrder = 1

  public draw(cell: Cell): void {
    const assetCell = this.mapAssets[cell.id]

    this.ctx.drawImage(
      GSM.ImageController.getImage(assetCell.imageTile.imageUrl),
      assetCell.imageTile.spriteGridPosX,
      assetCell.imageTile.spriteGridPosY,
      32,
      32,
      cell.posX,
      cell.posY,
      32,
      32
    )
  }
}
