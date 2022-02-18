import { Subscription } from "rxjs"
import { GSM } from "../game-state-manager.service"
import { Painter } from "../models/painter"

export class PaintController {
  private engineSubscription: Subscription
  private painters: Painter[]

  constructor() {
    this.startPainter()
  }
  
  public registerPainter(painter: Painter): void {
      
  }

  public removePainter(painter: Painter): void {

  } 

  private startPainter(): void {
    this.engineSubscription = GSM.FrameController.fire.subscribe(() => {
      this.painters.forEach(painter => {
        painter.paint()
      })
    })
  }
  
    public stop(): void {
      this.engineSubscription.unsubscribe()
    }
}