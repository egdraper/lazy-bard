import { GSM } from '../../../../game-state-manager.service';
import { Cell, ElevationLayers } from '../../../../models/map';
import { Painter } from '../../../../models/painter';
import { MovableAsset } from './movable-asset';

export class MovableAssetPainter implements Painter {
  public layer = ElevationLayers.FloorObjectLayer;
  public paintOrder = 1
  public ctx = GSM.CanvasController.foregroundCTX;
  public images: { [imageUrl: string]: HTMLImageElement } = {};

  public paint(cell: Cell): void {
    const playableAsset = GSM.AssetController.getAssetByCellId(cell.id) as MovableAsset;
    if (!playableAsset) { return; }

    let image = this.images[playableAsset.imageUrl];
    if (!image) {
      this.images[playableAsset.imageUrl] = new Image();
      this.images[playableAsset.imageUrl].src = playableAsset.imageUrl;
      image = this.images[playableAsset.imageUrl];
    }

    this.ctx.drawImage(
      image,
      playableAsset.frameXPosition[playableAsset.frameCounter],
      playableAsset.frameYPosition,
      25,
      36,
      playableAsset.positionX - 8,
      playableAsset.positionY - 58,
      50,
      80
    );
  }
}
