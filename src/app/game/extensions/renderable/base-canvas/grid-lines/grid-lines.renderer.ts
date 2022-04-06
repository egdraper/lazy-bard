
import { GSM } from "src/app/game/game-state-manager.service";
import { Cell, RenderingLayers } from "../../../../models/map";
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer";

export class GridLinesRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer
  public override excludeFromIndividualCellPainting: boolean = true

  public onDraw(event: RenderOptionsEvent): void {
    this.ctx.beginPath()
    this.ctx.moveTo(event.cell.position.x + .5, event.cell.position.y + .5)
    this.ctx.lineTo(event.cell.position.x + .5, event.cell.position.y + GSM.Settings.blockSize + .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75,.5)"
    this.ctx.stroke()

    // Vertical Lines
    this.ctx.beginPath()
    this.ctx.moveTo(event.cell.position.x - .5, event.cell.position.y - .5)
    this.ctx.lineTo((event.cell.position.x) + GSM.Settings.blockSize - .5, event.cell.position.y + .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75,.5)"
    this.ctx.stroke()
  }
}