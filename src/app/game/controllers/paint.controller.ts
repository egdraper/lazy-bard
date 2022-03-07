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
    this.clearCanvases()     
    
    GSM.LayerController.layerAddOns.forEach(layerAddon => {
      if(layerAddon.paintLayerAsSingleImage) {
        layerAddon.layerPainter.paint()
      } else {
        this.runPaintersByCell(layerAddon, frame)
      }

    
    })
  }
  
  private runPaintersByCell(layerAddon: LayerAddOn, frame: number) {
    GSM.GridController.iterateAllVisibleLayerCells(layerAddon.layerName, (cell) => {
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
}