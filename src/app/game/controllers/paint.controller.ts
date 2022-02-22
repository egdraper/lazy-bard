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
    this.engineSubscription = GSM.FrameController.fire.subscribe(() => {
      this.painters.forEach(painter => {
        if(painter.ctx) {
          painter.ctx.clearRect(0,0, GSM.GridController.grid.size.width * GSM.Settings.blockSize, GSM.GridController.grid.size.height * GSM.Settings.blockSize)
        }
      })
      
      GSM.GridController.iterateVisibleCells(cell => {
        this.painters.forEach(painter => {
          painter.paint(cell)
        })
      })
    })
  }
  
  public stop(): void {
    this.engineSubscription.unsubscribe()
  }
}