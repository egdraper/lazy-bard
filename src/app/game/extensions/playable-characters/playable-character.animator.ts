import { GSM } from '../../game-state-manager.service';
import { PlayableAsset } from './playable-character';

export class PlayableCharacterAnimator {

  constructor() {
    this.setupCharacterAnimation()
  }

  public setupCharacterAnimation(): void {
    GSM.FrameController.fire.subscribe((frame) => {
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
