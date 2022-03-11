import { Renderer } from '../../../../models/renderer';
import { GSM } from '../../../../game-state-manager.service';
import { MapAssetImageCell, NeighborLocation } from '../../../../models/map';

export class TerrainPaintBrushEventHandler {
  constructor(private renderer: Renderer) {
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseEnteredCell.bind(this));
  }

  // adds the paintable terrain id to the cell clicked
  private onEmptyCellClicked(cellId: string): void {

    const cell = GSM.GridController.gameMap.elevations[0].cells[cellId]
    if(GSM.EventController.generalActionFire.value.name === "paintingTerrain") {
      const topCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Top, 0)
      const topRightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.TopRight, 0)
      const rightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Right, 0)
      
      const drawCell = this.renderer.mapAssets[cellId] = new MapAssetImageCell
      drawCell.drawableTileId = "1"
      cell.obstacle = true

      const drawTopCell = this.renderer.mapAssets[topCell.id] = new MapAssetImageCell
      drawTopCell.drawableTileId = "1"
      topCell.obstacle = true

      const drawRightCell = this.renderer.mapAssets[rightCell.id] = new MapAssetImageCell
      drawRightCell.drawableTileId = "1"
      rightCell.obstacle = true
    
      const drawTopRightCell = this.renderer.mapAssets[topRightCell.id] = new MapAssetImageCell
      drawTopRightCell.drawableTileId = "1"
      topRightCell.obstacle = true
    }  

    if(GSM.EventController.generalActionFire.value.name === "deleteTerrain") {
      delete this.renderer.mapAssets[cell.id]
    }
  }

  private onMouseEnteredCell(cellId: string): void {
    const actionName = GSM.EventController.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }
    if(!GSM.EventController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cellId)
  }
}
