import { GSM } from "../../game-state-manager.service"
import { NeighborLocation, RenderingLayers } from "../../models/map"
import { DrawableItemViewModel, GridAsset, TerrainTile } from "../../models/sprite-tile.model"

export class TerrainEdgeCalculator {
  public static calculateTerrainEdges(gridAsset: GridAsset, terrainTile: TerrainTile, drawableItem: DrawableItemViewModel): TerrainTile {
    const neighboringCells = GSM.CellNeighborsController.getAllImmediateNeighbors(gridAsset)
    const northNeighbor = neighboringCells[NeighborLocation.North]
    const northEastNeighbor = neighboringCells[NeighborLocation.NorthEast]
    const eastNeighbor = neighboringCells[NeighborLocation.East]
    const southEastNeighbor = neighboringCells[NeighborLocation.SouthEast]
    const southNeighbor = neighboringCells[NeighborLocation.South]
    const southWestNeighbor = neighboringCells[NeighborLocation.SouthWest]
    const westNeighbor = neighboringCells[NeighborLocation.West]
    const northWestNeighbor = neighboringCells[NeighborLocation.NorthWest]
        
    const neighborsTerrain = {
      northWestMatch: (northWestNeighbor[RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId === terrainTile.drawableTileId,
      northMatch: (northNeighbor[RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId === terrainTile.drawableTileId,
      northEastMatch: (northEastNeighbor[RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId === terrainTile.drawableTileId,
      westMatch: (westNeighbor[RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId === terrainTile.drawableTileId,
      eastMatch: (eastNeighbor[RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId === terrainTile.drawableTileId,
      southWestMatch: (southWestNeighbor[RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId === terrainTile.drawableTileId,
      southMatch: (southNeighbor[RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId === terrainTile.drawableTileId,
      southEastMatch: (southEastNeighbor[RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId === terrainTile.drawableTileId
    }
        
    let tile = {...drawableItem.drawingRules.find((terrainTile: TerrainTile) => {
      const northMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.topNeighbor || terrainTile.drawWhen.topNeighbor === null
      const northEastMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.topRightNeighbor || terrainTile.drawWhen.topRightNeighbor === null
      const eastMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.rightNeighbor || terrainTile.drawWhen.rightNeighbor === null
      const southEastMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.bottomRightNeighbor || terrainTile.drawWhen.bottomRightNeighbor === null
      const southMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.bottomNeighbor || terrainTile.drawWhen.bottomNeighbor === null
      const southWestMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.bottomLeftNeighbor || terrainTile.drawWhen.bottomLeftNeighbor === null
      const westMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.leftNeighbor || terrainTile.drawWhen.leftNeighbor === null
      const northWestMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.topLeftNeighbor || terrainTile.drawWhen.topLeftNeighbor === null
        
      return northMatch &&
        northEastMatch &&
        eastMatch &&
        southEastMatch &&
        southMatch &&
        southWestMatch &&
        westMatch &&
        northWestNeighbor &&
        northWestMatch
    })}

    const upId = (neighboringCells[NeighborLocation.Up][RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId
    const downId = (neighboringCells[NeighborLocation.Down][RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId
    const downSouthId = (neighboringCells[NeighborLocation.DownSouth][RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId
    const upSouthId = (neighboringCells[NeighborLocation.UpSouth][RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId
    const southId = (southNeighbor[RenderingLayers.TerrainLayer]?.tile as TerrainTile).drawableTileId

    if (upId === terrainTile.drawableTileId && downId === terrainTile.drawableTileId) {
      tile.drawsWith = tile.expandWith
    }

    if (upId !== terrainTile.drawableTileId && downId === terrainTile.drawableTileId) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.expandWith
    }
    
    if (downId === terrainTile.drawableTileId && downSouthId === terrainTile.drawableTileId) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.baseWith
    }

    if (upId === terrainTile.drawableTileId && upSouthId === terrainTile.drawableTileId) {
      tile.drawsWith = tile.topWith
    }
    
    if (upId !== terrainTile.drawableTileId && downId === terrainTile.drawableTileId && downSouthId === terrainTile.drawableTileId) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.baseWith
    }
    

    if (upId === terrainTile.drawableTileId && downId !== terrainTile.drawableTileId && southId !== terrainTile.drawableTileId) {
      tile.drawsWith = tile.baseWith
    }
    
    if (upId !== terrainTile.drawableTileId && downId !== terrainTile.drawableTileId) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.baseWith
    }

       
    if (!tile) {
      tile = {...drawableItem.drawingRules.find((tile: TerrainTile) => tile.default)}
    }
  
    tile.imageUrl = drawableItem.imageUrl
    tile.drawableTileId = terrainTile.drawableTileId   

    gridAsset.tile[RenderingLayers.TerrainLayer] = tile
    return tile
  }
}
