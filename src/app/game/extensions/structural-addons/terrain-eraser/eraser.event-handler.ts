import { getClickedOnSpriteTile } from "src/app/game/controllers/utils/selected-sprite-tile"
import { terrainCleanup } from "src/app/game/controllers/utils/terrain-cleanup"
import { GSM } from "src/app/game/game-state-manager.service"
import { RenderingLayers } from "src/app/game/models/map"


export class EraserEventHandler {
  constructor() {
    GSM.EventController.mouseDown.subscribe(this.selectSpriteTile.bind(this))
  }

  private selectSpriteTile(event: MouseEvent) {
    if(GSM.EventController.generalActionFire.value.name === "deleteTerrain") {

    const selectedSpriteTile = getClickedOnSpriteTile(event.offsetX, event.offsetY)
    
    if(selectedSpriteTile) {
      delete selectedSpriteTile.cell.spriteTiles[RenderingLayers.TerrainLayer]
      terrainCleanup(selectedSpriteTile.layer)     
    }
    }
  }
}