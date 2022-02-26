import { GSM } from '../../game-state-manager.service';
import { NeighborLocation, TerrainCell } from '../../models/map';

export class TerrainPainterEventHandler {
  constructor() {
    GSM.KeyEventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
  }

  // adds the paintable terrain id to the cell clicked
  private onEmptyCellClicked(cell: TerrainCell): void {
    if(GSM.editorController.selectedAction.value.name === "paintingTerrain") {
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
  }

}
