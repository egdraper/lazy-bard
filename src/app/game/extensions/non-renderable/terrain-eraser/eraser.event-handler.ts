import { getHoveredOverTerrainTile } from "src/app/game/controllers/utils/selected-sprite-tile"
import { terrainCleanup } from "src/app/game/controllers/utils/terrain-cleanup"
import { GSM } from "src/app/game/game-state-manager.service"
import { MousePosition, RenderingLayers } from "src/app/game/models/map"


export class EraserEventHandler {
  constructor() {
    GSM.EventController.mouseDown.subscribe(this.selectTerrainTile.bind(this))
  }

  private selectTerrainTile(event: MousePosition) {
    if(GSM.EventController.generalActionFire.value.name !== "deleteTerrain") { return }

    const selectedTerrainTile = getHoveredOverTerrainTile(event.posX, event.posY)
    
    if(selectedTerrainTile) {
      delete selectedTerrainTile.cell.terrainTiles[RenderingLayers.TerrainLayer]
      selectedTerrainTile.cell.obstacle = false
      terrainCleanup(selectedTerrainTile.layer)     
    }
  }
}