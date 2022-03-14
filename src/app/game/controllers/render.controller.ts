import { Subscription } from "rxjs"
import { AddonRenderer } from "../extensions/canvas-addons/addon-renderer.util"
import { ImageGenerator } from "../extensions/canvas-addons/image-generator.util"
import { CanvasModule } from "../extensions/addon-base"
import { GSM } from "../game-state-manager.service"
import { CanvasCTX } from "../models/extension.model"
import { Renderer } from "../models/renderer"

export class RendererController {
  public foregroundCanvasRenderer: AddonRenderer
  public baseCanvasRenderer: AddonRenderer
  public allIncludedRenderer: Renderer[] = []
  public renderForegroundCanvasAsSingleImage = false

  private subscriptions: Subscription[] = []
  
  constructor() { 
    this.subscriptions.push(GSM.FrameController.frameFire.subscribe(this.onFrameFire.bind(this)))
    this.subscriptions.push(GSM.EventController.generalActionFire.subscribe(this.onGenerateBackground.bind(this)))
  }

  public processRenderers() {
    GSM.CanvasModuleController.canvasModules.forEach((canvasModule) =>
      canvasModule.renderers.forEach((renderer) => {
        this.setupRenderers(canvasModule)
        if(!renderer.excludeFromSingleImagePainting && !renderer.excludeFromIndividualCellPainting) { 
          this.allIncludedRenderer.push(renderer)
        }
      })
    )
  }
  
  public stop(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
    
  private onFrameFire(frame: number): void {
    if(!(GSM.CanvasModuleController.canvasModules && GSM.CanvasModuleController.canvasModules.length !== 0)) { return }
    
    this.clearCanvases()    
    this.addOrderedRenderersToCells()
    this.renderBaseCanvasImages()
    
    if(this.renderForegroundCanvasAsSingleImage) {
      this.renderForegroundAsSingleImage(frame)
    } else {
      this.renderAllLayersAndCellsIndependently(frame)
    }
  }

  private renderBaseCanvasImages() {
    this.baseCanvasRenderer.draw()
  }

  private renderForegroundAsSingleImage(frame: number): void {
    this.foregroundCanvasRenderer.draw()

    // renders any excluded addons from being painted as part of the single image
    GSM.CanvasModuleController.canvasModules.forEach(canvasModule => {
      this.runRendererForExcludedAddons(canvasModule, frame)
    })
  }

  private renderAllLayersAndCellsIndependently(frame: number): void {
    GSM.GridController.iterateCellsWithLayer((cell, layer) => {
      cell.renderers.forEach(renderer => {
        renderer.draw(cell, layer, frame)
      })
    })
  }

  private runRendererForExcludedAddons(canvasModule: CanvasModule, frame: number): void {
    canvasModule.renderers.forEach(renderer => {
      if(renderer.excludeFromSingleImagePainting) { 
        GSM.GridController.iterateCellsWithLayer((cell, layer) => {
          renderer.draw(cell, layer, frame)
        })
      }
    })
  }
    
  private clearCanvases(): void {
    const canvas = GSM.CanvasController
    canvas.backgroundCTX.clearRect(0,0, GSM.GridController.gameMap.size.width * GSM.Settings.blockSize, GSM.GridController.gameMap.size.height * GSM.Settings.blockSize)
    canvas.backgroundCTX.imageSmoothingEnabled = false
    canvas.foregroundCTX.clearRect(0,0, GSM.GridController.gameMap.size.width * GSM.Settings.blockSize, GSM.GridController.gameMap.size.height * GSM.Settings.blockSize)
    canvas.foregroundCTX.imageSmoothingEnabled = false   
  }  

  public addOrderedRenderersToCells(): void {
    // if renderers have not been added to cells yet for performance, we add them
    if(GSM.GridController.getCell(0,0,GSM.GridController.layerIndex).renderers.length === 0) {
      GSM.GridController.iterateAllVisibleCells(cell => {
        
        GSM.CanvasModuleController.canvasModules.forEach(canvasModule => {
          
          canvasModule.renderers.forEach(renderer => {
            if (renderer.excludeFromIndividualCellPainting) { return }
            cell.renderers.push(renderer)
          })
        })
      })
    }
  }

  private onGenerateBackground(action): void {
    if (action.name === 'generateBackground') {
      const image = ImageGenerator.generateLayerImage(this.allIncludedRenderer)
      this.renderForegroundCanvasAsSingleImage = !this.renderForegroundCanvasAsSingleImage
      this.foregroundCanvasRenderer.image = image
    }
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