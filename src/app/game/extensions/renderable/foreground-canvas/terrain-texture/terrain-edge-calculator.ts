import { backgroundSprites } from "src/app/game/db/background.db"
import { GSM } from "../../../../game-state-manager.service"
import { Cell, RenderingLayers, NeighborLocation} from "../../../../models/map"
import { DrawableItemViewModel, AssetTile, TerrainTile } from "../../../../models/sprite-tile.model"
import { BaseTextureRandomGenerator } from "../../base-canvas/base-texture/base-texture.generator"

export class TerrainEdgeCalculator {
  public static calculateTerrainEdges(cell: Cell, terrainTile: TerrainTile, drawableItem: DrawableItemViewModel, elevationIndex: number ): TerrainTile {
    const neighboringCell = GSM.CellNeighborsController.getAllImmediateNeighbors(cell, elevationIndex)
    const topNeighbor = neighboringCell[NeighborLocation.Top]
    const topRightNeighbor = neighboringCell[NeighborLocation.TopRight]
    const rightNeighbor = neighboringCell[NeighborLocation.Right]
    const bottomRightNeighbor = neighboringCell[NeighborLocation.BottomRight]
    const bottomNeighbor = neighboringCell[NeighborLocation.Bottom]
    const bottomLeftNeighbor = neighboringCell[NeighborLocation.BottomLeft]
    const leftNeighbor = neighboringCell[NeighborLocation.Left]
    const topLeftNeighbor = neighboringCell[NeighborLocation.TopLeft]
        
    const neighborsTerrain = {
      topLeftMatch: topLeftNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      topCenterMatch: topNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      topRightMatch: topRightNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      centerLeftMatch: leftNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      centerRightMatch: rightNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      bottomLeftMatch: bottomLeftNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      bottomCenterMatch: bottomNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId,
      bottomRightMatch: bottomRightNeighbor?.terrainTiles[RenderingLayers.TerrainLayer]?.drawableTileId === terrainTile.drawableTileId
    }
        
    let tile = drawableItem.drawingRules.find((terrainTile: TerrainTile) => {
      const topMatch = neighborsTerrain.topCenterMatch === terrainTile.drawWhen.topNeighbor || terrainTile.drawWhen.topNeighbor === null
      const topRightMatch = neighborsTerrain.topRightMatch === terrainTile.drawWhen.topRightNeighbor || terrainTile.drawWhen.topRightNeighbor === null
      const rightMatch = neighborsTerrain.centerRightMatch === terrainTile.drawWhen.rightNeighbor || terrainTile.drawWhen.rightNeighbor === null
      const bottomRightMatch = neighborsTerrain.bottomRightMatch === terrainTile.drawWhen.bottomRightNeighbor || terrainTile.drawWhen.bottomRightNeighbor === null
      const bottomMatch = neighborsTerrain.bottomCenterMatch === terrainTile.drawWhen.bottomNeighbor || terrainTile.drawWhen.bottomNeighbor === null
      const bottomLeftNeighborMatch = neighborsTerrain.bottomLeftMatch === terrainTile.drawWhen.bottomLeftNeighbor || terrainTile.drawWhen.bottomLeftNeighbor === null
      const leftNeighborMatch = neighborsTerrain.centerLeftMatch === terrainTile.drawWhen.leftNeighbor || terrainTile.drawWhen.leftNeighbor === null
      const topLeftNeighborMatch = neighborsTerrain.topLeftMatch === terrainTile.drawWhen.topLeftNeighbor || terrainTile.drawWhen.topLeftNeighbor === null
        
      return topMatch &&
        topRightMatch &&
        rightMatch &&
        bottomRightMatch &&
        bottomMatch &&
        bottomLeftNeighborMatch &&
        leftNeighborMatch &&
        topLeftNeighbor &&
        topLeftNeighborMatch
    })
        
    //little confusing
    if (!tile) {
      tile = drawableItem.drawingRules.find((tile: TerrainTile) => tile.default)
    }

    // // //little confusing
    // if(tile.hasTerrainOnTop ) {
    //   if(!cell.terrainTiles[RenderingLayers.TerrainLayer].topWith) {
    //     const baseTexture = backgroundSprites.find(sprite => sprite.id === drawableItem.defaultTopBackground)
    //     BaseTextureRandomGenerator.autoFillBackgroundTerrain(terrainTile, baseTexture)
 
    //     tile.topWith = terrainTile.baseWith
    //     tile.imageUrl = baseTexture.imageUrl
    //     tile.drawableTileId = terrainTile.drawableTileId   
    //     cell.terrainTiles[RenderingLayers.TerrainLayer] = tile
    //   }
    //   return tile
    // }
    
    tile.imageUrl = drawableItem.imageUrl
    tile.drawableTileId = terrainTile.drawableTileId   

    cell.terrainTiles[RenderingLayers.TerrainLayer] = tile
    return tile
  }
}
