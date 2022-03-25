import { GSM } from "../../../../game-state-manager.service";
import { Cell, RenderingLayers } from "../../../../models/map";
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer";

export class GridLinesRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer
  public override excludeFromIndividualCellPainting: boolean = true

  public onDraw(event: RenderOptionsEvent): void {
    this.ctx.beginPath()
    this.ctx.moveTo(event.cell.posX, event.cell.posY)
    this.ctx.lineTo(event.cell.posX, (event.cell.posY) + GSM.Settings.blockSize)
    this.ctx.strokeStyle = "rgba(75, 75, 75)"
    this.ctx.lineWidth = 1;
    this.ctx.stroke()

    // Vertical Lines
    this.ctx.beginPath()
    this.ctx.moveTo(event.cell.posX, event.cell.posY)
    this.ctx.lineTo((event.cell.posX) + GSM.Settings.blockSize, event.cell.posY)
    this.ctx.strokeStyle = "rgba(75, 75, 75)"
    this.ctx.lineWidth = 1;
    this.ctx.stroke()
  }
}