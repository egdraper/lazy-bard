import { GSM } from "../../../game-state-manager.service"

export class LayerPainter {
  public ctx = GSM.CanvasController.backgroundCTX
  public image: HTMLImageElement

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
