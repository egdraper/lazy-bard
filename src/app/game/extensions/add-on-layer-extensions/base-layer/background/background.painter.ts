import { GSM } from "../../../../game-state-manager.service"
import { Cell } from "../../../../models/map"
import { Painter } from "../../../../models/painter"

export class BackgroundPainter extends Painter {
  public paintOrder = 1

  public paint(cell: Cell): void {
    this.ctx.drawImage(
      GSM.ImageController.getImage(cell.backgroundTile.imageUrl),
      cell.backgroundTile.tilePosX,
      cell.backgroundTile.tilePosY,
      32,
      32,
      cell.posX,
      cell.posY,
      32,
      32
    )
  }
}
