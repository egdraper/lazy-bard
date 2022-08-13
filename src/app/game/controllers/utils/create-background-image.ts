import { reduce } from "rxjs"
import { GSM } from "../../game-state-manager.service"
import { MapRotationIndex, RenderingLayers } from "../../models/map"
import { Renderer } from "../../models/renderer"

export function generateBackgroundImage(renderers: Renderer[]): void {
    if(!GSM.CanvasController.fullImageCTX) { return null }

    GSM.CanvasController.fullImageCTX.canvas.width = GSM.GridController.map.size.x * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.canvas.height = GSM.GridController.map.size.y * GSM.Settings.blockSize
       
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

    GSM.ImageController.renderingLayerImages[RenderingLayers.BaseLayer] = layerImage
  }

  export function generateLayerImage(canvasName: string, layer: string): void {
  
    if(!GSM.CanvasController.fullImageCTX) { return null }

    GSM.CanvasController.fullImageCTX.canvas.width = GSM.GridController.map.size.x * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.canvas.height = GSM.GridController.map.size.y * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.clearRect(0,0, GSM.GridController.map.size.x * GSM.Settings.blockSize, GSM.GridController.map.size.y * GSM.Settings.blockSize)
    GSM.CanvasController.fullImageCTX.imageSmoothingEnabled = false   

    let tempCTX 
    // GSM.AssetController.assetArray.forEach((asset) => {
    //   module.renderers.forEach((renderer)=> {
    //     if(renderer.renderingLayer !== renderingLayer) { return }
    //     if(asset.layer !== renderer.renderingLayer) { return }
    //     tempCTX = renderer.ctx
    //     renderer.ctx = GSM.CanvasController.fullImageCTX
          
    //     if(renderer.beforeDraw) {
    //       renderer.beforeDraw(asset)
    //     }
    //     if(renderer.onDraw) {
    //       renderer.onDraw(asset)
    //     }
    //     if(renderer.afterDraw) {
    //       renderer.afterDraw(asset)
    //     }
    //     renderer.ctx = tempCTX
    //   })
    // })
    GSM.AssetController.iterateAsset(asset => {
      GSM.RendererController.iterateRenderers(renderer => {
        if(renderer.renderingLayer === RenderingLayers.BaseLayer) { return }
        if(renderer.renderingLayer === RenderingLayers.AssetLayer) { return }        
        if(asset.tile.layer !== renderer.renderingLayer) { return }
        
        tempCTX = renderer.ctx       
        renderer.ctx = GSM.CanvasController.fullImageCTX
        if(renderer.beforeDraw) {
          renderer.beforeDraw(asset)
        } 
  
        if(renderer.onDraw) {
          renderer.onDraw(asset)
        }
  
        if(renderer.afterDraw) {
          renderer.afterDraw(asset)
        }
        renderer.ctx = tempCTX
      })
    })


    const layerImageBase64 = GSM.CanvasController.fullImageCanvas.nativeElement.toDataURL("image/png")
    const layerImage = new Image()
    layerImage.src = layerImageBase64

    GSM.ImageController.renderingLayerImages[layer] = layerImage
  }