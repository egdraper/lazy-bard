import { GSM } from "../../game-state-manager.service";
import { Cell } from "../../models/map";
import { Painter } from "../../models/painter";

export class GridLinesPainter implements Painter {
  public id = "gridLinePainter"
  public ctx = GSM.CanvasController.backgroundCTX

  public paint(cell: Cell): void {
    this.ctx.beginPath()
    this.ctx.moveTo(cell.posX, cell.posY)
    this.ctx.lineTo(cell.posX, (cell.posY) + GSM.Settings.blockSize)
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "rgba(255, 255 ,255,.5)"
    this.ctx.stroke()

    // Vertical Lines
    this.ctx.beginPath()
    this.ctx.moveTo(cell.posX, cell.posY)
    this.ctx.lineTo((cell.posX) + GSM.Settings.blockSize, cell.posY)
    this.ctx.strokeStyle = "rgba(255,255,0,.5)"
    this.ctx.lineWidth = 1;
    this.ctx.stroke()
  }
}