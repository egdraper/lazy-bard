import { drawableItems } from "../../db/drawable-items.db"
import { GSM } from "../../game-state-manager.service"
import { GridAsset } from "../../models/asset.model"
import { RenderingLayers } from "../../models/map"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"

export function terrainCleanup(asset?: GridAsset) {
  let assets = asset ? [...GSM.CellNeighborsController.getAllImmediateNeighbors(asset, RenderingLayers.TerrainLayer), asset] : GSM.AssetController.assetArray

  assets = assets.filter((asset: GridAsset) => {
    if(!asset) { return false }
    const leftAsset = GSM.AssetController.getAssetByLocation(asset.anchorCell.location.x - 1, asset.anchorCell.location.y, asset.baseZIndex, RenderingLayers.TerrainLayer)
    const RightAsset = GSM.AssetController.getAssetByLocation(asset.anchorCell.location.x + 1, asset.anchorCell.location.y, asset.baseZIndex, RenderingLayers.TerrainLayer)
 
    if(leftAsset?.tile?.drawableTileId !== asset?.tile?.drawableTileId && RightAsset?.tile?.drawableTileId !== asset?.tile?.drawableTileId) {
      return false
    }

    return true
  })

  cleanOrphanedTerrain()     
  assets.forEach((_asset: GridAsset) => {  
    if(_asset?.tile?.layer !== RenderingLayers.TerrainLayer) { return }
    if(_asset.tile.drawableTileId) {
      const itemDetails = drawableItems.find(item => item.id === _asset.tile.drawableTileId)
      TerrainEdgeCalculator.calculateTerrainEdges(_asset, _asset.tile, itemDetails)
    }
  }) 
}

export function cleanOrphanedTerrain(): void {
  let orphansFound = false
  const drawableTiles = GSM.AssetController.assetArray.filter(asset => asset.tile.drawableTileId)
   
  drawableTiles.forEach(asset => { 
    const westAsset = GSM.AssetController.getAssetByLocation(asset.anchorCell.location.x - 1, asset.anchorCell.location.y, asset.baseZIndex, asset.layer) 
    const eastAsset = GSM.AssetController.getAssetByLocation(asset.anchorCell.location.x + 1, asset.anchorCell.location.y, asset.baseZIndex, RenderingLayers.TerrainLayer)
    const northAsset = GSM.AssetController.getAssetByLocation(asset.anchorCell.location.x, asset.anchorCell.location.y - 1, asset.baseZIndex, RenderingLayers.TerrainLayer)
    const southAsset = GSM.AssetController.getAssetByLocation(asset.anchorCell.location.x, asset.anchorCell.location.y + 1, asset.baseZIndex, RenderingLayers.TerrainLayer)

    const aId = asset.tile.drawableTileId
    const wId = westAsset?.tile.drawableTileId
    const eId = eastAsset?.tile.drawableTileId
    const nId = northAsset?.tile.drawableTileId
    const sId = southAsset?.tile.drawableTileId

    if(
     (!westAsset && !eastAsset)
     || (!northAsset && !southAsset)
     || (wId !== aId && !eastAsset)
     || (eId !== aId && !westAsset) 
     || (wId !== aId && eId !== aId)
     || (nId !== aId && !southAsset)
     || (sId !== aId && !northAsset)
     || (nId !== aId && sId !== aId))
     {
      GSM.AssetController.removeAsset(asset)
      orphansFound = true
    }
  })

  if(orphansFound) {
    cleanOrphanedTerrain()
  }
}