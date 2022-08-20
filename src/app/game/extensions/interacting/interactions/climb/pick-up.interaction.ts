import { ArgumentOutOfRangeError } from 'rxjs';
import { GSM } from 'src/app/game/game-state-manager.service';
import { Asset, PlaceableAsset } from 'src/app/game/models/asset.model';
import { InteractionEvent } from '../../interaction.extension';
import { Interaction } from '../base.interaction';

export class ClimbInteraction extends Interaction {
  public displayName: string = 'Climb';

  public interact(event: InteractionEvent): void {
    const object = event.asset
    const asset = event.playerAsset as PlaceableAsset
    asset.hovering = true

    if(object.attributes.size.z > 0) {
      for(let i = 0; i < object.attributes.size.z; i++ ) {
        GSM.AssetController.changeZAxis("up", asset)
      }
    }
    asset.movement.start(asset.anchorCell, GSM.GridController.getCellByLocation(asset.anchorCell.location.x, asset.anchorCell.location.y -1), [])
    asset.hovering = false
  }
}
