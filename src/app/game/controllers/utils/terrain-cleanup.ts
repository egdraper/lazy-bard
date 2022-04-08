import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, NeighborLocation } from "../../models/map"
import { TerrainTile } from "../../models/sprite-tile.model"

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
        cell.obstacle = false
      }
      if (topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
        delete cell.terrainTiles[RenderingLayers.TerrainLayer]
        cell.obstacle = false
      }
      if(bottomLeftTileId === cellTileId && !leftTileId && bottomTileId !== cellTileId) {
        neighbors[NeighborLocation.Left].terrainTiles[layer] = new TerrainTile()
        neighbors[NeighborLocation.Left].terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
        neighbors[NeighborLocation.Bottom].terrainTiles[layer] = new TerrainTile()
        neighbors[NeighborLocation.Bottom].terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
        neighbors[NeighborLocation.BottomRight].terrainTiles[layer] = new TerrainTile()
        neighbors[NeighborLocation.BottomRight].terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
        const leftLeftCell = GSM.GridController.getCell(neighbors[NeighborLocation.Left].location.x - 1, neighbors[NeighborLocation.Left].location.y, GSM.GameData.map.currentElevationLayerIndex)
        leftLeftCell.terrainTiles[layer] = new TerrainTile()
        leftLeftCell.terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
      }
    })    
  }    
}