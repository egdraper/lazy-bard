
import { GSM } from "src/app/game/game-state-manager.service";
import { BackgroundAsset } from "../models/asset.model";
import { RenderingLayers } from "../models/map";
import { BackgroundRenderer } from "../models/renderer";

export class GridLinesRenderer implements BackgroundRenderer {
  public id: string = "GridLinesRenderer"
  public ctx: CanvasRenderingContext2D;
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer
  public enabled: boolean = true

  public onDraw(background: BackgroundAsset): void {
    this.ctx.beginPath()
    this.ctx.moveTo(background.anchorCell.position.x + .5, background.anchorCell.position.y + .5)
    this.ctx.lineTo(background.anchorCell.position.x + .5, background.anchorCell.position.y + GSM.Settings.blockSize + .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75, .3)"
    this.ctx.stroke()

    // Vertical Lines
    this.ctx.beginPath()
    this.ctx.moveTo(background.anchorCell.position.x - .5, background.anchorCell.position.y - .5)
    this.ctx.lineTo((background.anchorCell.position.x) + GSM.Settings.blockSize - .5, background.anchorCell.position.y - .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75, .3)"
    this.ctx.stroke()
  }
}