
import { GSM } from "src/app/game/game-state-manager.service";
import { Cell, RenderingLayers } from "../../../../models/map";
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer";

export class GridLinesRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer
  public override excludeFromIndividualCellPainting: boolean = true

  public onDraw(event: RenderOptionsEvent): void {
    this.ctx.beginPath()
    this.ctx.moveTo(event.cell.posX + .5, event.cell.posY + .5)
    this.ctx.lineTo(event.cell.posX + .5, event.cell.posY + GSM.Settings.blockSize + .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75,.5)"
    this.ctx.stroke()

    // Vertical Lines
    this.ctx.beginPath()
    this.ctx.moveTo(event.cell.posX - .5, event.cell.posY - .5)
    this.ctx.lineTo((event.cell.posX) + GSM.Settings.blockSize - .5, event.cell.posY + .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75,.5)"
    this.ctx.stroke()
  }
}