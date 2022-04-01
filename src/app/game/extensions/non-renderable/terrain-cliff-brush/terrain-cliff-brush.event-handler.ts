import { Sprite } from 'src/app/game/models/sprites';
import { GSM } from '../../../game-state-manager.service';
import { AssetTile, NeighborLocation, RenderingLayers, TerrainTile } from '../../../models/map';

export class TerrainCliffBrushEventHandler {
  constructor() {
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseEnteredCell.bind(this));
  }

  // adds the paintable terrain id to the cell clicked
  private onEmptyCellClicked(cellId: string, elevation: number = GSM.GameData.map.currentElevationLayerIndex): void {
    const cell = GSM.GameData.map.elevations[elevation].cells[cellId]
    
    if(GSM.EventController.generalActionFire.value.name === "paintingCliffTerrain") {
      const topCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.Top, elevation)
      const drawableTile = GSM.EventController.generalActionFire.value.data as {id: string}
      const topRightCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.TopRight, elevation)
      const rightCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.Right, elevation)
      
      const drawCell = cell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawCell.drawableTileId = drawableTile.id
      cell.obstacle = true

      const drawTopCell = topCell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawTopCell.drawableTileId = drawableTile.id
      topCell.obstacle = true

      const drawRightCell = rightCell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawRightCell.drawableTileId = drawableTile.id
      rightCell.obstacle = true
    
      const drawTopRightCell = topRightCell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawTopRightCell.drawableTileId = drawableTile.id
      topRightCell.obstacle = true
    }  
  }

  private onMouseEnteredCell(cellId: string): void {
    const actionName = GSM.EventController.generalActionFire.value.name    
    if(actionName !== "paintingCliffTerrain" && actionName !== "deleteTerrain") { return }
    if(!GSM.EventController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cellId)
  }
}
