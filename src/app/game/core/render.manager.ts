import { Subscription } from "rxjs"
import { GSM } from "../game-state-manager.service"
import { AssetBlock, Asset } from "../models/asset.model"
import { CanvasCTX } from "../models/extension.model"
import { RenderingLayers } from "../models/map"
import { Renderer } from "../models/renderer"
import { RootCanvasModule } from "../modules/root.module"
import { FullImageGenerator } from "./utils/create-background-image"
import { FullImageRenderer } from "./default-renderers/full-image.renderer"
import { TerrainCleanup } from "./utils/terrain-cleanup"

export class RendererManager {
  public baseCanvasRenderer: FullImageRenderer
  public foregroundCanvasRenderer: FullImageRenderer

  private renderAsSingeImage: boolean = false 
  private subscriptions: Subscription[] = []
  
  public start() {
    GSM.CanvasModuleManager.canvasModules.forEach(canvasModule => this.setupRenderers(canvasModule))
    this.subscriptions.push(GSM.FrameManager.frameFire.subscribe(this.onFrameFire.bind(this)))
  }
  
  public stop(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  public renderAsSingleImage() {
    TerrainCleanup.run()
    GSM.AssetManager.refreshAssetIterator()
    
    const module = GSM.CanvasModuleManager.canvasModules.find(module => module.canvasName === "base")
    FullImageGenerator.generateBackgroundImage(module.renderers)
    
      
    FullImageGenerator.generateForegroundStaticAssetImage()
    this.renderAsSingeImage = true


    const foregroundModule = GSM.CanvasModuleManager.canvasModules.find(module => module.canvasName === "foreground")
    foregroundModule.renderers.forEach(renderer => {
      if(renderer.renderingLayer === RenderingLayers.TerrainLayer || renderer.renderingLayer === RenderingLayers.ObjectLayer) { 
        renderer.enabled = false
      }
    })
  }

  public renderAsAssets() {
    this.renderAsSingeImage = false

    const foregroundModule = GSM.CanvasModuleManager.canvasModules.find(module => module.canvasName === "foreground")    
    foregroundModule.renderers.forEach(renderer => {
      if(renderer.renderingLayer === RenderingLayers.TerrainLayer || renderer.renderingLayer === RenderingLayers.ObjectLayer) { 
        renderer.enabled = true
      }
    })
  }

  public iterateStaticAssetRenderingLayers(callBack: (layer: RenderingLayers) => void) {
    Object.values(RenderingLayers).forEach(layer => {
      if(layer === RenderingLayers.BaseLayer || layer === RenderingLayers.AssetLayer) { return }
      callBack(layer)
    })
  }

  public iterateAllRenderingLayers(callBack: (layer: RenderingLayers) => void) {
    Object.values(RenderingLayers).forEach(layer => {
      if(layer === RenderingLayers.BaseLayer) { return }
      callBack(layer)
    })
  }

  public iterateRenderers(callback: (renderer: Renderer) => void): void {
    GSM.CanvasModuleManager.canvasModules.forEach(module => {
      module.renderers.forEach(renderer => callback(renderer))
    })
  }

  public getRenderer(id: string): Renderer {
    let renderer
    GSM.CanvasModuleManager.canvasModules.forEach(module => {
      let _renderer = module.renderers.find(renderer => renderer.id === id)
      if(_renderer) { renderer = _renderer }
    })
    return renderer
  }
    
  private onFrameFire(frame: number): void {
    if(!(GSM.CanvasModuleManager.canvasModules && GSM.CanvasModuleManager.canvasModules.length !== 0)) { return }
    GSM.CanvasManager.clearCanvases()    
    this.renderLayers()
    this.renderAssets(frame)
  }

  private renderLayers() {
    // always render as an image
    this.baseCanvasRenderer.draw(GSM.ImageManager.renderingLayerImages[RenderingLayers.BaseLayer])

    if(this.renderAsSingeImage) {
      this.foregroundCanvasRenderer.draw(GSM.ImageManager.renderingLayerImages["static"])
    }
  }

  private renderAssets(frame: number) {
    this.iterateRenderers(renderer => {
      if(!renderer.enabled) { return }   
      if(renderer.renderingLayer === RenderingLayers.OverlayLayer) {
        this.renderOverlayItems(frame, renderer)
        return
      }
      if(renderer.renderingLayer === RenderingLayers.BaseLayer) { return }      

      GSM.AssetManager.iterateAsset(asset => {
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

        if(asset.layer === RenderingLayers.AssetLayer) {
          this.paintAroundAsset(asset)
        }
      })
    })
  }

  private renderOverlayItems(frame: number, renderer) {
    if(renderer.beforeDraw) {
      renderer.beforeDraw(null, frame)
    } 

    if(renderer.onDraw) {
      renderer.onDraw(null, frame)
    }

    if(renderer.afterDraw) {
      renderer.afterDraw(null, frame)
    }
  }

  private paintAroundAsset(asset: Asset) {
    if(!GSM.ImageManager.renderingLayerImages["static"] ) { return }
    const ctx = GSM.CanvasManager.foregroundCTX

    const blocks = GSM.AssetManager.getAllAssetBlocksByEdge(asset, {south: true})

    const coverings = blocks.map(block => {
      const coveringAsset = GSM.AssetManager.getAssetBlocksCoveringCellAtZ(block.cell, block.zIndex).pop()
      return { block: block, coveringBlock: coveringAsset }
    })

    let topCoveringAsset: AssetBlock = null
    let coveredBlock
    
    for(let i = coverings.length - 1; i >= 0; i--  ) {
      if(coverings[i]?.coveringBlock) {
        topCoveringAsset = coverings[i].coveringBlock
        coveredBlock = coverings[i].block
        break
      }
    }

    if(!topCoveringAsset || GSM.AssetManager.getAssetById(topCoveringAsset.ownerAssetId).layer === RenderingLayers.AssetLayer) { return }
    
    GSM.RendererManager.iterateStaticAssetRenderingLayers(layer => {
      const cellYDifference = (topCoveringAsset.cell.location.y - asset.anchorCell.location.y)
      const assetZIndexDifference = (topCoveringAsset.zIndex - coveredBlock.zIndex)
      
      const offset = ((cellYDifference - assetZIndexDifference) + (coveredBlock.zIndex - 1)) * GSM.Settings.blockSize

      ctx.globalAlpha = .44
      ctx.drawImage(
        GSM.ImageManager.renderingLayerImages["static"],
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
   
  private setupRenderers(canvasModule: RootCanvasModule): void {
    this.foregroundCanvasRenderer = new FullImageRenderer()
    this.baseCanvasRenderer = new FullImageRenderer()  
       
    canvasModule.renderers.forEach(renderer=> {
      if(canvasModule.ctx === CanvasCTX.Background) {
        renderer.ctx = GSM.CanvasManager.backgroundCTX
        this.baseCanvasRenderer.ctx = renderer.ctx
      }
      if(canvasModule.ctx === CanvasCTX.Foreground) {
        renderer.ctx = GSM.CanvasManager.foregroundCTX
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