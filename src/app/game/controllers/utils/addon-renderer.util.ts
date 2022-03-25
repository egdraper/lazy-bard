import { GSM } from "../../game-state-manager.service"

export class AddonRenderer {
  public ctx = GSM.CanvasController.backgroundCTX

  public draw(image: HTMLImageElement, elevation: number): void {
    if(!image) { return }
    
    this.ctx.imageSmoothingEnabled = false
    // this.ctx.globalAlpha = 1 - (Math.abs(GSM.GridController.currentElevationLayerIndex - elevation) * .3)
    this.ctx.globalAlpha = GSM.GridController.gameMap.currentElevationLayerIndex < elevation ? .5 : 1
    this.ctx.filter = GSM.GridController.gameMap.currentElevationLayerIndex > elevation ? 'grayscale(.6)' : "";
    this.ctx.filter = GSM.GridController.gameMap.currentElevationLayerIndex < elevation ? 'grayscale(.6)' : "";

    this.ctx.drawImage(
      image,
      0,
      0,
      GSM.GridController.gameMap.size.width * GSM.Settings.blockSize,
      GSM.GridController.gameMap.size.height * GSM.Settings.blockSize,
      0,
      0,
      GSM.GridController.gameMap.size.width * GSM.Settings.blockSize,
      GSM.GridController.gameMap.size.height * GSM.Settings.blockSize,
    )
    this.ctx.globalAlpha = 1
    this.ctx.filter = "none";
  }
}
