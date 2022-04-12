import { backgroundSprites } from "src/app/game/db/background.db"
import { GSM } from "../../game-state-manager.service"
import { Cell, RenderingLayers, NeighborLocation} from "../../models/map"
import { DrawableItemViewModel, AssetTile, TerrainTile } from "../../models/sprite-tile.model"
import { BaseTextureRandomGenerator } from "../../extensions/renderable/base-canvas/base-texture/base-texture.generator"

export class TerrainEdgeCalculator {
  public static calculateTerrainEdges(cell: Cell, terrainTile: TerrainTile, drawableItem: DrawableItemViewModel, elevationIndex: number ): TerrainTile {
    const neighboringCells = GSM.CellNeighborsController.getAllImmediateNeighbors(cell, elevationIndex)
    const northNeighbor = neighboringCells[NeighborLocation.North]
    const northEastNeighbor = neighboringCells[NeighborLocation.NorthEast]
    const eastNeighbor = neighboringCells[NeighborLocation.East]
    const southEastNeighbor = neighboringCells[NeighborLocation.SouthEast]
    const southNeighbor = neighboringCells[NeighborLocation.South]
    const southWestNeighbor = neighboringCells[NeighborLocation.SouthWest]
    const westNeighbor = neighboringCells[NeighborLocation.West]
    const northWestNeighbor = neighboringCells[NeighborLocation.NorthWest]
        
    const neighborsTerrain = {
      northWestMatch: northWestNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      northMatch: northNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      northEastMatch: northEastNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      westMatch: westNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      eastMatch: eastNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      southWestMatch: southWestNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      southMatch: southNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      southEastMatch: southEastNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId
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

    const upId = neighboringCells[NeighborLocation.Up]?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId
    const downId = neighboringCells[NeighborLocation.Down]?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId
    const downSouthId = neighboringCells[NeighborLocation.DownSouth]?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId
    const upSouthId = neighboringCells[NeighborLocation.UpSouth]?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId
    const southId = southNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId

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

    cell.terrainTiles[RenderingLayers.TerrainLayer] = tile
    return tile
  }
}
