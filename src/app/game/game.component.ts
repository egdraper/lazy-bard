import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { drawableItems } from './db/drawable-items.db';
import { trees } from './db/trees.db';
import { GSM } from './game-state-manager.service';

@Component({
  selector: 'gm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit{
  public selected = "nothing"
  constructor(public gameStateManager: GSM) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.gameStateManager.newGame("firstGame", 60, 60, "forest")
      GSM.EventController.generalActionFire.subscribe(action => {
        this.selected = action.name 
      })
    })

  }

  @HostListener("document:keyup", ["$event"])
  public keyPress(event: KeyboardEvent) {
    if(event.code === "Escape") {
      GSM.EventController.generalActionFire.next({
        name: "",
        data: null
      })
    }
    if(event.code === "KeyQ") {
      GSM.EventController.generalActionFire.next({
        name: "addCharacter",
        data: null
      })
    }
    if(event.code === "KeyZ") {
      GSM.EventController.generalActionFire.next({
        name: "deleteTerrain",
        data: null
      })
    }
    if(event.code === "KeyT") {
      GSM.EventController.generalActionFire.next({
        name: "generateTerrain",
        data: {
          terrainId: "Trees-GreenBase",
          backgroundId: "greenGrass"
        }
      })
    }
    if(event.code === "KeyE") {
      GSM.EventController.generalActionFire.next({
        name: "paintingTerrain",
        data: {
          id: "Trees-GrassBase",
          name: "Green Trees with Grass Base",
          spriteType: "DrawableNaturalWall",
          imageUrl: "assets/images/tree-transparent-base.png",
          drawingRules: trees
        }
      })
    }

  }
}
