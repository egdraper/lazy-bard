import { GSM } from "../../game-state-manager.service"
import { Cell, ImageTile } from "../../models/map"
import { Painter } from "../../models/painter"
import { TextureSprite } from "../../models/sprites"
import { BackgroundRandomGenerator } from "./background.generator"

export class BackgroundPainter implements Painter {
  public ctx = GSM.CanvasController.backgroundCTX
  public images: { [imageUrl: string]: HTMLImageElement; } = {}
  public baseTexture: TextureSprite

  public paint(cell: Cell): void {
    if (!cell.tile) { 
      cell.tile = new ImageTile()  
      cell.tile.imageUrl = this.baseTexture?.imageUrl || ""
      BackgroundRandomGenerator.autoFillBackgroundTerrain(cell.tile, this.baseTexture)
    }

    this.ctx.imageSmoothingEnabled = false
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
