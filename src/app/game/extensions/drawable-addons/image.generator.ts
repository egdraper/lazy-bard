import { GSM } from "../../game-state-manager.service";
import { ElevationLayers } from "../../models/map";
import { Renderer } from "../../models/renderer";

export class ImageGenerator {
  public static generateLayerImage(renderers: Renderer[]): HTMLImageElement {
    GSM.CanvasController.fullImageCTX.canvas.width = GSM.GridController.gameMap.size.width * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.canvas.height = GSM.GridController.gameMap.size.height * GSM.Settings.blockSize
       
    let tempCTX 
    renderers.forEach((renderer)=> {
      tempCTX = renderer.ctx
      renderer.ctx = GSM.CanvasController.fullImageCTX

      GSM.GridController.iterateCells(cell => {
        renderer.draw(cell)
      })
      renderer.ctx = tempCTX
    })

    const layerImageBase64 = GSM.CanvasController.fullImageCanvas.nativeElement.toDataURL("image/png")
    const layerImage = new Image()
    layerImage.src = layerImageBase64

    return layerImage
  }
}