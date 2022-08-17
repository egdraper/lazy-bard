import { drawableItems } from '../../db/drawable-items.db';
import { GSM } from '../../game-state-manager.service';
import { CanvasLayerExtension } from '../../models/renderer';
import { DrawableTile } from '../../models/sprite-tile.model';
import { TerrainTreeBrushEventHandler } from './terrain-brush';
import { TerrainPaintBrushRenderer } from './terrain.renderer';

export class TerrainExtension extends CanvasLayerExtension {
  public renderer = new TerrainPaintBrushRenderer()
  public gameMasterView: boolean = true
  public gamePlayerView: Boolean = true

  public override async init(): Promise<void> {
    await this.setupImages()
  }

  private async setupImages(): Promise<void> {
    const drawableItems = await this.getDrawableImages()
    this.catchImages(drawableItems)
  }

  private catchImages(drawableItems: DrawableTile[]): void {
    drawableItems.forEach((drawableItems) => {
      GSM.ImageController.addImageBySrcUrl(drawableItems.imageUrl)
    })
  }

  // MOCKS DB call from Server
  private getDrawableImages(): Promise<DrawableTile[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(drawableItems)
      }, 200)
    })
  }
}
