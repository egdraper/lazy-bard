import { drawableItems } from '../../db/drawable-items.db';
import { GSM } from '../../game-state-manager.service';
import { Extension } from '../../models/extension.model';
import { DrawableTile } from '../../models/sprite-tile.model';

export class TerrainExtension extends Extension {
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
