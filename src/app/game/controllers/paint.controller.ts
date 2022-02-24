import { Subscription } from "rxjs"
import { GSM } from "../game-state-manager.service"
import { Painter } from "../models/painter"

export class PaintController {
  private engineSubscription: Subscription
  private painters: Painter[] = []

  constructor() { }
  
  public registerPainter(painter: Painter): void {
    this.painters.push(painter)
  }

  public removePainter(painter: Painter): void {
    this.painters = this.painters.filter(_painter => painter !== _painter)
  } 

  public startPainter(): void {
    this.engineSubscription = GSM.FrameController.fire.subscribe(frame => {
      this.painters.forEach(painter => {
        if(painter.ctx) {
          painter.ctx.clearRect(0,0, GSM.GridController.gameMap.size.width * GSM.Settings.blockSize, GSM.GridController.gameMap.size.height * GSM.Settings.blockSize)
          painter.ctx.imageSmoothingEnabled = false
        }
      })
      
      GSM.GridController.iterateVisibleCells(cell => {
        this.painters.forEach(painter => {
          painter.paint(cell, frame)
        })
      })
    })
  }
  
  public stop(): void {
    this.engineSubscription.unsubscribe()
  }
}