import { AddOnExtension, Extension } from 'src/app/game/models/extension.model';
import { drawableItems } from '../../../../db/drawable-items.db';
import { DrawableItem } from '../../../../models/map';
import { LayerAddOn } from '../../../layer-extension';
import { TerrainPainterEventHandler } from './terrain-painter.event-handler';
import { TerrainPainterPainter } from './terrain-painter.painter';

export class TerrainPainterExtension implements AddOnExtension {
  public id = "TerrainPainterExtension"
  public painter = new TerrainPainterPainter();

  public init(): void {
    new TerrainPainterEventHandler();
    this.setupImages();
  }

  private async setupImages(): Promise<void> {
    const drawableItems = await this.getDrawableImages();
    this.loadImagesIntoPainter(drawableItems);
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
