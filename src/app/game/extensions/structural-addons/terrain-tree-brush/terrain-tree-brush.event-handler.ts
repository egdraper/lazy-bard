import { Sprite } from 'src/app/game/models/sprites';
import { GSM } from '../../../game-state-manager.service';
import { SpriteTile, NeighborLocation, ElevationLayers } from '../../../models/map';

export class TerrainTreeBrushEventHandler {
  constructor() {
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseEnteredCell.bind(this));
  }

  // adds the paintable terrain id to the cell clicked
  private onEmptyCellClicked(cellId: string, elevation: number = GSM.GridController.layerIndex): void {
    const cell = GSM.GridController.gameMap.elevations[elevation].cells[cellId]
    if(GSM.EventController.generalActionFire.value.name === "paintingTreeTerrain") {
      const drawableTile = GSM.EventController.generalActionFire.value.data as {id: string}
      const topCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Top, elevation)
      const topRightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.TopRight, elevation)
      const rightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Right, elevation)
      
      const drawCell = cell.spriteTiles[ElevationLayers.TerrainLayer] = new SpriteTile()
      drawCell.drawableTileId = drawableTile.id
      cell.obstacle = true

      const drawTopCell = topCell.spriteTiles[ElevationLayers.TerrainLayer] = new SpriteTile()
      drawTopCell.drawableTileId = drawableTile.id
      topCell.obstacle = true

      const drawRightCell = rightCell.spriteTiles[ElevationLayers.TerrainLayer] = new SpriteTile()
      drawRightCell.drawableTileId = drawableTile.id
      rightCell.obstacle = true
    
      const drawTopRightCell = topRightCell.spriteTiles[ElevationLayers.TerrainLayer] = new SpriteTile()
      drawTopRightCell.drawableTileId = drawableTile.id
      topRightCell.obstacle = true
    }  

    if(GSM.EventController.generalActionFire.value.name === "deleteTerrain") {
      delete cell.spriteTiles[ElevationLayers.TerrainLayer]
    }
  }

  private onMouseEnteredCell(cellId: string): void {
    const actionName = GSM.EventController.generalActionFire.value.name    
    if(actionName !== "paintingTreeTerrain" && actionName !== "deleteTerrain") { return }
    if(!GSM.EventController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cellId)
  }
}
