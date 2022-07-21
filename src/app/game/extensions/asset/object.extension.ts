import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { AssetSelector } from './asset-selector';
import { AssetBrush } from './asset.brush';
import { AssetRenderer } from './asset.renderer';
import { ObjectRenderer } from './object.renderer';

export class ObjectExtension extends CanvasLayerExtension {
  public renderer = new ObjectRenderer();
}
