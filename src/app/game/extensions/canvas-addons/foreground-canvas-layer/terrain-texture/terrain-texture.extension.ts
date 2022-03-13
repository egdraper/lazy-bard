import { GSM } from '../../../../game-state-manager.service';
import { drawableItems } from '../../../../db/drawable-items.db';
import { DrawableItem } from '../../../../models/map';
import { TerrainPaintBrushRenderer } from './terrain-texture.renderer';
import { CanvasLayerExtension } from 'src/app/game/models/renderer';

export class TerrainTextureExtension extends CanvasLayerExtension {
  public renderer = new TerrainPaintBrushRenderer();

  public override async init(): Promise<void> {
    await this.setupImages();
  }

  private async setupImages(): Promise<void> {
    const drawableItems = await this.getDrawableImages();
    this.catchImages(drawableItems);
  }

  private catchImages(drawableItems: DrawableItem[]): void {
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
