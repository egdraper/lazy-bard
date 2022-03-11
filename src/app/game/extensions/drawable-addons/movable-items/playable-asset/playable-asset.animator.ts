import { GSM } from '../../../../game-state-manager.service';
import { PlayableAsset } from './playable-asset.model';

export class PlayableAssetAnimator {
  constructor() {
    this.setupCharacterAnimation()
  }

  public setupCharacterAnimation(): void {
    GSM.FrameController.frameFire.subscribe((frame) => {
      GSM.AssetController.assets.forEach((asset: PlayableAsset) => {
        if (asset.animating) {
          if (frame % asset.animationFrame === 0) {
            asset.updateAnimation();
          }
        }
      });
    });
  }
}
