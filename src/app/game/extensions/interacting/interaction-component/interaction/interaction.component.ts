import { Component, OnInit } from '@angular/core';
import { GSM } from 'src/app/game/game-state-manager.service';
import { Asset } from 'src/app/game/models/asset.model';
import { Cell } from 'src/app/game/models/map';
import { InteractionEvent } from '../../interaction.extension';
import { Interaction } from '../../interactions/base.interaction';
import { ClimbInteraction } from '../../interactions/climb/pick-up.interaction';
import { PickUpInteraction } from '../../interactions/pick-up/pick-up.interaction';

@Component({
  selector: 'gm-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.scss']
})
export class InteractionComponent implements OnInit {
  public interactionEvent: InteractionEvent

  public interactions: Interaction[] = [
    new PickUpInteraction(),
    new ClimbInteraction()
  ]

  public ngOnInit(): void {
    GSM.EventController.objectInteraction.subscribe((event: InteractionEvent ) => {
      this.interactionEvent = event
    })
  }  

  public onClick(interaction: Interaction): void {
    interaction.interact(this.interactionEvent)
  }
}
