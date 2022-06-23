import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { AssetEventHandler } from './asset.event-handler';
import { AssetRenderer } from './asset.renderer';

export class AssetExtension extends CanvasLayerExtension {
  public renderer = new AssetRenderer();

  public override async init(): Promise<void> {
    new AssetEventHandler()
  }
}
