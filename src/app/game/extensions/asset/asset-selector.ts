import { GSM } from '../../game-state-manager.service';
import { Asset, PlaceableAsset } from '../../models/asset.model';

export class AssetSelector {
  public selectedPlayableAssets: PlaceableAsset[] = [];

  constructor() {
    GSM.MouseController.assetClick.subscribe(this.onAssetClicked.bind(this));
    GSM.KeyController.deletePressed.subscribe(this.onDeletePressed.bind(this))
  }

  public onDeletePressed() {
    GSM.AssetController.selectedAssets.forEach(asset => {
      GSM.AssetController.removeAsset(asset)
    })
  }

  public onAssetClicked(asset: Asset) {

    if (GSM.ActionController.generalActionFire.value.name !== 'assetSelect') { 
      return
    }

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
