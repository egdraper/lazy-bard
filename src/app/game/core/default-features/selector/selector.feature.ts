import { Extension } from '../../../models/extension.model';
import { GSM } from '../../../game-state-manager.service';
import { Asset } from '../../../models/asset.model';

export class SelectorExtension extends Extension {
  public gameMasterView: Boolean = true
  public gamePlayerView: Boolean = false

  public override async init(): Promise<void> {
    GSM.MouseManager.assetClick.subscribe(this.onAssetClicked.bind(this));
    GSM.KeyManager.deletePressed.subscribe(this.onDeletePressed.bind(this))
  }

  public onDeletePressed() {
    GSM.AssetManager.selectedAssets.forEach(asset => {
      GSM.AssetManager.removeAsset(asset)
    })
  }

  public onAssetClicked(asset: Asset) {

    if (GSM.EventManager.generalActionFire.value.name !== 'assetSelect') { 
      return
    }

    if(!asset) { return }

    if (!GSM.KeyManager.keysPressed.has('MetaLeft')) {
      GSM.AssetManager.deselectAllAssets();
    }

    GSM.AssetManager.toggleAssetSelection(asset)
    
    // GSM.ActionController.generalActionFire.next({
    //   name: 'characterSelected',
    //   data: asset,
    // });
  }
}
