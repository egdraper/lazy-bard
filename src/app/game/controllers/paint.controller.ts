import { Subscription } from "rxjs"
import { LayerAddOn } from "../extensions/layer-extension"
import { GSM } from "../game-state-manager.service"
import { Cell } from "../models/map"

export class PaintController {
  private engineSubscription: Subscription

  constructor() { 
    this.engineSubscription = GSM.FrameController.frameFire.subscribe(this.onFrameFire.bind(this))
  }
  
  public stop(): void {
    this.engineSubscription.unsubscribe()
  }

  private onFrameFire(frame: number): void {
    if(!(GSM.LayerController.layerAddOns && GSM.LayerController.layerAddOns.length !== 0)) { return }
    this.clearCanvases()    
    this.addOrderedPainters()
    
    GSM.LayerController.layerAddOns.forEach(layerAddon => {
      if(layerAddon.paintLayerAsSingleImage) {
        layerAddon.layerPainter.paint()
      } else {
        this.runPaintersByCell(layerAddon, frame)
      }    
    })
  }
  
  private runPaintersByCell(layerAddon: LayerAddOn, frame: number) {
    GSM.GridController.iterateAllVisibleLayerCells((cell) => {
      cell.painters.forEach(painter => {
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

  

  public addOrderedPainters(): void {
    if(GSM.GridController.getCell(0,0,0).painters.length === 0) {
      GSM.GridController.iterateAllVisibleLayerCells(cell => {
        GSM.LayerController.layerAddOns.forEach(LayerAddOn => {
          if(LayerAddOn.id === "BaseLayerAddOn") { return }
          LayerAddOn.getPainters().forEach(painter => {
            cell.painters.push(painter)
          })
        })
      })
    }
  }
}