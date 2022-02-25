import { drawableItems } from '../../db/drawable-items.db';
import { GSM } from '../../game-state-manager.service';
import { Cell, DrawableItem, TerrainCell } from '../../models/map';
import { TerrainPainterPainter } from './terrain-painter.painter';

export class TerrainPainterExtension {
  private painter = new TerrainPainterPainter();

  constructor() {
    GSM.KeyEventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this))
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

  private onEmptyCellClicked(cell: TerrainCell): void {
    cell.drawableTileId = GSM.editorController.selectedDrawableItem.value.id
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
