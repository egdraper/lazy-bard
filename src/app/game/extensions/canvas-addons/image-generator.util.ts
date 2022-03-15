import { GSM } from "../../game-state-manager.service";
import { RenderingLayers } from "../../models/map";
import { Renderer } from "../../models/renderer";

export class ImageGenerator {
  public static generateLayerImage(renderers: Renderer[]): HTMLImageElement {
    GSM.CanvasController.fullImageCTX.canvas.width = GSM.GridController.gameMap.size.width * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.canvas.height = GSM.GridController.gameMap.size.height * GSM.Settings.blockSize
       
    let tempCTX 
    renderers.forEach((renderer)=> {
      tempCTX = renderer.ctx
      renderer.ctx = GSM.CanvasController.fullImageCTX

      GSM.GridController.iterateCellsWithRenderingLayer((cell, layer) => {
        const elevationCount = GSM.GridController.gameMap.elevations.length
        for(let elevationIndex = 0; elevationIndex < elevationCount; elevationIndex++) {
          renderer.draw(cell, layer, elevationIndex)
        }
      })
      renderer.ctx = tempCTX
    })

    const layerImageBase64 = GSM.CanvasController.fullImageCanvas.nativeElement.toDataURL("image/png")
    const layerImage = new Image()
    layerImage.src = layerImageBase64

    return layerImage
  }
}