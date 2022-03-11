import { Subscription } from "rxjs"
import { AddonPainter } from "../extensions/drawable-addons/addon.painter";
import { ImageGenerator } from "../extensions/drawable-addons/image.generator";
import { AddOnBase } from "../extensions/addon-base"
import { GSM } from "../game-state-manager.service"
import { CanvasCTX } from "../models/extension.model";
import { Painter } from "../models/painter";

export class PaintController {
  public layerPainter: AddonPainter;
  public allIncludedPainters: Painter[] = [];
  public allExcludedPainters: Painter[] = []
  public paintLayerAsSingleImage = false;

  private subscriptions: Subscription[] = []
  
  constructor() { 
    this.subscriptions.push(GSM.FrameController.frameFire.subscribe(this.onFrameFire.bind(this)))
    this.subscriptions.push(GSM.EventController.generalActionFire.subscribe(this.onGenerateBackground.bind(this)))
  }

  public init() {
    GSM.LayerController.addOns.filter((addon) =>
      addon.getPainters().forEach((painter) => {
        this.setupPainters(addon)
        if(!addon.excludeFromSingleImagePainting) { 
          this.allIncludedPainters.push(painter)
        }
      })
    );
  }
  
  public stop(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
    
  public generateLayerImage(): HTMLImageElement {
    const image = ImageGenerator.generateLayerImage(this.allIncludedPainters);
    return image;
  }


  private onFrameFire(frame: number): void {
    if(!(GSM.LayerController.addOns && GSM.LayerController.addOns.length !== 0)) { return }
    this.clearCanvases()    
    this.addOrderedPaintersToCells()
    
    if(this.paintLayerAsSingleImage) {
      this.renderAddonAsSingleImage(frame)
    } else {
      this.renderAllLayersAndCellsIndependently(frame)
    }
  }

  private renderAddonAsSingleImage(frame: number): void {
    // renders the background and any included Addons as a single image
    this.layerPainter.paint()

    // renders any excluded addons from being painted as part of the single image
    GSM.LayerController.addOns.forEach(layerAddon => {
      if(layerAddon.excludeFromSingleImagePainting) {
        this.runPainterForException(layerAddon, frame)
      }
    })
  }

  private renderAllLayersAndCellsIndependently(frame: number): void {
    GSM.GridController.iterateAllVisibleLayerCells((cell) => {
      cell.painters.forEach(painter => {
        painter.paint(cell, frame)
      })
    })
  }

  private runPainterForException(layerAddon: AddOnBase, frame: number): void {
    GSM.GridController.iterateAllVisibleLayerCells(cell => {
      layerAddon.getPainters().forEach(painter => {
        painter.paint(cell, frame)
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

  public addOrderedPaintersToCells(): void {
    if(GSM.GridController.getCell(0,0,0).painters.length === 0) {
      GSM.GridController.iterateAllVisibleLayerCells(cell => {
        GSM.LayerController.addOns.forEach(LayerAddOn => {
          if(LayerAddOn.id === "BaseLayerAddOn") { return }
          LayerAddOn.getPainters().forEach(painter => {
            cell.painters.push(painter)
          })
        })
      })
    }
  }

  private onGenerateBackground(action): void {
    if (action.name === 'generateBackground') {
      const image = this.generateLayerImage();
      this.paintLayerAsSingleImage = !this.paintLayerAsSingleImage;
      this.layerPainter.image = image;
    }
  }


  private setupPainters(addon: AddOnBase): void {
    this.layerPainter = new AddonPainter()  
       
    addon.getPainters().forEach(painter=> {
      if(addon.ctx === CanvasCTX.Background) {
        painter.ctx = GSM.CanvasController.backgroundCTX
        this.layerPainter.ctx = painter.ctx
      }
      if(addon.ctx === CanvasCTX.Foreground) {
        painter.ctx = GSM.CanvasController.foregroundCTX
        this.layerPainter.ctx = painter.ctx
      }
      if(addon.ctx === CanvasCTX.Fog) {
        painter.ctx = GSM.CanvasController.fogCTX
        this.layerPainter.ctx = painter.ctx
      }
      if(addon.ctx === CanvasCTX.BlackoutFog) {
        painter.ctx = GSM.CanvasController.blackoutCTX
        this.layerPainter.ctx = painter.ctx
      }
    })
  }
}