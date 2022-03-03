import { Subscription } from "rxjs"
import { GSM } from "../game-state-manager.service"
import { Cell, ElevationLayers } from "../models/map"
import { Painter } from "../models/painter"

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

    GSM.GridController.iterateVisibleCells((cell) => {
      this.runPainters(cell, frame)
    })
  }

  private runPainters(cell: Cell, frame: number) {
    if(!cell.painters) { return }

    cell.painters.forEach(painter => {
      painter.paint(cell, frame)
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