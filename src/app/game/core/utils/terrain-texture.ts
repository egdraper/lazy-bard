import { drawableItems } from '../../db/drawable-items.db';
import { GSM } from '../../game-state-manager.service';
import { Extension } from '../../models/extension.model';
import { DrawableTile } from '../../models/sprite-tile.model';

export class TerrainTexture {
  public static async setupImages(): Promise<void> {
    const drawableItems = await this.getDrawableImages()
    this.catchImages(drawableItems)
  }

  private static catchImages(drawableItems: DrawableTile[]): void {
    drawableItems.forEach((drawableItems) => {
      GSM.ImageManager.addImageBySrcUrl(drawableItems.imageUrl)
    })
  }

  // MOCKS DB call from Server
  private static getDrawableImages(): Promise<DrawableTile[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(drawableItems)
      }, 200)
    })
  }
}
