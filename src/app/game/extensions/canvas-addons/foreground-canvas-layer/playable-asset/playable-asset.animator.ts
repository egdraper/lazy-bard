import { GSM } from '../../../../game-state-manager.service';
import { PlayableAsset } from './playable-asset.model';

export class PlayableAssetAnimator {
  constructor() {
    GSM.FrameController.frameFire.subscribe(this.animateCharacter.bind(this));
  }

  public animateCharacter(frame: number): void {
    GSM.AssetController.assets.forEach((asset: PlayableAsset) => {
      if (asset.animating) {
        if (frame % asset.animationFrame === 0) {
          asset.updateAnimation();
        }
      }
    });
  }
}
