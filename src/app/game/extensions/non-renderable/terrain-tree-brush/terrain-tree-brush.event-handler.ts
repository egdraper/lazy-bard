import { terrainCleanup } from 'src/app/game/controllers/utils/terrain-cleanup';
import { GSM } from '../../../game-state-manager.service';
import { SpriteTile, NeighborLocation, RenderingLayers } from '../../../models/map';

export class TerrainTreeBrushEventHandler {
  constructor() {
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseEnteredCell.bind(this));
  }

  // adds the drawable terrain id to the cell clicked
  private onEmptyCellClicked(cellId: string, elevation: number = GSM.GridController.gameMap.currentElevationLayerIndex): void {
    const cell = GSM.GridController.gameMap.elevations[elevation].cells[cellId]
    if(GSM.EventController.generalActionFire.value.name === "paintingTreeTerrain") {
      const drawableTile = GSM.EventController.generalActionFire.value.data as {id: string}
      const topCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.Top, elevation)
      const topRightCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.TopRight, elevation)
      const rightCell = GSM.CellNeighborsController.getImmediateNeighbor(cell, NeighborLocation.Right, elevation)
      
      const drawCell = cell.spriteTiles[RenderingLayers.TerrainLayer] = new SpriteTile()
      drawCell.drawableTileId = drawableTile.id
      cell.obstacle = true

      const drawTopCell = topCell.spriteTiles[RenderingLayers.TerrainLayer] = new SpriteTile()
      drawTopCell.drawableTileId = drawableTile.id
      topCell.obstacle = true

      const drawRightCell = rightCell.spriteTiles[RenderingLayers.TerrainLayer] = new SpriteTile()
      drawRightCell.drawableTileId = drawableTile.id
      rightCell.obstacle = true
    
      const drawTopRightCell = topRightCell.spriteTiles[RenderingLayers.TerrainLayer] = new SpriteTile()
      drawTopRightCell.drawableTileId = drawableTile.id
      topRightCell.obstacle = true
    }  

    terrainCleanup(RenderingLayers.TerrainLayer)
  }

  private onMouseEnteredCell(cellId: string): void {
    const actionName = GSM.EventController.generalActionFire.value.name    
    if(actionName !== "paintingTreeTerrain" && actionName !== "deleteTerrain") { return }
    if(!GSM.EventController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cellId)
  }
}