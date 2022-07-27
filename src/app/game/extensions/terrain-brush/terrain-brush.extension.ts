import { drawableItems } from '../../db/drawable-items.db';
import { GSM } from '../../game-state-manager.service';
import { CanvasLayerExtension } from '../../models/renderer';
import { DrawableItemViewModel } from '../../models/sprite-tile.model';
import { EraserEventHandler } from './eraser.event-handler';
import { TerrainTreeBrushEventHandler } from './terrain-brush.event-handler';
import { TerrainPaintBrushRenderer } from './terrain-texture.renderer';

export class TerrainBrushExtension extends CanvasLayerExtension {
  public renderer = new TerrainPaintBrushRenderer()

  public override async init(): Promise<void> {
    new TerrainTreeBrushEventHandler();
    new EraserEventHandler();
    await this.setupImages()
  }

  private async setupImages(): Promise<void> {
    const drawableItems = await this.getDrawableImages()
    this.catchImages(drawableItems)
  }

  private catchImages(drawableItems: DrawableItemViewModel[]): void {
    drawableItems.forEach((drawableItems) => {
      GSM.ImageController.addImageBySrcUrl(drawableItems.imageUrl)
    })
  }

  // MOCKS DB call from Server
  private getDrawableImages(): Promise<DrawableItemViewModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(drawableItems)
      }, 200)
    })
  }
}
