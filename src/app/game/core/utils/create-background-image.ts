import { GSM } from "../../game-state-manager.service"
import { RenderingLayers } from "../../models/map"
import { Renderer } from "../../models/renderer"

export class FullImageGenerator {
  public static generateBackgroundImage(renderers: Renderer[]): void {
      if(!GSM.CanvasManager.fullImageCTX) { return null }
  
      GSM.CanvasManager.fullImageCTX.canvas.width = GSM.GridManager.map.size.x * GSM.Settings.blockSize
      GSM.CanvasManager.fullImageCTX.canvas.height = GSM.GridManager.map.size.y * GSM.Settings.blockSize
         
      let tempCTX 
      renderers.forEach((renderer)=> {
        tempCTX = renderer.ctx
        renderer.ctx = GSM.CanvasManager.fullImageCTX
  
        GSM.AssetManager.backgroundAssets.forEach((backgroundAsset) => {
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
  
      const layerImageBase64 = GSM.CanvasManager.fullImageCanvas.nativeElement.toDataURL("image/png")
      const layerImage = new Image()
      layerImage.src = layerImageBase64
  
      GSM.ImageManager.renderingLayerImages[RenderingLayers.BaseLayer] = layerImage
    }


    public static generateForegroundStaticAssetImage(): void {
      if(!GSM.CanvasManager.fullImageCTX) { return null }
  
      GSM.CanvasManager.fullImageCTX.canvas.width = GSM.GridManager.map.size.x * GSM.Settings.blockSize
      GSM.CanvasManager.fullImageCTX.canvas.height = GSM.GridManager.map.size.y * GSM.Settings.blockSize
      GSM.CanvasManager.fullImageCTX.clearRect(0,0, GSM.GridManager.map.size.x * GSM.Settings.blockSize, GSM.GridManager.map.size.y * GSM.Settings.blockSize)
      GSM.CanvasManager.fullImageCTX.imageSmoothingEnabled = false   
  
      let tempCTX 
      GSM.AssetManager.iterateAsset(asset => {
        GSM.RendererManager.iterateRenderers(renderer => {
          if(renderer.renderingLayer === RenderingLayers.BaseLayer) { return }
          if(renderer.renderingLayer === RenderingLayers.AssetLayer) { return }        
          if(asset.tile.layer !== renderer.renderingLayer) { return }
          
          tempCTX = renderer.ctx       
          renderer.ctx = GSM.CanvasManager.fullImageCTX
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
  
      const layerImageBase64 = GSM.CanvasManager.fullImageCanvas.nativeElement.toDataURL("image/png")
      const layerImage = new Image()
      layerImage.src = layerImageBase64
  
      GSM.ImageManager.renderingLayerImages["static"] = layerImage
  }
}