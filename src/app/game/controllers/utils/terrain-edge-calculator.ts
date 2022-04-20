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
    const upNeighbor = neighboringCells[NeighborLocation.Up]
    const downNeighbor = neighboringCells[NeighborLocation.Down]
    const downSouth = neighboringCells[NeighborLocation.DownSouth]
    const upSouth = neighboringCells[NeighborLocation.UpSouth]
        
    const neighborsTerrain = {
      northWestMatch: northWestNeighbor ? northWestNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      northMatch: northNeighbor ? northNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      northEastMatch: northEastNeighbor ? northEastNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      westMatch: westNeighbor ? westNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      eastMatch: eastNeighbor ? eastNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      southWestMatch: southWestNeighbor ? southWestNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      southMatch: southNeighbor ? southNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      southEastMatch: southEastNeighbor ? southEastNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId === terrainTile.drawableTileId : false
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
        northWestMatch &&
        northWestMatch
    })}

    const upId = upNeighbor ? upNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const downId = downNeighbor ? downNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const downSouthId = downSouth ? downSouth[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const upSouthId = upSouth ? upSouth[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const southId = southNeighbor ? southNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null

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
    tile.layer = RenderingLayers.TerrainLayer

    gridAsset.tile = tile
    return tile
  }
}
