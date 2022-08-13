import { GSM } from "src/app/game/game-state-manager.service"

export class EraserEventHandler {
  constructor() {
    GSM.MouseController.mouseDown.subscribe(this.selectTerrainTile.bind(this))
  }

  private selectTerrainTile() {
    if(GSM.ActionController.generalActionFire.value.name !== "deleteTerrain") { return }
    const selectedTerrain = GSM.MouseController.hoveringGridAsset
    
    if(selectedTerrain) {
      // delete selectedTerrain.cell.terrainTiles[RenderingLayers.TerrainLayer]
      // selectedTerrain.cell.obstacle = false
      // terrainCleanup(selectedTerrain.layer)     
    }
  }
}