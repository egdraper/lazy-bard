import { drawableItems } from "../../db/drawable-items.db"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"
import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, NeighborLocation } from "../../models/map"
import { GridAsset, TerrainAsset } from "../../models/asset.model"

export function terrainCleanup(asset?: GridAsset) {
  let assets = asset ? [...GSM.CellNeighborsController.getAllImmediateNeighbors(asset, RenderingLayers.TerrainLayer), asset] : GSM.AssetController.assetArray

  assets.forEach((_asset: GridAsset) => {  
    if(_asset?.tile?.layer !== RenderingLayers.TerrainLayer) { return }
    if(_asset.tile.drawableTileId) {
      const itemDetails = drawableItems.find(item => item.id === _asset.tile.drawableTileId)
      TerrainEdgeCalculator.calculateTerrainEdges(_asset, _asset.tile, itemDetails)
    }
  })      
}