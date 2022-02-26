import { drawableItems } from '../../db/drawable-items.db';
import { GSM } from '../../game-state-manager.service';
import { DrawableItem } from '../../models/map';
import { TerrainPainterEventHandler } from './terrain-painter.event-handler';
import { TerrainPainterPainter } from './terrain-painter.painter';

export class TerrainPainterExtension {
  private painter = new TerrainPainterPainter();

  constructor() {
    new TerrainPainterEventHandler();
    this.setupImages();
  }

  private async setupImages(): Promise<void> {
    const drawableItems = await this.getDrawableImages();
    this.loadImagesIntoPainter(drawableItems);
    GSM.PaintController.registerPainter(this.painter);
  }

  private loadImagesIntoPainter(drawableItems: DrawableItem[]): void {
    drawableItems.forEach((drawableItems) => {
      const image = new Image();
      image.src = drawableItems.imageUrl;
      this.painter.images[drawableItems.imageUrl] = image;
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
