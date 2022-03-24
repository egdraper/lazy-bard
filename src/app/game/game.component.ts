import { AfterViewInit, Component, HostListener } from '@angular/core';
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
      this.gameStateManager.newGame("firstGame", 10, 10, "forest")
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
    if(event.code === "Delete") {
      GSM.EventController.generalActionFire.next({
        name: "delete",
        data: null
      })
    }
    if(event.code === "KeyQ") {
      GSM.EventController.generalActionFire.next({
        name: "addCharacter",
        data: null
      })
    }
    if(event.code === "KeyB") {
      GSM.EventController.generalActionFire.next({
        name: "generateBackground",
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
        name: "paintingTreeTerrain",
        data: {
          id: "Trees-GrassBase",
        }
      })
    }
    if(event.code === "Digit2") {
      GSM.EventController.generalActionFire.next({
        name: "addElevationUp",
        data: {
          leavingLayer: GSM.ElevationController.currentElevationLayerIndex,
          newLayer: GSM.ElevationController.currentElevationLayerIndex + 1
        }
      })
    }
    if(event.code === "Digit1") {
      GSM.EventController.generalActionFire.next({
        name: "addElevationDown",
        data: {
          leavingLayer: GSM.ElevationController.currentElevationLayerIndex,
          newLayer: GSM.ElevationController.currentElevationLayerIndex - 1
        }
      })
    }
    if(event.code === "KeyR") {
      GSM.EventController.generalActionFire.next({
        name: "paintingCliffTerrain",
        data: {
          id: "StoneCliff-StoneBase",
        }
      })
    }
    if(event.code === "KeyX") {
      GSM.EventController.generalActionFire.next({
        name: "selectTool",
        data: null
      })
    }
    if(event.code === "KeyG") {
      this.selected = "starting Game"
      GSM.EventController.generalActionFire.next({
        name: "startGame",
        data: null
      })

      GSM.RendererController.start()
      GSM.FrameController.start()  
    }
  }
}
