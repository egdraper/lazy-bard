import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { AssetSelector } from './asset-selector';
import { AssetBrush } from './asset.brush';
import { AssetRenderer } from './asset.renderer';

export class AssetExtension extends CanvasLayerExtension {
  public renderer = new AssetRenderer();

  public override async init(): Promise<void> {
    new AssetBrush()
    new AssetSelector()
  }
}
