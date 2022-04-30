import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { PlayableAssetEventHandler } from './asset.event-handler';
import { PlayableAssetRenderer } from './asset.renderer';

export class PlayableAssetExtension extends CanvasLayerExtension {
  public renderer = new PlayableAssetRenderer();

  public override async init(): Promise<void> {
    new PlayableAssetEventHandler()
  }
}
