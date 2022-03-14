import { GSM } from "../../../../game-state-manager.service"
import { Cell, DrawableItem, ElevationLayers, NeighborLocation, SpriteTile } from "../../../../models/map"

export class TerrainEdgeCalculator {
  public static calculateTerrainEdges(cell: Cell, spriteTile: SpriteTile, drawableItem: DrawableItem ): SpriteTile {
    const neighboringCell = GSM.GridController.getAllNeighbors(cell, GSM.GridController.layerIndex)
    const topNeighbor = neighboringCell[NeighborLocation.Top]
    const topRightNeighbor = neighboringCell[NeighborLocation.TopRight]
    const rightNeighbor = neighboringCell[NeighborLocation.Right]
    const bottomRightNeighbor = neighboringCell[NeighborLocation.BottomRight]
    const bottomNeighbor = neighboringCell[NeighborLocation.Bottom]
    const bottomLeftNeighbor = neighboringCell[NeighborLocation.BottomLeft]
    const leftNeighbor = neighboringCell[NeighborLocation.Left]
    const topLeftNeighbor = neighboringCell[NeighborLocation.TopLeft]
        
    const neighborsTerrain = {
      topLeftMatch: topLeftNeighbor?.spriteTiles[ElevationLayers.TerrainLayer]?.drawableTileId === spriteTile.drawableTileId,
      topCenterMatch: topNeighbor?.spriteTiles[ElevationLayers.TerrainLayer]?.drawableTileId === spriteTile.drawableTileId,
      topRightMatch: topRightNeighbor?.spriteTiles[ElevationLayers.TerrainLayer]?.drawableTileId === spriteTile.drawableTileId,
      centerLeftMatch: leftNeighbor?.spriteTiles[ElevationLayers.TerrainLayer]?.drawableTileId === spriteTile.drawableTileId,
      centerRightMatch: rightNeighbor?.spriteTiles[ElevationLayers.TerrainLayer]?.drawableTileId === spriteTile.drawableTileId,
      bottomLeftMatch: bottomLeftNeighbor?.spriteTiles[ElevationLayers.TerrainLayer]?.drawableTileId === spriteTile.drawableTileId,
      bottomCenterMatch: bottomNeighbor?.spriteTiles[ElevationLayers.TerrainLayer]?.drawableTileId === spriteTile.drawableTileId,
      bottomRightMatch: bottomRightNeighbor?.spriteTiles[ElevationLayers.TerrainLayer]?.drawableTileId === spriteTile.drawableTileId
    }
        
    let tile = drawableItem.drawingRules.find((spriteTile: SpriteTile) => {
      const topMatch = neighborsTerrain.topCenterMatch === spriteTile.drawWhen.topNeighbor || spriteTile.drawWhen.topNeighbor === null
      const topRightMatch = neighborsTerrain.topRightMatch === spriteTile.drawWhen.topRightNeighbor || spriteTile.drawWhen.topRightNeighbor === null
      const rightMatch = neighborsTerrain.centerRightMatch === spriteTile.drawWhen.rightNeighbor || spriteTile.drawWhen.rightNeighbor === null
      const bottomRightMatch = neighborsTerrain.bottomRightMatch === spriteTile.drawWhen.bottomRightNeighbor || spriteTile.drawWhen.bottomRightNeighbor === null
      const bottomMatch = neighborsTerrain.bottomCenterMatch === spriteTile.drawWhen.bottomNeighbor || spriteTile.drawWhen.bottomNeighbor === null
      const bottomLeftNeighborMatch = neighborsTerrain.bottomLeftMatch === spriteTile.drawWhen.bottomLeftNeighbor || spriteTile.drawWhen.bottomLeftNeighbor === null
      const leftNeighborMatch = neighborsTerrain.centerLeftMatch === spriteTile.drawWhen.leftNeighbor || spriteTile.drawWhen.leftNeighbor === null
      const topLeftNeighborMatch = neighborsTerrain.topLeftMatch === spriteTile.drawWhen.topLeftNeighbor || spriteTile.drawWhen.topLeftNeighbor === null
        
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
        
    if (!tile) {
      tile = drawableItem.drawingRules.find((tile: SpriteTile) => tile.default)
    }
    tile.imageUrl = drawableItem.imageUrl
    tile.drawableTileId = spriteTile.drawableTileId
    cell.spriteTiles[ElevationLayers.TerrainLayer] = tile
    return tile
  }
}
