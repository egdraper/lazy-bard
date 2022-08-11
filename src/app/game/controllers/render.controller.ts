import { Subscription } from "rxjs"
import { GSM } from "../game-state-manager.service"
import { GridAsset } from "../models/asset.model"
import { CanvasCTX } from "../models/extension.model"
import { RenderingLayers } from "../models/map"
import { Renderer } from "../models/renderer"
import { RootCanvasModule } from "../modules/root.module"
import { AddonRenderer } from "./utils/addon-renderer.util"
import { generateBackgroundImage, generateLayerImage } from "./utils/create-background-image"
import { terrainCleanup } from "./utils/terrain-cleanup"

export class RendererController {
  public baseCanvasRenderer: AddonRenderer
  public foregroundCanvasRenderer: AddonRenderer
  
  private renderAsSingeImages: {[layer: string]: boolean } = {}
  private subscriptions: Subscription[] = []
  
  public start() {
    GSM.CanvasModuleController.canvasModules.forEach(canvasModule => this.setupRenderers(canvasModule))
    this.subscriptions.push(GSM.FrameController.frameFire.subscribe(this.onFrameFire.bind(this)))
  }
  
  public stop(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  public renderAsSingleImage(layer: RenderingLayers) {
    this.renderAsSingeImages[layer] = true
    terrainCleanup()
    GSM.AssetController.refreshAssetIterator()
    
    const module = GSM.CanvasModuleController.canvasModules.find(module => module.canvasName === "base")
    generateBackgroundImage(module.renderers)
    generateLayerImage("foreground", layer)
    generateLayerImage("foreground", RenderingLayers.ObjectLayer)
  }

  public renderAsAssets(layer: RenderingLayers) {
    this.renderAsSingeImages[layer] = false
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
    this.renderLayers()
    this.renderAssets(frame)
  }

  private renderLayers() {
    // always render as an image
    this.baseCanvasRenderer.draw(GSM.ImageController.renderingLayerImages[RenderingLayers.BaseLayer])

    if(this.renderAsSingeImages[RenderingLayers.TerrainLayer]) {
      this.foregroundCanvasRenderer.draw(GSM.ImageController.renderingLayerImages[RenderingLayers.TerrainLayer])
    }
    
    if(this.renderAsSingeImages[RenderingLayers.ObjectLayer]) {
      this.foregroundCanvasRenderer.draw(GSM.ImageController.renderingLayerImages[RenderingLayers.ObjectLayer])
    }
  }

  private renderAssets(frame: number) {
    GSM.AssetController.iterateAsset(asset => {
      this.iterateRenderers(renderer => {
        if(renderer.renderingLayer === RenderingLayers.BaseLayer) { return }      
        if(this.renderAsSingeImages[renderer.renderingLayer]) { return }      
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
      if(asset.layer === RenderingLayers.AssetLayer) {
        this.paintAroundAsset(asset)
      }
    })
  }

  private paintAroundAsset(asset: GridAsset) {
    if(!GSM.ImageController.renderingLayerImages[RenderingLayers.TerrainLayer] ) { return }
    const ctx = GSM.CanvasController.foregroundCTX

    const blocks = asset.ownedBlockIds.map(id => GSM.AssetController.getAssetBlockById(id))

    let topCoveringAsset = GSM.AssetController.getAssetBlocksCoveringCellAtZ(blocks[0].cell, blocks[0].zIndex).pop()
    const topCoveringAsset2 = GSM.AssetController.getAssetBlocksCoveringCellAtZ(blocks[1].cell, blocks[1].zIndex).pop()

    const index = topCoveringAsset2 ? 1 : 0
    topCoveringAsset = topCoveringAsset2 ? topCoveringAsset2 : topCoveringAsset
    if(!topCoveringAsset) { return }
    
    GSM.RendererController.iterateRenderingLayers(layer => {
      if(layer === RenderingLayers.BaseLayer) { return }     
      if(layer === RenderingLayers.AssetLayer) { return }

      const offset = (((topCoveringAsset.cell.location.y - asset.anchorCell.location.y) - (topCoveringAsset.zIndex - blocks[index].zIndex)) + (blocks[index].zIndex - 1)) * GSM.Settings.blockSize

      ctx.globalAlpha = .44
      ctx.drawImage(
        GSM.ImageController.renderingLayerImages[layer],
        asset.anchorCell.position.x - 64,
        asset.anchorCell.position.y - offset,
        128,
        128,
        asset.anchorCell.position.x - 64,
        asset.anchorCell.position.y - offset,
        128,
        128,
      )
    })

    ctx.globalAlpha = 1
  }
   
  public clearCanvases(): void {
    const canvas = GSM.CanvasController
    canvas.backgroundCTX.clearRect(0,0, GSM.GridController.map.size.x * GSM.Settings.blockSize, GSM.GridController.map.size.y * GSM.Settings.blockSize)
    canvas.backgroundCTX.imageSmoothingEnabled = false
    canvas.foregroundCTX.clearRect(0,0, GSM.GridController.map.size.x * GSM.Settings.blockSize, GSM.GridController.map.size.y * GSM.Settings.blockSize)
    canvas.foregroundCTX.imageSmoothingEnabled = false   
    canvas.fullImageCTX.clearRect(0,0, GSM.GridController.map.size.x * GSM.Settings.blockSize, GSM.GridController.map.size.y * GSM.Settings.blockSize)
    canvas.fullImageCTX.imageSmoothingEnabled = false   
  }  

  private setupRenderers(canvasModule: RootCanvasModule): void {
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
      // if(canvasModule.ctx === CanvasCTX.Fog) {
      //   renderer.ctx = GSM.CanvasController.fogCTX
      //   this..ctx = renderer.ctx
      // }
      // if(canvasModule.ctx === CanvasCTX.BlackoutFog) {
      //   renderer.ctx = GSM.CanvasController.blackoutCTX
      //   this.foregroundCanvasRenderer.ctx = renderer.ctx
      // }
    })
  }
}