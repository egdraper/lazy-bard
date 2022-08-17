import { Subscription } from "rxjs"
import { GSM } from "../game-state-manager.service"
import { AssetBlock, BlockEdge, Asset } from "../models/asset.model"
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

  public renderAsSingleImage() {
    terrainCleanup()
    GSM.AssetController.refreshAssetIterator()
    
    const module = GSM.CanvasModuleController.canvasModules.find(module => module.canvasName === "base")
    generateBackgroundImage(module.renderers)
    
    GSM.RendererController.iterateStaticAssetRenderingLayers(layer => {        
      generateLayerImage("foreground", layer)
      this.renderAsSingeImages[layer] = true
    })
  }

  public renderAsAssets() {
    GSM.RendererController.iterateStaticAssetRenderingLayers(layer => {
      this.renderAsSingeImages[layer] = false
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
    GSM.CanvasModuleController.canvasModules.forEach(module => {
      module.renderers.forEach(renderer => callback(renderer))
    })
  }
    
  private onFrameFire(frame: number): void {
    if(!(GSM.CanvasModuleController.canvasModules && GSM.CanvasModuleController.canvasModules.length !== 0)) { return }
    GSM.CanvasController.clearCanvases()    
    this.renderLayers()
    this.renderAssets(frame)
  }

  private renderLayers() {
    // always render as an image
    this.baseCanvasRenderer.draw(GSM.ImageController.renderingLayerImages[RenderingLayers.BaseLayer])

    if(this.renderAsSingeImages[RenderingLayers.TerrainLayer]) {
      this.foregroundCanvasRenderer.draw(GSM.ImageController.renderingLayerImages[RenderingLayers.TerrainLayer])
    }
  }

  private renderAssets(frame: number) {
    this.iterateRenderers(renderer => {
      if(renderer.renderingLayer === RenderingLayers.OverlayLayer) {
        this.renderOverlayItems(frame, renderer)
        return
      }
      if(renderer.renderingLayer === RenderingLayers.BaseLayer) { return }      
      if(this.renderAsSingeImages[renderer.renderingLayer]) { return }   
      if(!renderer.enabled) { return }   

      GSM.AssetController.iterateAsset(asset => {
        if(asset.tile.layer !== renderer.renderingLayer) { return }
        console.log(asset.id)
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
    if(!GSM.ImageController.renderingLayerImages[RenderingLayers.TerrainLayer] ) { return }
    const ctx = GSM.CanvasController.foregroundCTX

    const blocks = GSM.AssetController.getAllAssetBlocksByEdge(asset, {south: true})

    const coverings = blocks.map(block => {
      const coveringAsset = GSM.AssetController.getAssetBlocksCoveringCellAtZ(block.cell, block.zIndex).pop()
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

    if(!topCoveringAsset || GSM.AssetController.getAssetById(topCoveringAsset.ownerAssetId).layer === RenderingLayers.AssetLayer) { return }
    
    GSM.RendererController.iterateStaticAssetRenderingLayers(layer => {
      const cellYDifference = (topCoveringAsset.cell.location.y - asset.anchorCell.location.y)
      const assetZIndexDifference = (topCoveringAsset.zIndex - coveredBlock.zIndex)
      
      const offset = ((cellYDifference - assetZIndexDifference) + (coveredBlock.zIndex - 1)) * GSM.Settings.blockSize

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