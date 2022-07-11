import { GSM } from "../../game-state-manager.service"
import { GridAsset } from "../../models/asset.model"
import { MapRotationIndex, NeighborLocation, RenderingLayers } from "../../models/map"
import { DrawableItemViewModel, TerrainTile } from "../../models/sprite-tile.model"

export class TerrainEdgeCalculator {
  public static calculateTerrainEdges(gridAsset: GridAsset, terrainTile: TerrainTile, drawableItem: DrawableItemViewModel): TerrainTile {
    const neighboringCells = GSM.CellNeighborsController.getAllImmediateNeighbors(gridAsset, RenderingLayers.TerrainLayer) as GridAsset[]
    const northNeighbor = neighboringCells[NeighborLocation.North]
    const downNorthNeighbor = neighboringCells[NeighborLocation.DownNorth]
    const upNorthNeighbor = neighboringCells[NeighborLocation.UpNorth]
    const northEastNeighbor = neighboringCells[NeighborLocation.NorthEast]
    const eastNeighbor = neighboringCells[NeighborLocation.East]
    const downEastNeighbor = neighboringCells[NeighborLocation.DownEast]
    const upEastNeighbor = neighboringCells[NeighborLocation.UpEast]
    const southEastNeighbor = neighboringCells[NeighborLocation.SouthEast]
    const southNeighbor = neighboringCells[NeighborLocation.South]
    const southWestNeighbor = neighboringCells[NeighborLocation.SouthWest]
    const westNeighbor = neighboringCells[NeighborLocation.West]
    const downWestNeighbor = neighboringCells[NeighborLocation.DownWest]
    const upWestNeighbor = neighboringCells[NeighborLocation.UpWest]
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

      if(GSM.RotationController.currentRotationIndex === MapRotationIndex.northUp) {
        northMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
        northEastMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
        eastMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
        southEastMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
        southMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
        southWestMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
        westMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
        northWestMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null
      }

      if(GSM.RotationController.currentRotationIndex === MapRotationIndex.westUp) {
        northMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
        northEastMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
        eastMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
        southEastMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
        southMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
        southWestMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
        westMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
        northWestMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null
      }

      if(GSM.RotationController.currentRotationIndex === MapRotationIndex.southUp) {
        northMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
        northEastMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
        eastMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
        southEastMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
        southMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
        southWestMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
        westMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
        northWestMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null
      }

      if(GSM.RotationController.currentRotationIndex === MapRotationIndex.eastUp) {
        northMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
        northEastMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
        eastMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
        southEastMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
        southMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
        southWestMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
        westMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
        northWestMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null
      }
            
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
    const westId = westNeighbor ? westNeighbor?.tile?.drawableTileId : null
    const downWestId = downWestNeighbor ? downWestNeighbor?.tile?.drawableTileId : null
    const upWestId = upWestNeighbor ? upWestNeighbor?.tile?.drawableTileId : null
    const eastId = eastNeighbor ? eastNeighbor?.tile?.drawableTileId : null
    const downEastId = downEastNeighbor ? downEastNeighbor?.tile?.drawableTileId : null
    const upEastId = upEastNeighbor ? upEastNeighbor?.tile?.drawableTileId : null
    const northId = northNeighbor ? northNeighbor?.tile?.drawableTileId : null
    const downNorthId = downNorthNeighbor ? downNorthNeighbor?.tile?.drawableTileId : null
    const upNorthId = upNorthNeighbor ? upNorthNeighbor?.tile?.drawableTileId : null

    const upMatch = upId && upId === terrainTile.drawableTileId
    const downMatch = downId && downId === terrainTile.drawableTileId
    const upSouthMatch = upSouthId && upSouthId === terrainTile.drawableTileId
    const southMatch = southId && southId === terrainTile.drawableTileId
    const downSouthMatch = downSouthId && downSouthId === terrainTile.drawableTileId
    const westMatch = westId && westId === terrainTile.drawableTileId
    const downWestMatch = downWestId && downWestId === terrainTile.drawableTileId
    const upWestMatch = upWestId && upWestId === terrainTile.drawableTileId
    const eastMatch = eastId && eastId === terrainTile.drawableTileId
    const downEastMatch = downEastId && downEastId === terrainTile.drawableTileId
    const upEastMatch = upEastId && upEastId === terrainTile.drawableTileId
    const northMatch = northId && northId === terrainTile.drawableTileId
    const downNorthMatch = downNorthId && downNorthId === terrainTile.drawableTileId
    const upNorthMatch = upNorthId && upNorthId === terrainTile.drawableTileId
    
    if (!tile) {
      tile = {...drawableItem.drawingRules.find((tile: TerrainTile) => tile.default)}
    }

    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.northUp) {
      this.setTilesForVerticalRendering(tile, upMatch, downMatch, upSouthMatch, southMatch, downSouthMatch)
    }

    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.westUp) {
      this.setTilesForVerticalRendering(tile, upMatch, downMatch, upEastMatch, eastMatch, downEastMatch)
    }

    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.southUp) {
      this.setTilesForVerticalRendering(tile, upMatch, downMatch, upNorthMatch, northMatch, downNorthMatch)
    }

    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.eastUp) {
      this.setTilesForVerticalRendering(tile, upMatch, downMatch, upWestMatch, westMatch, downWestMatch)
    }

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
