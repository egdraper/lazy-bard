import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { AssetSelector } from './asset-selector';
import { SelectorRenderer } from '../../renderers/selector.renderer';

export class SelectorExtension extends CanvasLayerExtension {
  public renderer = new SelectorRenderer();
  public gameMasterView: Boolean = true
  public gamePlayerView: Boolean = false

  public override async init(): Promise<void> {
    new AssetSelector()
  }
}
