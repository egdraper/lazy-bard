import { AfterViewInit, Component, HostListener } from '@angular/core';
import { terrainCleanup } from '../../controllers/utils/terrain-cleanup';
import { GSM } from '../../game-state-manager.service';
import { RenderingLayers } from '../../models/map';


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
      this.gameStateManager.newGame("firstGame", 35, 35, "forest")
      GSM.ActionController.generalActionFire.subscribe(action => {
        this.selected = action.name 
      })
    })
  }

  @HostListener("document:keyup", ["$event"])
  public keyPress(event: KeyboardEvent) {
    if(event.code === "Escape") {
      GSM.ActionController.generalActionFire.next({
        name: "",
        data: null
      })
    }
    if(event.code === "Delete") {
      GSM.ActionController.generalActionFire.next({
        name: "delete",
        data: null
      })
    }
    if(event.code === "KeyQ") {
      GSM.ActionController.generalActionFire.next({
        name: "addCharacter",
        data: null
      })
    }
    if(event.code === "KeyB") {
      GSM.ActionController.generalActionFire.next({
        name: "generateBackground",
        data: null
      })
    }
    if(event.code === "KeyO") {
      GSM.ActionController.generalActionFire.next({
        name: "addObject",
        data: null
      })
    }
    if(event.code === "KeyZ") {
      GSM.ActionController.generalActionFire.next({
        name: "deleteTerrain",
        data: null
      })
    }
    if(event.code === "KeyT") {
      GSM.ActionController.generalActionFire.next({
        name: "generateTerrain",
        data: {
          terrainId: "Trees-GreenBase",
          backgroundId: "greenGrass"
        }
      })
    }
    if(event.code === "KeyE") {
      GSM.ActionController.generalActionFire.next({
        name: "paintingTerrain",
        data: {
          id: "Trees-GrassBase",
        }
      })
    }
    if(event.code === "KeyR") {
      GSM.ActionController.generalActionFire.next({
        name: "paintingTerrain",
        data: {
          id: "StoneCliff-StoneBase2",
        }
      })
    }
    if(event.code === "KeyX") {
      GSM.ActionController.generalActionFire.next({
        name: "selectTool",
        data: null
      })
    }
    if(event.code === "KeyP") {
      GSM.RotationController.rotateClockwise()
      terrainCleanup()
    }
    if(event.code === "KeyG") {
      this.selected = "starting Game"
      GSM.ActionController.generalActionFire.next({
        name: "startGame",
        data: null
      })

      GSM.RendererController.start()
      GSM.FrameController.start()  
    }
    if(event.code === "KeyH") {
      const asset = GSM.AssetController.getSelectedAssets()[0]
      asset.hovering = true
      GSM.AssetController.changeZAxis("up", asset, RenderingLayers.AssetLayer)
    }
    if(event.code === "KeyN") {
     const asset = GSM.AssetController.getSelectedAssets()[0]
     const topAsset = GSM.AssetController.getTopAssetPerCell(asset.cell, RenderingLayers.TerrainLayer)
    
     if((!topAsset && (asset.zIndex !== 0)) || (topAsset && topAsset.zIndex < asset.zIndex)) {
       GSM.AssetController.changeZAxis("down", asset, RenderingLayers.AssetLayer)
     } else {
       asset.hovering = false
     }
    }
    if(event.code === "KeyY") {
     const asset = GSM.AssetController.getSelectedAssets()[0]
     GSM.AssetController.changeZAxis("down", asset, RenderingLayers.AssetLayer)
    }
  }
}
