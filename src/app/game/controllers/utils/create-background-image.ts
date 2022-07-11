import { GSM } from "../../game-state-manager.service"
import { MapRotationIndex } from "../../models/map"
import { Renderer } from "../../models/renderer"

export function generateBackgroundImage(renderers: Renderer[]): HTMLImageElement {
    if(!GSM.CanvasController.fullImageCTX) { return null }

    GSM.CanvasController.fullImageCTX.canvas.width = GSM.GameData.map.size.x * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.canvas.height = GSM.GameData.map.size.y * GSM.Settings.blockSize
       
    let tempCTX 
    renderers.forEach((renderer)=> {
      tempCTX = renderer.ctx
      renderer.ctx = GSM.CanvasController.fullImageCTX

      GSM.AssetController.backgroundAssets.forEach((backgroundAsset) => {
        if(renderer.beforeDraw) {
          renderer.beforeDraw(backgroundAsset)
        }
        if(renderer.onDraw) {
          renderer.onDraw(backgroundAsset)
        }
        if(renderer.afterDraw) {
          renderer.afterDraw(backgroundAsset)
        }
      })
      renderer.ctx = tempCTX
    })

    const layerImageBase64 = GSM.CanvasController.fullImageCanvas.nativeElement.toDataURL("image/png")
    const layerImage = new Image()
    layerImage.src = layerImageBase64

    return layerImage
  }