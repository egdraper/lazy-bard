import { GSM } from "../../game-state-manager.service"

export class AddonRenderer {
  public ctx = GSM.CanvasController.backgroundCTX

  public draw(image: HTMLImageElement): void {
    if(!image) { return }
    
    this.ctx.imageSmoothingEnabled = false
    // this.ctx.globalAlpha = 1 - (Math.abs(GSM.GridController.currentElevationLayerIndex - elevation) * .3)
    // this.ctx.globalAlpha = GSM.GridController.map.currentElevationLayerIndex < elevation ? .5 : 1
    // this.ctx.filter = GSM.GridController.map.currentElevationLayerIndex > elevation ? 'grayscale(.6)' : "";
    // this.ctx.filter = GSM.GridController.map.currentElevationLayerIndex < elevation ? 'grayscale(.6)' : "";

    this.ctx.drawImage(
      image,
      0,
      0,
      GSM.GridController.map.size.x * GSM.Settings.blockSize,
      GSM.GridController.map.size.y * GSM.Settings.blockSize,
      0,
      0,
      GSM.GridController.map.size.x * GSM.Settings.blockSize,
      GSM.GridController.map.size.y * GSM.Settings.blockSize,
    )
    this.ctx.globalAlpha = 1
    this.ctx.filter = "none";
  }
}
