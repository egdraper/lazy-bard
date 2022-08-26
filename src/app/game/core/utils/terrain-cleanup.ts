import { drawableItems } from "../../db/drawable-items.db"
import { GSM } from "../../game-state-manager.service"
import { Asset } from "../../models/asset.model"
import { RenderingLayers } from "../../models/map"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"

export class TerrainCleanup {
  public static run(asset?: Asset) {
    let assets = asset ? [...GSM.CellNeighborsManager.getAllImmediateNeighbors(asset, RenderingLayers.TerrainLayer), asset] : GSM.AssetManager.assetArray
  
    this.cleanOrphanedTerrain()     
    assets.forEach((_asset: Asset) => {  
      if(_asset?.tile?.layer !== RenderingLayers.TerrainLayer) { return }
      if(_asset.tile.drawableTileId) {
        const itemDetails = drawableItems.find(item => item.id === _asset.tile.drawableTileId)
        TerrainEdgeCalculator.calculateTerrainEdges(_asset, _asset.tile, itemDetails)
      }
    }) 
  }

  public static cleanOrphanedTerrain(): void {
    let orphansFound = false
    const drawableTiles = GSM.AssetManager.assetArray.filter(asset => asset.tile.drawableTileId)
     
    drawableTiles.forEach(asset => { 
      const westAsset = GSM.AssetManager.getAssetByLocation(asset.anchorCell.location.x - 1, asset.anchorCell.location.y, asset.baseZIndex, asset.layer) 
      const eastAsset = GSM.AssetManager.getAssetByLocation(asset.anchorCell.location.x + 1, asset.anchorCell.location.y, asset.baseZIndex, RenderingLayers.TerrainLayer)
      const northAsset = GSM.AssetManager.getAssetByLocation(asset.anchorCell.location.x, asset.anchorCell.location.y - 1, asset.baseZIndex, RenderingLayers.TerrainLayer)
      const southAsset = GSM.AssetManager.getAssetByLocation(asset.anchorCell.location.x, asset.anchorCell.location.y + 1, asset.baseZIndex, RenderingLayers.TerrainLayer)
  
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
        GSM.AssetManager.removeAsset(asset)
        orphansFound = true
      }
    })
  
    if(orphansFound) {
      this.cleanOrphanedTerrain()
    }
  }
}