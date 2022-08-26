import { GSM } from "../../game-state-manager.service"

export class FullImageRenderer {
  public ctx = GSM.CanvasManager.backgroundCTX

  public draw(image: HTMLImageElement): void {
    if(!image) { return }
    
    this.ctx.imageSmoothingEnabled = false

    this.ctx.drawImage(
      image,
      0,
      0,
      GSM.GridManager.map.size.x * GSM.Settings.blockSize,
      GSM.GridManager.map.size.y * GSM.Settings.blockSize,
      0,
      0,
      GSM.GridManager.map.size.x * GSM.Settings.blockSize,
      GSM.GridManager.map.size.y * GSM.Settings.blockSize,
    )

    this.ctx.globalAlpha = 1
    this.ctx.filter = "none";
  }
}
