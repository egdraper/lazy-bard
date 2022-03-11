import { AddOnExtension } from 'src/app/game/models/extension.model';
import { PlayableAssetAnimator } from './playable-asset.animator';
import { PlayableAssetEventHandler } from './playable-asset.event-handler';
import { PlayableAssetPainter } from './playable-asset.painter';

export class PlayableAssetExtension implements AddOnExtension{
  public id = "PlayableAssetExtension"
  public painter = new PlayableAssetPainter();

  init(): void {
    new PlayableAssetEventHandler()
    new PlayableAssetAnimator()
  }
}
