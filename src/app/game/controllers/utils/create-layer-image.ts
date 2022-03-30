import { GSM } from "../../game-state-manager.service"
import { Renderer } from "../../models/renderer"

export function generateElevationImage(renderers: Renderer[], elevationIndex: number): HTMLImageElement {
    if(!GSM.CanvasController.fullImageCTX) { return null }

    GSM.CanvasController.fullImageCTX.canvas.width = GSM.GameData.map.size.width * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.canvas.height = GSM.GameData.map.size.height * GSM.Settings.blockSize
       
    let tempCTX 
    renderers.forEach((renderer)=> {
      if(renderer.excludeFromIndividualCellPainting) { return }
     
      tempCTX = renderer.ctx
      renderer.ctx = GSM.CanvasController.fullImageCTX

      GSM.GridController.iterateCells(elevationIndex, (cell) => {
        renderer.draw({cell, elevationIndex})
      })
      renderer.ctx = tempCTX
    })

    const layerImageBase64 = GSM.CanvasController.fullImageCanvas.nativeElement.toDataURL("image/png")
    const layerImage = new Image()
    layerImage.src = layerImageBase64

    return layerImage
  }