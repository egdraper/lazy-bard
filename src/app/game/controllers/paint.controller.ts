import { Subscription } from "rxjs"
import { GSM } from "../game-state-manager.service"
import { Cell, ElevationLayers } from "../models/map"
import { Painter } from "../models/painter"

export class PaintController {
  private engineSubscription: Subscription
  private painters: {[layer: string]: Painter[]} = {}

  constructor() { 
    this.engineSubscription = GSM.FrameController.frameFire.subscribe(this.onFrameFire.bind(this))
  }
  
  public registerPainter(painter: Painter): void {
    if(!this.painters[painter.layer]) {
      this.painters[painter.layer] = []
    }
    const painters = this.painters[painter.layer]
    painters.push(painter)
    painters.sort((a, b) => a.paintOrder - b.paintOrder)
  }

  public removePainter(painter: Painter): void {
    this.painters[painter.layer] = this.painters[painter.layer].filter(_painter => painter !== _painter)
  } 
  
  public stop(): void {
    this.engineSubscription.unsubscribe()
  }

  private onFrameFire(frame: number): void {
    this.clearCanvases()      
      
    GSM.GridController.iterateVisibleCells(cell => {
      this.runPainters(this.painters[ElevationLayers.BaseLayer], cell, frame)
      this.runPainters(this.painters[ElevationLayers.TerrainLayer], cell, frame)
      this.runPainters(this.painters[ElevationLayers.FloorObjectLayer], cell, frame)
    })    
  }

  private runPainters(painters: Painter[], cell: Cell, frame: number) {
    if(!painters) { return }

    painters.forEach(painter => {
      painter.paint(cell, frame)
    })
  }
  
  private clearCanvases(): void {
    GSM.CanvasController.backgroundCTX.clearRect(0,0, GSM.GridController.gameMap.size.width * GSM.Settings.blockSize, GSM.GridController.gameMap.size.height * GSM.Settings.blockSize)
    GSM.CanvasController.backgroundCTX.imageSmoothingEnabled = false
    GSM.CanvasController.foregroundCTX.clearRect(0,0, GSM.GridController.gameMap.size.width * GSM.Settings.blockSize, GSM.GridController.gameMap.size.height * GSM.Settings.blockSize)
    GSM.CanvasController.foregroundCTX.imageSmoothingEnabled = false   
  }
}