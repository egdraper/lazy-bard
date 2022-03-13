import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { PlayableAssetAnimator } from './playable-asset.animator';
import { PlayableAssetEventHandler } from './playable-asset.event-handler';
import { PlayableAssetRenderer } from './playable-asset.renderer';

export class PlayableAssetExtension extends CanvasLayerExtension {
  public renderer = new PlayableAssetRenderer();

  public override async init(): Promise<void> {
    new PlayableAssetEventHandler()
    new PlayableAssetAnimator()
  }
}
