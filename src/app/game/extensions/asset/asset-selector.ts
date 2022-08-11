import { Cell, RenderingLayers } from 'src/app/game/models/map';
import { GSM } from '../../game-state-manager.service';
import { Asset, GridAsset } from '../../models/asset.model';
import { AssetTile, SpriteAnimation } from '../../models/sprite-tile.model';
import { Walking } from './movement.ts/walking.movement';

export class AssetSelector {
  public selectedPlayableAssets: Asset[] = [];

  constructor() {
    GSM.MouseController.assetClick.subscribe(this.onAssetClicked.bind(this));
    GSM.KeyController.deletePressed.subscribe(this.onDeletePressed.bind(this))
  }

  public onDeletePressed() {
    GSM.AssetController.selectedAssets.forEach(asset => {
      GSM.AssetController.removeAsset(asset)
    })
  }

  public onAssetClicked(asset: GridAsset) {

    if (GSM.ActionController.generalActionFire.value.name !== 'assetSelect') { 
      return
    }
    GSM.RendererController
    if(!asset) { return }

    if (!GSM.KeyController.keysPressed.has('MetaLeft')) {
      GSM.AssetController.deselectAllAssets();
    }

    GSM.AssetController.toggleAssetSelection(asset)
    
    // GSM.ActionController.generalActionFire.next({
    //   name: 'characterSelected',
    //   data: asset,
    // });
  }
}
