import { GSM } from "../../game-state-manager.service"
import { NeighborLocation, RenderingLayers, AssetTile } from "../../models/map"

export function terrainCleanup(layer: RenderingLayers) {
  for(let a = 0; a < 2; a++) {
    GSM.GridController.iterateCells(GSM.GameData.map.currentElevationLayerIndex, (cell) => {          
      if(!cell.terrainTiles[layer]) { return }     
  
      const neighbors = GSM.CellNeighborsController.getAllImmediateNeighbors(cell, GSM.GameData.map.currentElevationLayerIndex)
      const cellTileId = cell.terrainTiles[layer].drawableTileId
  
      const leftTileId = neighbors[NeighborLocation.Left]?.terrainTiles[layer]?.drawableTileId 
      const rightTileId = neighbors[NeighborLocation.Right]?.terrainTiles[layer]?.drawableTileId
      const topTileId = neighbors[NeighborLocation.Top]?.terrainTiles[layer]?.drawableTileId
      const bottomTileId = neighbors[NeighborLocation.Bottom]?.terrainTiles[layer]?.drawableTileId
  
      const topLeftTileId = neighbors[NeighborLocation.TopLeft]?.terrainTiles[layer]?.drawableTileId 
      const topRightTileId = neighbors[NeighborLocation.TopRight]?.terrainTiles[layer]?.drawableTileId
      const bottomLeftTileId = neighbors[NeighborLocation.BottomLeft]?.terrainTiles[layer]?.drawableTileId
      const bottomRightTileId = neighbors[NeighborLocation.BottomRight]?.terrainTiles[layer]?.drawableTileId
            
      if (leftTileId !== cellTileId && rightTileId !== cellTileId) {
        delete cell.terrainTiles[RenderingLayers.TerrainLayer]
      }
      if (topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
        delete cell.terrainTiles[RenderingLayers.TerrainLayer]
      }
      if(bottomLeftTileId === cellTileId && !leftTileId && bottomTileId !== cellTileId) {
        neighbors[NeighborLocation.Left].terrainTiles[layer] = new AssetTile()
        neighbors[NeighborLocation.Left].terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
        neighbors[NeighborLocation.Bottom].terrainTiles[layer] = new AssetTile()
        neighbors[NeighborLocation.Bottom].terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
        neighbors[NeighborLocation.BottomRight].terrainTiles[layer] = new AssetTile()
        neighbors[NeighborLocation.BottomRight].terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
        const leftLeftCell = GSM.GridController.getCell(neighbors[NeighborLocation.Left].x - 1, neighbors[NeighborLocation.Left].y, GSM.GameData.map.currentElevationLayerIndex)
        leftLeftCell.terrainTiles[layer] = new AssetTile()
        leftLeftCell.terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
      }
    })    
  }    
}