import { Extension } from '../../models/extension.model';
import { GSM } from '../../game-state-manager.service';
import { Asset } from '../../models/asset.model';

export class SelectorExtension extends Extension {
  public gameMasterView: Boolean = true
  public gamePlayerView: Boolean = false

  public override async init(): Promise<void> {
    GSM.MouseController.assetClick.subscribe(this.onAssetClicked.bind(this));
    GSM.KeyController.deletePressed.subscribe(this.onDeletePressed.bind(this))
  }

  public onDeletePressed() {
    GSM.AssetController.selectedAssets.forEach(asset => {
      GSM.AssetController.removeAsset(asset)
    })
  }

  public onAssetClicked(asset: Asset) {

    if (GSM.EventController.generalActionFire.value.name !== 'assetSelect') { 
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
