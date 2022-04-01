import { getClickedOnTerrainTile } from "src/app/game/controllers/utils/selected-sprite-tile"
import { terrainCleanup } from "src/app/game/controllers/utils/terrain-cleanup"
import { GSM } from "src/app/game/game-state-manager.service"
import { RenderingLayers } from "src/app/game/models/map"


export class EraserEventHandler {
  constructor() {
    GSM.EventController.mouseDown.subscribe(this.selectTerrainTile.bind(this))
  }

  private selectTerrainTile(event: MouseEvent) {
    if(GSM.EventController.generalActionFire.value.name === "deleteTerrain") {

    const selectedTerrainTile = getClickedOnTerrainTile(event.offsetX, event.offsetY)
    
    if(selectedTerrainTile) {
      delete selectedTerrainTile.cell.terrainTiles[RenderingLayers.TerrainLayer]
      terrainCleanup(selectedTerrainTile.layer)     
    }
    }
  }
}