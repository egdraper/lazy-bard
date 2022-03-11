import { AddOnExtension } from 'src/app/game/models/extension.model';
import { PlayableAssetAnimator } from './playable-asset.animator';
import { PlayableAssetEventHandler } from './playable-asset.event-handler';
import { PlayableAssetRenderer } from './playable-asset.renderer';

export class PlayableAssetExtension implements AddOnExtension{
  public id = "PlayableAssetExtension"
  public renderer = new PlayableAssetRenderer();

  public async init(): Promise<void> {
    new PlayableAssetEventHandler()
    new PlayableAssetAnimator()
  }
}
