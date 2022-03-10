import { GSM } from "../../game-state-manager.service";
import { ElevationLayers } from "../../models/map";
import { Painter } from "../../models/painter";

export class LayerImageGenerator {
  public static generateLayerImage(painters: Painter[], layer: ElevationLayers): HTMLImageElement {
    GSM.CanvasController.fullImageCTX.canvas.width = GSM.GridController.gameMap.size.width * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.canvas.height = GSM.GridController.gameMap.size.height * GSM.Settings.blockSize
       
    let tempCTX 
    painters.forEach((painter)=> {
      tempCTX = painter.ctx
      painter.ctx = GSM.CanvasController.fullImageCTX

      GSM.GridController.iterateLayerCell(cell => {
        painter.paint(cell)
      })
      painter.ctx = tempCTX
    })

    const layerImageBase64 = GSM.CanvasController.fullImageCanvas.nativeElement.toDataURL("image/png")
    const layerImage = new Image()
    layerImage.src = layerImageBase64

    return layerImage
  }
}