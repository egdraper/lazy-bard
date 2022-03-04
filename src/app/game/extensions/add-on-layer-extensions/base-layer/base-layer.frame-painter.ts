import { GSM } from "../../../game-state-manager.service"
import { Cell, ImageTile } from "../../../models/map"
import { FramePainter, Painter } from "../../../models/painter"
import { TextureSprite } from "../../../models/sprites"
import { BackgroundRandomGenerator } from "./background/background.generator"

export class LargeBackgroundPainter implements FramePainter {
  public paintOrder = 1
  public ctx = GSM.CanvasController.backgroundCTX
  public image: CanvasImageSource

  public paint(): void {
    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(
      this.image,
      0,
      0,
      GSM.GridController.gameMap.size.width * GSM.Settings.blockSize,
      GSM.GridController.gameMap.size.height * GSM.Settings.blockSize,
      0,
      0,
      GSM.GridController.gameMap.size.width * GSM.Settings.blockSize,
      GSM.GridController.gameMap.size.height * GSM.Settings.blockSize,
    )
  }
}
