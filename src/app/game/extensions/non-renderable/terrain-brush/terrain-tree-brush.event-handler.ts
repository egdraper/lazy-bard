import { terrainCleanup } from 'src/app/game/controllers/utils/terrain-cleanup';
import { NeighborLocation, RenderingLayers } from 'src/app/game/models/map';
import { TerrainTile } from 'src/app/game/models/sprite-tile.model';
import { GSM } from '../../../game-state-manager.service';

export class TerrainTreeBrushEventHandler {
  constructor() {
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseEnteredCell.bind(this));
  }

  // adds the drawable terrain id to the cell clicked
  private onEmptyCellClicked(cellId: string, elevation: number = GSM.GameData.map.currentElevationLayerIndex): void {
    const cell = GSM.GameData.map.elevations[elevation].cells[cellId]
    if(GSM.EventController.generalActionFire.value.name === "paintingTerrain") {
      const drawableTile = GSM.EventController.generalActionFire.value.data as {id: string}
      const topCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.Top, elevation)
      const topRightCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.TopRight, elevation)
      const rightCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.Right, elevation)
      
      const drawCell = cell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawCell.height = 5
      drawCell.drawableTileId = drawableTile.id
      cell.obstacle = true

      const drawTopCell = topCell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawTopCell.height = 5
      drawTopCell.drawableTileId = drawableTile.id
      topCell.obstacle = true

      const drawRightCell = rightCell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawRightCell.height = 5
      drawRightCell.drawableTileId = drawableTile.id
      rightCell.obstacle = true
    
      const drawTopRightCell = topRightCell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawTopRightCell.height = 5
      drawTopRightCell.drawableTileId = drawableTile.id
      topRightCell.obstacle = true
    }  

    terrainCleanup(RenderingLayers.TerrainLayer)
  }

  private onMouseEnteredCell(cellId: string): void {
    const actionName = GSM.EventController.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }
    if(!GSM.EventController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cellId)
  }
}
