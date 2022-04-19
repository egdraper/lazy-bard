import { AfterViewInit, Component, HostListener } from '@angular/core';
import { GSM } from './game-state-manager.service';

@Component({
  selector: 'gm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit{
  public selected = "nothing"
  public mouseController

  constructor(public gameStateManager: GSM) {
    setTimeout(() => {
      this.mouseController = GSM.MouseController
    },150);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.gameStateManager.newGame("firstGame", 25, 25, "forest")
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
        name: "paintingTerrain",
        data: {
          id: "Trees-GrassBase",
        }
      })
    }
    if(event.code === "Digit2") {
      // GSM.EventController.generalActionFire.next({
      //   name: "addElevationUp",
      //   data: {
      //     leavingLayer: GSM.GameData.map.currentElevationLayerIndex,
      //     newLayer: GSM.GameData.map.currentElevationLayerIndex + 1
      //   }
      // })
      // GSM.ImageController.refreshAllImages()
    }
    if(event.code === "Digit1") {
      // GSM.EventController.generalActionFire.next({
      //   name: "addElevationDown",
      //   data: {
      //     leavingLayer: GSM.GameData.map.currentElevationLayerIndex,
      //     newLayer: GSM.GameData.map.currentElevationLayerIndex - 1
      //   }
      // })
      // GSM.ImageController.refreshAllImages()
    }
    if(event.code === "KeyR") {
      GSM.EventController.generalActionFire.next({
        name: "paintingTerrain",
        data: {
          id: "StoneCliff-StoneBase2",
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
    if(event.code === "KeyY") {
     const asset =  GSM.GridAssetController.getSelectedAssets()[0]
     asset.position.z++
    }
    if(event.code === "KeyH") {
     const asset =  GSM.GridAssetController.getSelectedAssets()[0]
     asset.position.z--
    }
  }
}
