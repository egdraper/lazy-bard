import { Subscription } from "rxjs"
import { CanvasModule } from "../extensions/addon-base"
import { GSM } from "../game-state-manager.service"
import { CanvasCTX } from "../models/extension.model"
import { RenderingLayers } from "../models/map"
import { Renderer } from "../models/renderer"
import { AddonRenderer } from "./utils/addon-renderer.util"

export class RendererController {
  public foregroundCanvasRenderer: AddonRenderer
  public baseCanvasRenderer: AddonRenderer

  private subscriptions: Subscription[] = []
  
  public start() {
    GSM.CanvasModuleController.canvasModules.forEach(canvasModule => this.setupRenderers(canvasModule))
    this.subscriptions.push(GSM.FrameController.frameFire.subscribe(this.onFrameFire.bind(this)))
  }
  
  public stop(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  public iterateRenderingLayers(callBack: (layer: RenderingLayers) => void) {
    Object.values(RenderingLayers).forEach(layer => callBack(layer))
  }

  public iterateRenderers(callback: (renderer: Renderer) => void): void {
    GSM.CanvasModuleController.canvasModules.forEach(module => {
      module.renderers.forEach(renderer => callback(renderer))
    })
  }
    
  private onFrameFire(frame: number): void {
    if(!(GSM.CanvasModuleController.canvasModules && GSM.CanvasModuleController.canvasModules.length !== 0)) { return }
    this.clearCanvases()    
    this.renderBackground()
    this.renderAssets(frame)
  }

  private renderBackground() {
    this.baseCanvasRenderer.draw(GSM.ImageController.baseLayerImage, 0)
  }

  private renderAssets(frame: number) {
    this.iterateRenderers(renderer => {
      if(renderer.renderingLayer === RenderingLayers.BaseLayer) {
        return
      }

      GSM.GridAssetController.iterateAsset(asset => {
        if(asset.tile.layer !== renderer.renderingLayer) { return }
        if(renderer.beforeDraw) {
          renderer.beforeDraw(asset, frame)
        } 

        if(renderer.onDraw) {
          renderer.onDraw(asset, frame)
        }

        if(renderer.afterDraw) {
          renderer.afterDraw(asset, frame)
        }
      })
    })
  }
   
  private clearCanvases(): void {
    const canvas = GSM.CanvasController
    canvas.backgroundCTX.clearRect(0,0, GSM.GameData.map.size.x * GSM.Settings.blockSize, GSM.GameData.map.size.y * GSM.Settings.blockSize)
    canvas.backgroundCTX.imageSmoothingEnabled = false
    canvas.foregroundCTX.clearRect(0,0, GSM.GameData.map.size.x * GSM.Settings.blockSize, GSM.GameData.map.size.y * GSM.Settings.blockSize)
    canvas.foregroundCTX.imageSmoothingEnabled = false   
  }  

  private setupRenderers(canvasModule: CanvasModule): void {
    this.foregroundCanvasRenderer = new AddonRenderer()
    this.baseCanvasRenderer = new AddonRenderer()  
       
    canvasModule.renderers.forEach(renderer=> {
      if(canvasModule.ctx === CanvasCTX.Background) {
        renderer.ctx = GSM.CanvasController.backgroundCTX
        this.baseCanvasRenderer.ctx = renderer.ctx
      }
      if(canvasModule.ctx === CanvasCTX.Foreground) {
        renderer.ctx = GSM.CanvasController.foregroundCTX
        this.foregroundCanvasRenderer.ctx = renderer.ctx
      }
      if(canvasModule.ctx === CanvasCTX.Fog) {
        renderer.ctx = GSM.CanvasController.fogCTX
        this.foregroundCanvasRenderer.ctx = renderer.ctx
      }
      if(canvasModule.ctx === CanvasCTX.BlackoutFog) {
        renderer.ctx = GSM.CanvasController.blackoutCTX
        this.foregroundCanvasRenderer.ctx = renderer.ctx
      }
    })
  }
}