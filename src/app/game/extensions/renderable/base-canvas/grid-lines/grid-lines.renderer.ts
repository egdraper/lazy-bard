
import { GSM } from "src/app/game/game-state-manager.service";
import { BackgroundAsset } from "src/app/game/models/sprite-tile.model";
import { RenderingLayers } from "../../../../models/map";
import { BackgroundRenderer } from "../../../../models/renderer";

export class GridLinesRenderer implements BackgroundRenderer {
  public ctx: CanvasRenderingContext2D;
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer

  public onDraw(background: BackgroundAsset): void {
    this.ctx.beginPath()
    this.ctx.moveTo(background.cell.position.x + .5, background.cell.position.y + .5)
    this.ctx.lineTo(background.cell.position.x + .5, background.cell.position.y + GSM.Settings.blockSize + .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75,.5)"
    this.ctx.stroke()

    // Vertical Lines
    this.ctx.beginPath()
    this.ctx.moveTo(background.cell.position.x - .5, background.cell.position.y - .5)
    this.ctx.lineTo((background.cell.position.x) + GSM.Settings.blockSize - .5, background.cell.position.y + .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75,.5)"
    this.ctx.stroke()
  }
}