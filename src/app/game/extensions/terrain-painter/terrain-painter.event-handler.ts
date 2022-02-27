import { GSM } from '../../game-state-manager.service';
import { NeighborLocation, TerrainCell } from '../../models/map';

export class TerrainPainterEventHandler {
  constructor() {
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseEnteredCell.bind(this));
  }

  // adds the paintable terrain id to the cell clicked
  private onEmptyCellClicked(cell: TerrainCell): void {
    if(GSM.EventController.generalActionFire.value.name === "paintingTerrain") {
      const topCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Top) as TerrainCell
      const topRightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.TopRight) as TerrainCell
      const rightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Right) as TerrainCell
      
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

  private onMouseEnteredCell(cell: TerrainCell): void {
    const actionName = GSM.EventController.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }
    if(!GSM.EventController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cell)
  }
}
