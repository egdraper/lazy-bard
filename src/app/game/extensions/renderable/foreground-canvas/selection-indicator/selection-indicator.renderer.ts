import { Asset } from 'src/app/game/models/sprite-tile.model';
import { GSM } from '../../../../game-state-manager.service';
import { RenderingLayers } from '../../../../models/map';
import { Renderer } from '../../../../models/renderer';

export class SelectionIndicatorRenderer implements Renderer {
  ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX;
  public renderingLayer: RenderingLayers = RenderingLayers.CharacterLayer;

  private posX;
  private posY;
  private width;
  private height;

  public onDraw(asset: Asset, frame: number): void {
    if (!asset || !asset.selected) {
      return;
    }

    this.animateMarker(asset, frame);
    this.ctx.beginPath();
    this.ctx.rect(this.posX, this.posY, this.width, this.height);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'rgba(255, 0 , 0, .5)';
    this.ctx.stroke();
  }

  private animateMarker(asset: Asset, frame: number): void {
    if (frame <= 32) {
      this.posX = asset.movementOffset.x - Math.floor(frame / 6);
      this.posY = asset.movementOffset.y - Math.floor(frame / 6);
      this.width = GSM.Settings.blockSize + Math.floor(frame / 3);
      this.height = GSM.Settings.blockSize + Math.floor(frame / 3);
    }
    if (frame > 32) {
      this.posX = asset.movementOffset.x - Math.abs(Math.floor(frame / 6) - 12);
      this.posY = asset.movementOffset.y - Math.abs(Math.floor(frame / 6) - 12);
      this.width =
        GSM.Settings.blockSize + Math.abs(Math.floor(frame / 3) - 24);
      this.height =
        GSM.Settings.blockSize + Math.abs(Math.floor(frame / 3) - 24);
    }
  }
}
