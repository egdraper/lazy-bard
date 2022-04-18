import { GSM } from "../../game-state-manager.service"
import { Renderer } from "../../models/renderer"

export function generateTerrainImage(renderers: Renderer[]): HTMLImageElement {
    if(!GSM.CanvasController.fullImageCTX) { return null }

    GSM.CanvasController.fullImageCTX.canvas.width = GSM.GameData.map.size.x * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.canvas.height = GSM.GameData.map.size.y * GSM.Settings.blockSize
       
    let tempCTX 
    renderers.forEach((renderer)=> {
      tempCTX = renderer.ctx
      renderer.ctx = GSM.CanvasController.fullImageCTX

      GSM.GridAssetController.iterateAsset((asset) => {
        if(renderer.beforeDraw) {
          renderer.beforeDraw(asset)
        }
        if(renderer.onDraw) {
          renderer.onDraw(asset)
        }
        if(renderer.afterDraw) {
          renderer.afterDraw(asset)
        }
      })
      renderer.ctx = tempCTX
    })

    const layerImageBase64 = GSM.CanvasController.fullImageCanvas.nativeElement.toDataURL("image/png")
    const layerImage = new Image()
    layerImage.src = layerImageBase64

    return layerImage
  }