import { GSM } from "../../game-state-manager.service"
import { GridAsset } from "../../models/asset.model"
import { NeighborLocation, RenderingLayers } from "../../models/map"
import { DrawableItemViewModel, TerrainTile } from "../../models/sprite-tile.model"

export class TerrainEdgeCalculator {
  public static calculateTerrainEdges(gridAsset: GridAsset, terrainTile: TerrainTile, drawableItem: DrawableItemViewModel): TerrainTile {
    const neighboringCells = GSM.CellNeighborsController.getAllImmediateNeighbors(gridAsset, RenderingLayers.TerrainLayer) as GridAsset[]
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
      northWestMatch: northWestNeighbor ? northWestNeighbor?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      northMatch: northNeighbor ? northNeighbor?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      northEastMatch: northEastNeighbor ? northEastNeighbor?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      westMatch: westNeighbor ? westNeighbor?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      eastMatch: eastNeighbor ? eastNeighbor?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      southWestMatch: southWestNeighbor ? southWestNeighbor?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      southMatch: southNeighbor ? southNeighbor?.tile?.drawableTileId === terrainTile.drawableTileId : false,
      southEastMatch: southEastNeighbor ? southEastNeighbor?.tile?.drawableTileId === terrainTile.drawableTileId : false
    }
        
    let tile = {...drawableItem.drawingRules.find((terrainTile: TerrainTile) => {
      let northMatch = false
      let northEastMatch = false
      let eastMatch = false
      let southEastMatch = false
      let southMatch = false
      let southWestMatch = false
      let westMatch = false
      let northWestMatch = false

      northMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
      northEastMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
      eastMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
      southEastMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
      southMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
      southWestMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
      westMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
      northWestMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null
            
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

    const upId = upNeighbor ? upNeighbor?.tile?.drawableTileId : null
    const downId = downNeighbor ? downNeighbor?.tile?.drawableTileId : null
    const downSouthId = downSouth ? downSouth?.tile?.drawableTileId : null
    const upSouthId = upSouth ? upSouth?.tile?.drawableTileId : null
    const southId = southNeighbor ? southNeighbor?.tile?.drawableTileId : null

    const upMatch = upId && upId === terrainTile.drawableTileId
    const downMatch = downId && downId === terrainTile.drawableTileId
    const upSouthMatch = upSouthId && upSouthId === terrainTile.drawableTileId
    const southMatch = southId && southId === terrainTile.drawableTileId
    const downSouthMatch = downSouthId && downSouthId === terrainTile.drawableTileId
    
    if (!tile) {
      tile = {...drawableItem.drawingRules.find((tile: TerrainTile) => tile.default)}
    }
      
    this.setTilesForVerticalRendering(tile, upMatch, downMatch, upSouthMatch, southMatch, downSouthMatch)

    tile.imageUrl = drawableItem.imageUrl
    tile.drawableTileId = terrainTile.drawableTileId   
    tile.layer = RenderingLayers.TerrainLayer

    gridAsset.tile = tile
    return tile
  }

  private static setTilesForVerticalRendering(tile: TerrainTile, upMatch: boolean, downMatch: boolean, upForwardMatch: boolean, forwardMatch: boolean, downForwardMatch: boolean ): void {
    if (upMatch && upForwardMatch) {
      tile.drawsWith = undefined
    } else if (upMatch && !upForwardMatch && forwardMatch) {
      tile.drawsWithTop = tile.topWith
    } else if (upMatch && downMatch && !forwardMatch && !downForwardMatch) {
      tile.drawsWith = tile.expandWith
    } else if (downMatch && !upMatch && !forwardMatch && !downForwardMatch) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.expandWith
    } else if (downMatch && downForwardMatch && !upMatch) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.baseWith
    } else if (upMatch && !downMatch && !forwardMatch) {
      tile.drawsWith = tile.baseWith
    } else if (upMatch && downMatch && !forwardMatch && downForwardMatch) {
      tile.drawsWith = tile.baseWith
    } else if (!upMatch && !downMatch) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.baseWith
    } else {
      tile.drawsWith = undefined
    }
  }
}
