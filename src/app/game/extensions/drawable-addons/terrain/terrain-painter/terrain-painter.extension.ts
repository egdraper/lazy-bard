import { GSM } from '../../../../game-state-manager.service';
import { AddOnExtension } from '../../../../models/extension.model';
import { drawableItems } from '../../../../db/drawable-items.db';
import { DrawableItem } from '../../../../models/map';
import { TerrainPainterEventHandler } from './terrain-painter.event-handler';
import { TerrainPainterPainter } from './terrain-painter.painter';

export class TerrainPainterExtension implements AddOnExtension {
  public id = "TerrainPainterExtension"
  public renderer = new TerrainPainterPainter();

  public init(): void {
    new TerrainPainterEventHandler(this.renderer);
    this.setupImages();
  }

  private async setupImages(): Promise<void> {
    const drawableItems = await this.getDrawableImages();
    this.loadImagesIntoPainter(drawableItems);
  }

  private loadImagesIntoPainter(drawableItems: DrawableItem[]): void {
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
