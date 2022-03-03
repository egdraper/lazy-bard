import { GSM } from '../../../../game-state-manager.service';
import { MovableAsset } from './movable-asset';

export class MovableAssetAnimator {
  constructor() {
    this.setupCharacterAnimation()
  }

  public setupCharacterAnimation(): void {
    GSM.FrameController.frameFire.subscribe((frame) => {
      GSM.AssetController.assets.forEach((asset: MovableAsset) => {
        if (asset.animating) {
          if (frame % asset.animationFrame === 0) {
            asset.updateAnimation();
          }
        }
      });
    });
  }
}
