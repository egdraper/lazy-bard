import { ArgumentOutOfRangeError } from 'rxjs';
import { GSM } from 'src/app/game/game-state-manager.service';
import { Asset, PlaceableAsset } from 'src/app/game/models/asset.model';
import { ActionEvent } from '../../interaction.feature';
import { Action } from '../../../../models/base.interaction';

export class ClimbAction extends Action {
  public displayName: string = 'Climb';

  public execute(event: ActionEvent): void {
    const object = event.asset
    const asset = event.playerAsset as PlaceableAsset
    asset.hovering = true

    if(object.attributes.size.z > 0) {
      for(let i = 0; i < object.attributes.size.z; i++ ) {
        GSM.AssetManager.changeZAxis("up", asset)
      }
    }
    asset.movement.start(asset.anchorCell, GSM.GridManager.getCellByLocation(asset.anchorCell.location.x, asset.anchorCell.location.y -1), [])
    asset.hovering = false
  }
}
