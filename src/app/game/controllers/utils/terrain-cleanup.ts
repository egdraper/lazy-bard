import { drawableItems } from "../../db/drawable-items.db"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"
import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, NeighborLocation } from "../../models/map"
import { GridAsset, TerrainAsset } from "../../models/asset.model"

export function terrainCleanup(asset?: GridAsset) {
  let assets
  if(asset) { 
    assets = [...GSM.CellNeighborsController.getAllImmediateNeighbors(asset, RenderingLayers.TerrainLayer), asset]
  } else {
    assets = GSM.AssetController.assetArray
  }
  
  // GSM.AssetController.iterateAsset((asset: TerrainAsset) => {
    // if(asset.tile.layer !== RenderingLayers.TerrainLayer) { return }
    // const layer = RenderingLayers.TerrainLayer
    // const directNeighbor = GSM.CellNeighborsController.getHorizontalNeighborsAsset(asset, RenderingLayers.TerrainLayer)
    // directNeighbor.forEach(neighborAsset => {
    //   if(neighborAsset) {
    //     const checkNeighbors = GSM.CellNeighborsController.getHorizontalNeighborsAsset(neighborAsset, RenderingLayers.TerrainLayer) as GridAsset[]
    //     const cellTileId = asset.tile.drawableTileId

    //     const leftTileId = checkNeighbors[NeighborLocation.West] ? checkNeighbors[NeighborLocation.West]?.tile?.drawableTileId : undefined
    //     const rightTileId = checkNeighbors[NeighborLocation.East] ? checkNeighbors[NeighborLocation.East]?.tile?.drawableTileId : undefined
    //     const topTileId = checkNeighbors[NeighborLocation.North] ? checkNeighbors[NeighborLocation.North]?.tile?.drawableTileId : undefined
    //     const bottomTileId = checkNeighbors[NeighborLocation.South] ? checkNeighbors[NeighborLocation.South]?.tile?.drawableTileId : undefined
       
    //     if (leftTileId !== cellTileId && rightTileId !== cellTileId) {
    //       delete GSM.AssetController.assets[neighborAsset.id]
    //     }
    //     if (topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
    //       delete GSM.AssetController.assets[neighborAsset.id]
    //     }
    //   }
    // })


   




    // NEEDS FIXED WITH DEBUGGER
    // if (leftTileId !== cellTileId && rightTileId !== cellTileId) {
    //   delete asset.tile[RenderingLayers.TerrainLayer]
    //   asset.ownedBlocks.[asset.zIndex] = false
    // }t

    // if (topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
    //   delete asset.tile[RenderingLayers.TerrainLayer]
    //   asset.ownedBlocks.obstructions[asset.zIndex] = false
    // }
  assets.forEach((_asset: GridAsset) => {  
  
    if(!_asset) { return }
    if(_asset.tile.layer !== RenderingLayers.TerrainLayer) { return }
    if(_asset.tile.drawableTileId) {
      const itemDetails = drawableItems.find(item => item.id === _asset.tile.drawableTileId)
      TerrainEdgeCalculator.calculateTerrainEdges(_asset, _asset.tile, itemDetails)
    }
  })      
}