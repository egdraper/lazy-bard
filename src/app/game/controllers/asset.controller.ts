import { Subject } from 'rxjs';
import { GSM } from '../game-state-manager.service';
import { Asset } from '../models/asset.model';

export class AssetController {
  public assetClicked = new Subject<Asset>();

  constructor() {
    GSM.EventController.cellClick.subscribe(this.onCellClicked.bind(this));
    GSM.FrameController.frameFire.subscribe(this.animateAsset.bind(this));
  }

  public getAssetByCellId(cellId: string): Asset | undefined {
    return GSM.GameData.assets.find((asset) => asset.cell.id === cellId);
  }

  public getSelectedAssets(): Asset[] {
    return GSM.GameData.assets.filter((asset) => asset.selected);
  }

  public deselectAllAssets(): void {
    GSM.GameData.assets.forEach((asset) => (asset.selected = false));
  }

  private onCellClicked(cellId: string): void {
    const asset = this.getAssetByCellId(cellId);
    if (asset) {
      this.assetClicked.next(asset);
      return;
    }
  }

  private animateAsset(frame: number): void {
    GSM.GameData.assets.forEach((asset: Asset) => {
      if (asset.animating) {
        if (frame % asset.assetTile.animation.changeEveryNthFrame === 0) {
          asset.movement.updateAnimation();
        }
      }
    });
  }
}
