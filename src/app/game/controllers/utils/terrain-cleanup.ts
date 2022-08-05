import { drawableItems } from "../../db/drawable-items.db"
import { GSM } from "../../game-state-manager.service"
import { GridAsset } from "../../models/asset.model"
import { RenderingLayers } from "../../models/map"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"

export function terrainCleanup(asset?: GridAsset) {
  let assets = asset ? [...GSM.CellNeighborsController.getAllImmediateNeighbors(asset, RenderingLayers.TerrainLayer), asset] : GSM.AssetController.assetArray

  assets = assets.filter((asset: GridAsset) => {
    if(!asset) { return false }
    const leftAsset = GSM.AssetController.getAssetAtLocation(asset.anchorCell.location.x - 1, asset.anchorCell.location.y, asset.baseZIndex, RenderingLayers.TerrainLayer)
    const RightAsset = GSM.AssetController.getAssetAtLocation(asset.anchorCell.location.x + 1, asset.anchorCell.location.y, asset.baseZIndex, RenderingLayers.TerrainLayer)
 
    if(leftAsset?.tile?.drawableTileId !== asset?.tile?.drawableTileId && RightAsset?.tile?.drawableTileId !== asset?.tile?.drawableTileId) {
      return false
    }

    return true
  })

  assets.forEach((_asset: GridAsset) => {  
    if(_asset?.tile?.layer !== RenderingLayers.TerrainLayer) { return }
    if(_asset.tile.drawableTileId) {
      const itemDetails = drawableItems.find(item => item.id === _asset.tile.drawableTileId)
      TerrainEdgeCalculator.calculateTerrainEdges(_asset, _asset.tile, itemDetails)
    }
  })      
}