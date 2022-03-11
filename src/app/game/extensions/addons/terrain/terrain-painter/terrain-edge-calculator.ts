import { GSM } from "../../../../game-state-manager.service"
import { Cell, DrawableItem, ElevationLayers, NeighborLocation, SpriteTile, MapAssetImageCell } from "../../../../models/map"

export class TerrainEdgeCalculator {
  public static calculateTerrainEdges(cell: Cell, terrainCell: MapAssetImageCell, drawGrid: {[id: string]: MapAssetImageCell}, drawableItem: DrawableItem ): void {
    const neighboringCell = GSM.GridController.getAllNeighbors(cell, 0)
    const topNeighbor = neighboringCell[NeighborLocation.Top]
    const topRightNeighbor = neighboringCell[NeighborLocation.TopRight]
    const rightNeighbor = neighboringCell[NeighborLocation.Right]
    const bottomRightNeighbor = neighboringCell[NeighborLocation.BottomRight]
    const bottomNeighbor = neighboringCell[NeighborLocation.Bottom]
    const bottomLeftNeighbor = neighboringCell[NeighborLocation.BottomLeft]
    const leftNeighbor = neighboringCell[NeighborLocation.Left]
    const topLeftNeighbor = neighboringCell[NeighborLocation.TopLeft]
        
    const neighborsTerrain = {
      topLeftMatch: drawGrid[topLeftNeighbor?.id]?.drawableTileId === terrainCell.drawableTileId,
      topCenterMatch: drawGrid[topNeighbor?.id]?.drawableTileId === terrainCell.drawableTileId,
      topRightMatch: drawGrid[topRightNeighbor?.id]?.drawableTileId === terrainCell.drawableTileId,
      centerLeftMatch: drawGrid[leftNeighbor?.id]?.drawableTileId === terrainCell.drawableTileId,
      centerRightMatch: drawGrid[rightNeighbor?.id]?.drawableTileId === terrainCell.drawableTileId,
      bottomLeftMatch: drawGrid[bottomLeftNeighbor?.id]?.drawableTileId === terrainCell.drawableTileId,
      bottomCenterMatch: drawGrid[bottomNeighbor?.id]?.drawableTileId === terrainCell.drawableTileId,
      bottomRightMatch: drawGrid[bottomRightNeighbor?.id]?.drawableTileId === terrainCell.drawableTileId
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
    terrainCell.imageTile = tile
  }
}
