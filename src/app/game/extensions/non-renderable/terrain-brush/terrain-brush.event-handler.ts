import { terrainCleanup } from 'src/app/game/controllers/utils/terrain-cleanup';
import { drawableItems } from 'src/app/game/db/drawable-items.db';
import { Cell, NeighborLocation, RenderingLayers } from 'src/app/game/models/map';
import { TerrainTile } from 'src/app/game/models/sprite-tile.model';
import { GSM } from '../../../game-state-manager.service';

export class TerrainTreeBrushEventHandler {
  constructor() {
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseEnteredCell.bind(this));
  }

  // adds the drawable terrain id to the cell clicked
  private onEmptyCellClicked(cell: Cell, elevation: number = GSM.GameData.map.currentElevationLayerIndex): void {
    if(GSM.EventController.generalActionFire.value.name === "paintingTerrain") {
      const drawableTile = GSM.EventController.generalActionFire.value.data as {id: string}
      const northCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.North, elevation)
      const northEastCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.NorthEast, elevation)
      const eastCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.East, elevation)
      const downCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.Down, elevation)
      const downEastCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.DownEast, elevation)
      const downNorthCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.DownNorth, elevation)
      const downNorthEastCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.DownNorthEast, elevation)
      
      if(GSM.GameData.map.currentElevationLayerIndex !== 0 
        && (!downCell.terrainTiles[RenderingLayers.TerrainLayer] 
        || !downEastCell.terrainTiles[RenderingLayers.TerrainLayer]
        || !downNorthCell.terrainTiles[RenderingLayers.TerrainLayer]
        || !downNorthEastCell.terrainTiles[RenderingLayers.TerrainLayer]      
      )) {
        return
      }

      const drawTile = cell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawTile.drawableTileId = drawableTile.id
      cell.obstacle = true 

      const drawTopTile = northCell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawTopTile.drawableTileId = drawableTile.id
      northCell.obstacle = true

      const drawRightTile = eastCell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawRightTile.drawableTileId = drawableTile.id
      eastCell.obstacle = true
    
      const drawTopRightTile = northEastCell.terrainTiles[RenderingLayers.TerrainLayer] = new TerrainTile()
      drawTopRightTile.drawableTileId = drawableTile.id
      northEastCell.obstacle = true
    }  

    terrainCleanup(RenderingLayers.TerrainLayer)
  }

  private onMouseEnteredCell(cell: Cell): void {
    const actionName = GSM.EventController.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }
    if(!GSM.EventController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cell)
  }
}
