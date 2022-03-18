import { GSM } from '../../../game-state-manager.service';
import { Cell, NeighborLocation, RenderingLayers } from '../../../models/map';

export class EraserEventHandler {
  constructor() {
    GSM.AssetController.spriteTileClicked.subscribe(this.spriteTileClicked.bind(this));
  }

  private spriteTileClicked(event: {cell: Cell, layer: RenderingLayers}): void {  
    
    if(GSM.EventController.generalActionFire.value.name === "deleteTerrain") {
      delete event.cell.spriteTiles[RenderingLayers.TerrainLayer]
      
      for(let a = 0; a < 2; a++) {
      GSM.GridController.iterateCells(GSM.GridController.currentElevationLayerIndex, (cell) => {          
        if(cell.spriteTiles[event.layer]) { console.log(cell.id)}
        if(!cell.spriteTiles[event.layer]) { return }     

        const neighbors = GSM.GridController.getAllNeighbors(cell, GSM.GridController.currentElevationLayerIndex)
        const cellTileId = cell.spriteTiles[event.layer].drawableTileId

        const leftTileId = neighbors[NeighborLocation.Left]?.spriteTiles[event.layer]?.drawableTileId 
        const rightTileId = neighbors[NeighborLocation.Right]?.spriteTiles[event.layer]?.drawableTileId
        const topTileId = neighbors[NeighborLocation.Top]?.spriteTiles[event.layer]?.drawableTileId
        const bottomTileId = neighbors[NeighborLocation.Bottom]?.spriteTiles[event.layer]?.drawableTileId

        const topLeftTileId = neighbors[NeighborLocation.TopLeft]?.spriteTiles[event.layer]?.drawableTileId 
        const topRightTileId = neighbors[NeighborLocation.TopRight]?.spriteTiles[event.layer]?.drawableTileId
        const bottomLeftTileId = neighbors[NeighborLocation.BottomLeft]?.spriteTiles[event.layer]?.drawableTileId
        const bottomRightTileId = neighbors[NeighborLocation.BottomRight]?.spriteTiles[event.layer]?.drawableTileId
          
        if(leftTileId !== cellTileId && rightTileId !== cellTileId) {
          delete cell.spriteTiles[RenderingLayers.TerrainLayer]
        }
        if(topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
          delete cell.spriteTiles[RenderingLayers.TerrainLayer]
        }
        // if(bottomLeftTileId === cellTileId && leftTileId !== cellTileId && bottomTileId !== cellTileId) {
        //   neighbors[NeighborLocation.Left].spriteTiles[event.layer].drawableTileId = cell.spriteTiles[event.layer].drawableTileId
        // }
      })    
    }
    }   
  }
}
