import { GSM } from 'src/app/game/game-state-manager.service';
import { Asset } from 'src/app/game/models/asset.model';
import { ActionEvent } from '../../interaction.feature';
import { Action } from '../../../../models/base.interaction';

export class PickUpAction extends Action {
  public displayName: string = 'Pick Up';
  public collectedAssets: Asset[] = []

  public execute(event: ActionEvent): void {
    delete GSM.AssetManager.assets[event.asset.id]

    event.asset.ownedBlockIds.forEach(assetBlockId => {
      delete GSM.AssetManager.assetBlocks[assetBlockId]
    })

    GSM.PlayerAssetManager.inventory.push(event.asset)
    GSM.AssetManager.refreshAssetIterator()
    GSM.RendererManager.renderAsSingleImage()
    GSM.ActionManager.removeAssetOfInterest(event.asset)
  }
}
