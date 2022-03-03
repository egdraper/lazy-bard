import { GSM } from '../../../../game-state-manager.service';
import { ElevationLayers, NeighborLocation, TerrainCell } from '../../../../models/map';

export class TerrainPainterEventHandler {
  constructor() {
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseEnteredCell.bind(this));
  }

  // adds the paintable terrain id to the cell clicked
  private onEmptyCellClicked(cellId: string): void {

    const cell = GSM.GridController.gameMap.grids[ElevationLayers.TerrainLayer].cells[cellId] as TerrainCell
    if(GSM.EventController.generalActionFire.value.name === "paintingTerrain") {
      const topCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Top, ElevationLayers.TerrainLayer) as TerrainCell
      const topRightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.TopRight, ElevationLayers.TerrainLayer) as TerrainCell
      const rightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Right, ElevationLayers.TerrainLayer) as TerrainCell
      
      cell.drawableTileId = "1" //GSM.editorController.selectedAction.value
      cell.obstacle = true
      topCell.drawableTileId = "1" //GSM.editorController.selectedAction.value
      topCell.obstacle = true
      topRightCell.drawableTileId = "1" //GSM.editorController.selectedAction.value
      topRightCell.obstacle = true
      rightCell.drawableTileId = "1" //GSM.editorController.selectedAction.value
      rightCell.obstacle = true    
    }  

    if(GSM.EventController.generalActionFire.value.name === "deleteTerrain") {
      cell.drawableTileId = undefined
      cell.obstacle = false
    }
  }

  private onMouseEnteredCell(cellId: string): void {
    const actionName = GSM.EventController.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }
    if(!GSM.EventController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cellId)
  }
}
