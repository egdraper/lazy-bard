import { GSM } from "../../game-state-manager.service"
import { NeighborLocation, RenderingLayers, SpriteTile } from "../../models/map"

export function terrainCleanup(layer: RenderingLayers) {
  for(let a = 0; a < 2; a++) {
    GSM.GridController.iterateCells(GSM.ElevationController.currentElevationLayerIndex, (cell) => {          
      if(!cell.spriteTiles[layer]) { return }     
  
      const neighbors = GSM.GridController.getAllNeighbors(cell, GSM.ElevationController.currentElevationLayerIndex)
      const cellTileId = cell.spriteTiles[layer].drawableTileId
  
      const leftTileId = neighbors[NeighborLocation.Left]?.spriteTiles[layer]?.drawableTileId 
      const rightTileId = neighbors[NeighborLocation.Right]?.spriteTiles[layer]?.drawableTileId
      const topTileId = neighbors[NeighborLocation.Top]?.spriteTiles[layer]?.drawableTileId
      const bottomTileId = neighbors[NeighborLocation.Bottom]?.spriteTiles[layer]?.drawableTileId
  
      const topLeftTileId = neighbors[NeighborLocation.TopLeft]?.spriteTiles[layer]?.drawableTileId 
      const topRightTileId = neighbors[NeighborLocation.TopRight]?.spriteTiles[layer]?.drawableTileId
      const bottomLeftTileId = neighbors[NeighborLocation.BottomLeft]?.spriteTiles[layer]?.drawableTileId
      const bottomRightTileId = neighbors[NeighborLocation.BottomRight]?.spriteTiles[layer]?.drawableTileId
            
      if (leftTileId !== cellTileId && rightTileId !== cellTileId) {
        delete cell.spriteTiles[RenderingLayers.TerrainLayer]
      }
      if (topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
        delete cell.spriteTiles[RenderingLayers.TerrainLayer]
      }
      if(bottomLeftTileId === cellTileId && !leftTileId && bottomTileId !== cellTileId) {
        neighbors[NeighborLocation.Left].spriteTiles[layer] = new SpriteTile()
        neighbors[NeighborLocation.Left].spriteTiles[layer].drawableTileId = cell.spriteTiles[layer].drawableTileId
        neighbors[NeighborLocation.Bottom].spriteTiles[layer] = new SpriteTile()
        neighbors[NeighborLocation.Bottom].spriteTiles[layer].drawableTileId = cell.spriteTiles[layer].drawableTileId
        neighbors[NeighborLocation.BottomRight].spriteTiles[layer] = new SpriteTile()
        neighbors[NeighborLocation.BottomRight].spriteTiles[layer].drawableTileId = cell.spriteTiles[layer].drawableTileId
        const leftLeftCell = GSM.GridController.getCell(neighbors[NeighborLocation.Left].x - 1, neighbors[NeighborLocation.Left].y, GSM.ElevationController.currentElevationLayerIndex)
        leftLeftCell.spriteTiles[layer] = new SpriteTile()
        leftLeftCell.spriteTiles[layer].drawableTileId = cell.spriteTiles[layer].drawableTileId
      }
    })    
  }    
}