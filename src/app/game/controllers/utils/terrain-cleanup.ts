import { drawableItems } from "../../db/drawable-items.db"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"
import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, NeighborLocation } from "../../models/map"
import { TerrainAsset } from "../../models/asset.model"

export function terrainCleanup() {
  GSM.AssetController.iterateAsset((asset: TerrainAsset) => {
    if(asset.tile.layer !== RenderingLayers.TerrainLayer) { return }
    const layer = RenderingLayers.TerrainLayer
    const neighbors = GSM.CellNeighborsController.getHorizontalNeighborsAsset(asset)
    const cellTileId = asset.tile.drawableTileId

    const leftTileId = neighbors[NeighborLocation.West] ? neighbors[NeighborLocation.West][layer]?.tile?.drawableTileId : undefined
    const rightTileId = neighbors[NeighborLocation.East] ? neighbors[NeighborLocation.East][layer]?.tile?.drawableTileId : undefined
    const topTileId = neighbors[NeighborLocation.North] ? neighbors[NeighborLocation.North][layer]?.tile?.drawableTileId : undefined
    const bottomTileId = neighbors[NeighborLocation.South] ? neighbors[NeighborLocation.South][layer]?.tile?.drawableTileId : undefined

    if (leftTileId !== cellTileId && rightTileId !== cellTileId) {
      delete asset.tile[RenderingLayers.TerrainLayer]
      asset.blocks.obstructions[asset.zIndex] = false
    }
    
    if (topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
      delete asset.tile[RenderingLayers.TerrainLayer]
      asset.blocks.obstructions[asset.zIndex] = false
    }
       
    if(asset.tile.drawableTileId) {
      const itemDetails = drawableItems.find(item => item.id === asset.tile.drawableTileId)
       
      TerrainEdgeCalculator.calculateTerrainEdges(
        asset,
        asset.tile,
        itemDetails
      )
    }
  })      
}