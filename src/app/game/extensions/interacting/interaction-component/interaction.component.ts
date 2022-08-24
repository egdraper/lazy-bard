import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GSM } from 'src/app/game/game-state-manager.service';
import { InteractionEvent } from '../interaction.extension';
import { Interaction } from '../interactions/base.interaction';
import { ClimbInteraction } from '../interactions/climb/pick-up.interaction';
import { PickUpInteraction } from '../interactions/pick-up/pick-up.interaction';

@Component({
  selector: 'gm-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.scss']
})
export class InteractionComponent implements OnInit, OnDestroy {
  public interactionEvent: InteractionEvent

  private subscriptions: Subscription[] = []
  public interactions: Interaction[] = [
    new PickUpInteraction(),
    new ClimbInteraction()
  ]

  public ngOnInit(): void {
    setTimeout(() => {
      this.subscriptions.push(GSM.EventController.objectInteraction.subscribe((event: InteractionEvent ) => {
        console.log(event)
        this.interactionEvent = event
      }))
    }, (50));
  } 

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }

  public onClick(interaction: Interaction): void {
    console.log(this.interactionEvent)
    interaction.interact(this.interactionEvent)
  }
}
