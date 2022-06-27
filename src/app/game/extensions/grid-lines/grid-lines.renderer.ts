
import { GSM } from "src/app/game/game-state-manager.service";
import { BackgroundAsset } from "../../models/asset.model";
import { RenderingLayers } from "../../models/map";
import { BackgroundRenderer } from "../../models/renderer";

export class GridLinesRenderer implements BackgroundRenderer {
  public ctx: CanvasRenderingContext2D;
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer

  public onDraw(background: BackgroundAsset): void {
    this.ctx.beginPath()
    this.ctx.moveTo(background.blocks.position.x + .5, background.blocks.position.y + .5)
    this.ctx.lineTo(background.blocks.position.x + .5, background.blocks.position.y + GSM.Settings.blockSize + .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75,.5)"
    this.ctx.stroke()

    // Vertical Lines
    this.ctx.beginPath()
    this.ctx.moveTo(background.blocks.position.x - .5, background.blocks.position.y - .5)
    this.ctx.lineTo((background.blocks.position.x) + GSM.Settings.blockSize - .5, background.blocks.position.y + .5)
    this.ctx.strokeStyle = "rgba(75, 75, 75,.5)"
    this.ctx.stroke()
  }
}