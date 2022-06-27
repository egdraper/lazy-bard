import { GSM } from "../../game-state-manager.service"
import { Cell, RenderingLayers } from "../../models/map"
import { GridAsset } from "../../models/asset.model"
import { Tile } from "../../models/sprite-tile.model"

export function getTopAssetBlockingCell(hoveringCell: Cell): GridAsset {
  let selectedAsset: GridAsset
  
  GSM.GridController.iterateYCells(hoveringCell.location.x, cell => {
    const assets = GSM.AssetController.getAssetsByCell(cell)
    assets.forEach((asset) => {
      GSM.GridController.layerIterator.forEach(layer => {
        if(asset.tile?.layer !== layer ) { return }
          const withinX = hoveringCell.position.x === asset.blocks.position.x
          const withinY = hoveringCell.position.y >= (asset.blocks.position.y - (GSM.AssetController.getTopAssetPerCell(cell).zIndex * GSM.Settings.blockSize)) && hoveringCell.position.y < asset.blocks.position.y + GSM.Settings.blockSize
    
          if(withinX && withinY) {

          if(asset.zIndex === Math.abs(hoveringCell.location.y - asset.blocks.location.y)) {
            selectedAsset = asset            
          }
        }
      })
    })
  })
  return selectedAsset
}

export function getAssetsBlockingCell(hoveringCell: Cell): GridAsset[] {
  let selectedAsset: GridAsset[] = []
  
  GSM.GridController.iterateYCells(hoveringCell.location.x, cell => {
    const assets = GSM.AssetController.getAssetsByCell(cell)
    assets.forEach((asset) => {
      GSM.GridController.layerIterator.forEach(layer => {
        if(asset.tile?.layer !== layer ) { return }
          const withinX = hoveringCell.position.x === asset.blocks.position.x
          const withinY = hoveringCell.position.y >= (asset.blocks.position.y - (GSM.AssetController.getTopAssetPerCell(cell).zIndex * GSM.Settings.blockSize)) && hoveringCell.position.y < asset.blocks.position.y + GSM.Settings.blockSize
    
          if(withinX && withinY) {

          if(asset.zIndex === Math.abs(hoveringCell.location.y - asset.blocks.location.y)) {
            selectedAsset.push(asset)            
          }
        }
      })
    })
  })
  return selectedAsset
}

export function getTilesBlockingCell(hoveringCell: Cell, layer: RenderingLayers): Tile[] {
  let selectedAsset: Tile[] = []
  
  GSM.GridController.iterateYCells(hoveringCell.location.x, cell => {
    const assets = GSM.AssetController.getAssetsByCell(cell)
    assets.forEach((asset) => {
      GSM.GridController.layerIterator.forEach(layer => {
        if(asset.tile?.layer !== layer ) { return }
          const withinX = hoveringCell.position.x === asset.blocks.position.x
          const withinY = hoveringCell.position.y >= (asset.blocks.position.y - (GSM.AssetController.getTopAssetPerCell(cell).zIndex * GSM.Settings.blockSize)) && hoveringCell.position.y < asset.blocks.position.y + GSM.Settings.blockSize
    
          if(withinX && withinY) {

          if(asset.zIndex === Math.abs(hoveringCell.location.y - asset.blocks.location.y)) {
            selectedAsset.push(asset.tile)            
          }
        }
      })
    })
  })
  return selectedAsset
}