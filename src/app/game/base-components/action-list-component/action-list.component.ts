import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GSM } from 'src/app/game/game-state-manager.service';
import { ActionEvent } from '../../features/interactions/interaction.feature';
import { Action } from '../../models/base.interaction';
import { ClimbAction } from '../../features/interactions/interactions/climb/climb.action';
import { PickUpAction } from '../../features/interactions/interactions/pick-up/pick-up.action';
import { ActionsManager } from '../../core/actions.manager';

@Component({
  selector: 'gm-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class InteractionComponent implements OnInit, OnDestroy {
  public actionManager: ActionsManager

  private subscriptions: Subscription[] = []
  

  public ngOnInit(): void {
    this.actionManager = GSM.ActionManager
  } 

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }

  public onClick(action: Action): void {
    action.execute({asset: GSM.ActionManager.assetsOfInterest[0], cell:  GSM.ActionManager.assetsOfInterest[0].anchorCell, playerAsset: GSM.AssetManager.selectedAssets[0]})
  }
}
