import { drawableItems } from "../../db/drawable-items.db"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"
import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, NeighborLocation } from "../../models/map"
import { TerrainTile } from "../../models/sprite-tile.model"

export function terrainCleanup(layer: RenderingLayers) {
    GSM.GridController.iterateElevations(elevation => {
      GSM.GridController.iterateCells(elevation.elevationIndex, (cell) => {          
        if(!cell.terrainTiles[layer]) { return }      
        const neighbors = GSM.CellNeighborsController.getHorizontalNeighbors(cell, elevation.elevationIndex)
        const cellTileId = cell.terrainTiles[layer].drawableTileId
    
        const leftTileId = neighbors[NeighborLocation.West]?.terrainTiles[layer]?.drawableTileId 
        const rightTileId = neighbors[NeighborLocation.East]?.terrainTiles[layer]?.drawableTileId
        const topTileId = neighbors[NeighborLocation.North]?.terrainTiles[layer]?.drawableTileId
        const bottomTileId = neighbors[NeighborLocation.South]?.terrainTiles[layer]?.drawableTileId
    
        const topLeftTileId = neighbors[NeighborLocation.NorthWest]?.terrainTiles[layer]?.drawableTileId 
        const topRightTileId = neighbors[NeighborLocation.NorthEast]?.terrainTiles[layer]?.drawableTileId
        const bottomLeftTileId = neighbors[NeighborLocation.SouthWest]?.terrainTiles[layer]?.drawableTileId
        const bottomRightTileId = neighbors[NeighborLocation.SouthEast]?.terrainTiles[layer]?.drawableTileId
              
        if (leftTileId !== cellTileId && rightTileId !== cellTileId) {
          delete cell.terrainTiles[RenderingLayers.TerrainLayer]
          cell.obstacle = false
        }
        if (topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
          delete cell.terrainTiles[RenderingLayers.TerrainLayer]
          cell.obstacle = false
        }
        if(bottomLeftTileId === cellTileId && !leftTileId && bottomTileId !== cellTileId) {
          neighbors[NeighborLocation.West].terrainTiles[layer] = new TerrainTile()
          neighbors[NeighborLocation.West].terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
          neighbors[NeighborLocation.South].terrainTiles[layer] = new TerrainTile()
          neighbors[NeighborLocation.South].terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
          neighbors[NeighborLocation.SouthEast].terrainTiles[layer] = new TerrainTile()
          neighbors[NeighborLocation.SouthEast].terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
          const leftLeftCell = GSM.GridController.getCell(
            neighbors[NeighborLocation.West].location.x - 1,
            neighbors[NeighborLocation.West].location.y,
            elevation.elevationIndex
          )
          leftLeftCell.terrainTiles[layer] = new TerrainTile()
          leftLeftCell.terrainTiles[layer].drawableTileId = cell.terrainTiles[layer].drawableTileId
        }
        
        if(cell.terrainTiles[RenderingLayers.TerrainLayer].drawableTileId) {
          const terrainTile = cell.terrainTiles[RenderingLayers.TerrainLayer]
          const itemDetails = drawableItems.find(item => item.id === cell.terrainTiles[RenderingLayers.TerrainLayer].drawableTileId)
        
          if(GSM.EventController.generalActionFire.value.name.includes("Terrain")) {
            TerrainEdgeCalculator.calculateTerrainEdges(
              cell,
              terrainTile,
              itemDetails,
              elevation.elevationIndex
            )
          }
        }
      })    
    })   
}