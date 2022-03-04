import { GSM } from "../../../../game-state-manager.service"
import { Cell, ImageTile } from "../../../../models/map"
import { ImagePainter, Painter } from "../../../../models/painter"
import { TextureSprite } from "../../../../models/sprites"
import { BackgroundRandomGenerator } from "./background.generator"

export class BackgroundPainter extends ImagePainter {
  public paintOrder = 1
  public images: { [imageUrl: string]: HTMLImageElement; } = {}

  public paint(cell: Cell): void {
    this.ctx.drawImage(
      this.images[cell.tile.imageUrl],
      cell.tile.tilePosX,
      cell.tile.tilePosY,
      32,
      32,
      cell.posX,
      cell.posY,
      32,
      32
    )
  }
}
