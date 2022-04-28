import { GSM } from "../../game-state-manager.service"
import { NeighborLocation, RenderingLayers } from "../../models/map"
import { DrawableItemViewModel, GridAsset, TerrainTile } from "../../models/sprite-tile.model"

export class TerrainEdgeCalculator {
  public static calculateTerrainEdges(gridAsset: GridAsset, terrainTile: TerrainTile, drawableItem: DrawableItemViewModel): TerrainTile {
    const neighboringCells = GSM.CellNeighborsController.getAllImmediateNeighbors(gridAsset)
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
      let northMatch = false
      let northEastMatch = false
      let eastMatch = false
      let southEastMatch = false
      let southMatch = false
      let southWestMatch = false
      let westMatch = false
      let northWestMatch = false

      if(GSM.RotationController.currentRotation === 0) {
        northMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
        northEastMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
        eastMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
        southEastMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
        southMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
        southWestMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
        westMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
        northWestMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null

      }

      if(GSM.RotationController.currentRotation === 1) {
        northMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
        northEastMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
        eastMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
        southEastMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
        southMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
        southWestMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
        westMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
        northWestMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null
      }

      if(GSM.RotationController.currentRotation === 2) {
        northMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
        northEastMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
        eastMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
        southEastMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
        southMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
        southWestMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
        westMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
        northWestMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null
      }

      if(GSM.RotationController.currentRotation === 3) {
        northMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
        northEastMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
        eastMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
        southEastMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
        southMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
        southWestMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
        westMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
        northWestMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null
      }
      const a = northMatch &&
      northEastMatch &&
      eastMatch &&
      southEastMatch &&
      southMatch &&
      southWestMatch &&
      westMatch &&
      northWestMatch &&
      northWestMatch

      if (a) {
        console.log(terrainTile.id)
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

    const upId = upNeighbor ? upNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const downId = downNeighbor ? downNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const downSouthId = downSouth ? downSouth[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const upSouthId = upSouth ? upSouth[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const southId = southNeighbor ? southNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const westId = westNeighbor ? westNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const downWestId = downWestNeighbor ? downWestNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const upWestId = upWestNeighbor ? upWestNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const eastId = eastNeighbor ? eastNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const downEastId = downEastNeighbor ? downEastNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const upEastId = upEastNeighbor ? upEastNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const northId = northNeighbor ? northNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const downNorthId = downNorthNeighbor ? downNorthNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null
    const upNorthId = upNorthNeighbor ? upNorthNeighbor[RenderingLayers.TerrainLayer]?.tile?.drawableTileId : null

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
    

    if(GSM.RotationController.currentRotation === 0) {
      if (upMatch && upSouthMatch) {
        tile.drawsWith = undefined
      } else if (upMatch && !upSouthMatch && southMatch) {
        tile.drawsWithTop = tile.topWith
      } else if (upMatch && downMatch && !southMatch && !downSouthMatch) {
        tile.drawsWith = tile.expandWith
      } else if (downMatch && !upMatch && !southMatch && !downSouthMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.expandWith
      } else if (downMatch && downSouthMatch && !upMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.baseWith
      } else if (upMatch && !downMatch && !southMatch) {
        tile.drawsWith = tile.baseWith
      } else if (upMatch && downMatch && !southMatch && downSouthMatch) {
        tile.drawsWith = tile.baseWith
      } else if (!upMatch && !downMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.baseWith
      } else {
        tile.drawsWith = undefined
      }
    }

    if(GSM.RotationController.currentRotation === 1) {
      if (upMatch && upEastMatch) {
        tile.drawsWith = undefined
      } else if (upMatch && !upEastMatch && eastMatch) {
        tile.drawsWithTop = tile.topWith
      } else if (upMatch && downMatch && !eastMatch && !downEastMatch) {
        tile.drawsWith = tile.expandWith
      } else if (downMatch && !upMatch && !eastMatch && !downEastMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.expandWith
      } else if (downMatch && downEastMatch && !upMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.baseWith
      } else if (upMatch && !downMatch && !eastMatch) {
        tile.drawsWith = tile.baseWith
      } else if (upMatch && downMatch && !eastMatch && downEastMatch) {
        tile.drawsWith = tile.baseWith
      } else if (!upMatch && !downMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.baseWith
      } else {
        tile.drawsWith = undefined
      }
    }

    if(GSM.RotationController.currentRotation === 2) {
      if (upMatch && upNorthMatch) {
        tile.drawsWith = undefined
      } else if (upMatch && !upNorthMatch && northMatch) {
        tile.drawsWithTop = tile.topWith
      } else if (upMatch && downMatch && !northMatch && !downNorthMatch) {
        tile.drawsWith = tile.expandWith
      } else if (downMatch && !upMatch && !northMatch && !downNorthMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.expandWith
      } else if (downMatch && downNorthMatch && !upMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.baseWith
      } else if (upMatch && !downMatch && !northMatch) {
        tile.drawsWith = tile.baseWith
      } else if (upMatch && downMatch && !northMatch && downNorthMatch) {
        tile.drawsWith = tile.baseWith
      } else if (!upMatch && !downMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.baseWith
      } else {
        tile.drawsWith = undefined
      }
    }

    if(GSM.RotationController.currentRotation === 3) {
      if (upMatch && upWestMatch) {
        tile.drawsWith = undefined
      } else if (upMatch && !upWestMatch && westMatch) {
        tile.drawsWithTop = tile.topWith
      } else if (upMatch && downMatch && !westMatch && !downWestMatch) {
        tile.drawsWith = tile.expandWith
      } else if (downMatch && !upMatch && !westMatch && !downWestMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.expandWith
      } else if (downMatch && downWestMatch && !upMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.baseWith
      } else if (upMatch && !downMatch && !westMatch) {
        tile.drawsWith = tile.baseWith
      } else if (upMatch && downMatch && !westMatch && downWestMatch) {
        tile.drawsWith = tile.baseWith
      } else if (!upMatch && !downMatch) {
        tile.drawsWithTop = tile.topWith
        tile.drawsWith = tile.baseWith
      } else {
        tile.drawsWith = undefined
      }
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
