import { drawableItems } from "../../db/drawable-items.db"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"
import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, NeighborLocation } from "../../models/map"
import { GridAsset, TerrainAsset } from "../../models/asset.model"

export function terrainCleanup(asset: GridAsset) {
  if(!asset) { return }
  // GSM.AssetController.iterateAsset((asset: TerrainAsset) => {
    // if(asset.tile.layer !== RenderingLayers.TerrainLayer) { return }
    // const layer = RenderingLayers.TerrainLayer
    const neighbors = [asset, ...GSM.CellNeighborsController.getHorizontalNeighborsAsset(asset, RenderingLayers.TerrainLayer)]
    // const cellTileId = asset.tile.drawableTileId

    // const leftTileId = neighbors[NeighborLocation.West] ? neighbors[NeighborLocation.West][0]?.tile?.drawableTileId : undefined
    // const rightTileId = neighbors[NeighborLocation.East] ? neighbors[NeighborLocation.East][0]?.tile?.drawableTileId : undefined
    // const topTileId = neighbors[NeighborLocation.North] ? neighbors[NeighborLocation.North][0]?.tile?.drawableTileId : undefined
    // const bottomTileId = neighbors[NeighborLocation.South] ? neighbors[NeighborLocation.South][0]?.tile?.drawableTileId : undefined

    // NEEDS FIXED WITH DEBUGGER
    // if (leftTileId !== cellTileId && rightTileId !== cellTileId) {
    //   delete asset.tile[RenderingLayers.TerrainLayer]
    //   asset.ownedBlocks.[asset.zIndex] = false
    // }t

    // if (topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
    //   delete asset.tile[RenderingLayers.TerrainLayer]
    //   asset.ownedBlocks.obstructions[asset.zIndex] = false
    // }
  neighbors.forEach((_asset: GridAsset) => {   
    if(!_asset) { return }
    if(_asset.tile.layer !== RenderingLayers.TerrainLayer) { return }
    if(_asset.tile.drawableTileId) {
      const itemDetails = drawableItems.find(item => item.id === asset.tile.drawableTileId)
      TerrainEdgeCalculator.calculateTerrainEdges(_asset, _asset.tile, itemDetails)
    }
  })      
}