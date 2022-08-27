import { GSM } from 'src/app/game/game-state-manager.service';
import { Asset, PlaceableAsset } from 'src/app/game/models/asset.model';
import { Action } from '../../models/base.interaction';
import { ActionEvent } from '../interactions/interaction.feature';
import { PortalingAsset } from './portal-bush.feature';


export class EnterAction extends Action {
  public displayName: string = 'Enter';
  public collectedAssets: Asset[] = []

  public execute(event: ActionEvent): void {
    const asset = event.asset as PortalingAsset
    const playerAsset = event.playerAsset as PlaceableAsset
    if(!asset.portalDestination) { return }
    
    GSM.AssetManager.moveAssetToNewCell(event.playerAsset, asset.portalDestination, asset.portalDestinationZIndex)

    playerAsset.movement.movementOffset.x = asset.portalDestination.position.x
    playerAsset.movement.movementOffset.y = asset.portalDestination.position.y

  }
}
