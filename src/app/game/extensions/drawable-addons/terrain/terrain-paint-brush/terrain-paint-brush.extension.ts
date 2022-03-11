import { GSM } from '../../../../game-state-manager.service';
import { AddOnExtension } from '../../../../models/extension.model';
import { drawableItems } from '../../../../db/drawable-items.db';
import { DrawableItem } from '../../../../models/map';
import { TerrainPaintBrushEventHandler } from './terrain-paint-brush.event-handler';
import { TerrainPaintBrushRenderer } from './terrain-paint-brush.renderer';

export class TerrainPaintBrushExtension implements AddOnExtension {
  public id = "TerrainPaintBrushExtension"
  public renderer = new TerrainPaintBrushRenderer();

  public async init(): Promise<void> {
    new TerrainPaintBrushEventHandler(this.renderer);
    await this.setupImages();
  }

  private async setupImages(): Promise<void> {
    const drawableItems = await this.getDrawableImages();
    this.loadImagesIntoRenderer(drawableItems);
  }

  private loadImagesIntoRenderer(drawableItems: DrawableItem[]): void {
    drawableItems.forEach((drawableItems) => {
      GSM.ImageController.addImageBySrcUrl(drawableItems.imageUrl)
    });
  }

  // MOCKS DB call from Server
  private getDrawableImages(): Promise<DrawableItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(drawableItems);
      }, 200);
    });
  }
}
