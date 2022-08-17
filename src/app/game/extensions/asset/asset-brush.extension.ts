import { Extension } from '../../models/extension.model';
import { AssetBrush } from './asset-brush';

export class AssetBrushExtension extends Extension {
  public gameMasterView: boolean = true
  public gamePlayerView: Boolean = false

  public override async init(): Promise<void> {
    new AssetBrush()
  }
}
