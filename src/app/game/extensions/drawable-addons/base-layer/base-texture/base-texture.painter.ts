import { GSM } from "../../../../game-state-manager.service"
import { Cell } from "../../../../models/map"
import { Painter } from "../../../../models/painter"

export class BaseTexturePainter extends Painter {
  public paintOrder = 1

  public paint(cell: Cell): void {
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
