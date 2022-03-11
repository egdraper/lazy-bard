import { GSM } from "../../../../game-state-manager.service";
import { Cell, ElevationLayers } from "../../../../models/map";
import { Painter } from "../../../../models/painter";

export class GridLinesPainter extends Painter {
  public paintOrder = 2

  public paint(cell: Cell): void {
    this.ctx.beginPath()
    this.ctx.moveTo(cell.posX, cell.posY)
    this.ctx.lineTo(cell.posX, (cell.posY) + GSM.Settings.blockSize)
    this.ctx.strokeStyle = "rgba(75, 75, 75)"
    this.ctx.lineWidth = 1;
    this.ctx.stroke()

    // Vertical Lines
    this.ctx.beginPath()
    this.ctx.moveTo(cell.posX, cell.posY)
    this.ctx.lineTo((cell.posX) + GSM.Settings.blockSize, cell.posY)
    this.ctx.strokeStyle = "rgba(75, 75, 75)"
    this.ctx.lineWidth = 1;
    this.ctx.stroke()
  }
}