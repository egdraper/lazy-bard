import { GSM } from 'src/app/game/game-state-manager.service';
import { Asset } from 'src/app/game/models/asset.model';
import { InteractionEvent } from '../../interaction.extension';
import { Interaction } from '../base.interaction';

export class PickUpInteraction extends Interaction {
  public displayName: string = 'Pick Up';

  public interact(event: InteractionEvent): void {
    
  }
}
