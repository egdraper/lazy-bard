import { Subscription } from "rxjs"
import { AddonRenderer } from "../extensions/drawable-addons/addon.renderer"
import { ImageGenerator } from "../extensions/drawable-addons/image.generator"
import { AddOnBase } from "../extensions/addon-base"
import { GSM } from "../game-state-manager.service"
import { CanvasCTX } from "../models/extension.model"
import { Renderer } from "../models/renderer"

export class RendererController {
  public AddonRenderer: AddonRenderer
  public BaseCanvasRenderer: AddonRenderer
  public allIncludedRenderer: Renderer[] = []
  public renderAddOnAsSingleImage = false

  private subscriptions: Subscription[] = []
  
  constructor() { 
    this.subscriptions.push(GSM.FrameController.frameFire.subscribe(this.onFrameFire.bind(this)))
    this.subscriptions.push(GSM.EventController.generalActionFire.subscribe(this.onGenerateBackground.bind(this)))
  }

  public init() {
    GSM.AddonController.addOns.forEach((addon) =>
      addon.getRenderers().forEach((renderer) => {
        this.setupRenderers(addon)
        if(!addon.excludeFromSingleImagePainting && !addon.excludeFromIndividualCellPainting) { 
          this.allIncludedRenderer.push(renderer)
        }
      })
    )
  }
  
  public stop(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
    
  private onFrameFire(frame: number): void {
    if(!(GSM.AddonController.addOns && GSM.AddonController.addOns.length !== 0)) { return }
    
    this.clearCanvases()    
    this.addOrderedRenderersToCells()
    this.renderBaseCanvasImages()
    
    if(this.renderAddOnAsSingleImage) {
      this.renderAddonAsSingleImage(frame)
    } else {
      this.renderAllLayersAndCellsIndependently(frame)
    }
  }

  private renderBaseCanvasImages() {
    this.BaseCanvasRenderer.draw()
  }

  private renderAddonAsSingleImage(frame: number): void {
    // renders the background and any included Addons as a single image
    this.AddonRenderer.draw()

    // renders any excluded addons from being painted as part of the single image
    GSM.AddonController.addOns.forEach(layerAddon => {
      if(layerAddon.excludeFromSingleImagePainting) {
        this.runRendererForExcludedAddons(layerAddon, frame)
      }
    })
  }

  private renderAllLayersAndCellsIndependently(frame: number): void {
    GSM.GridController.iterateAllVisibleCells((cell) => {
      cell.renderers.forEach(renderer => {
        renderer.draw(cell, frame)
      })
    })
  }

  private runRendererForExcludedAddons(layerAddon: AddOnBase, frame: number): void {
    GSM.GridController.iterateAllVisibleCells(cell => {
      layerAddon.getRenderers().forEach(renderer => {
        renderer.draw(cell, frame)
      })
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
    if(GSM.GridController.getCell(0,0,0).renderers.length === 0) {
      GSM.GridController.iterateAllVisibleCells(cell => {
        GSM.AddonController.addOns.forEach(addOn => {
          if(addOn.excludeFromIndividualCellPainting) { return }
          addOn.getRenderers().forEach(renderer => {
            cell.renderers.push(renderer)
          })
        })
      })
    }
  }

  private onGenerateBackground(action): void {
    if (action.name === 'generateBackground') {
      const image = ImageGenerator.generateLayerImage(this.allIncludedRenderer)
      this.renderAddOnAsSingleImage = !this.renderAddOnAsSingleImage
      this.AddonRenderer.image = image
    }
  }


  private setupRenderers(addon: AddOnBase): void {
    this.AddonRenderer = new AddonRenderer()
    this.BaseCanvasRenderer = new AddonRenderer()  
       
    addon.getRenderers().forEach(renderer=> {
      if(addon.ctx === CanvasCTX.Background) {
        renderer.ctx = GSM.CanvasController.backgroundCTX
        this.BaseCanvasRenderer.ctx = renderer.ctx
      }
      if(addon.ctx === CanvasCTX.Foreground) {
        renderer.ctx = GSM.CanvasController.foregroundCTX
        this.AddonRenderer.ctx = renderer.ctx
      }
      if(addon.ctx === CanvasCTX.Fog) {
        renderer.ctx = GSM.CanvasController.fogCTX
        this.AddonRenderer.ctx = renderer.ctx
      }
      if(addon.ctx === CanvasCTX.BlackoutFog) {
        renderer.ctx = GSM.CanvasController.blackoutCTX
        this.AddonRenderer.ctx = renderer.ctx
      }
    })
  }
}