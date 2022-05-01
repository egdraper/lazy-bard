import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { PlayableAssetEventHandler } from './character.event-handler';
import { PlayableAssetRenderer } from './character.renderer';

export class PlayableAssetExtension extends CanvasLayerExtension {
  public renderer = new PlayableAssetRenderer();

  public override async init(): Promise<void> {
    new PlayableAssetEventHandler()
  }
}
