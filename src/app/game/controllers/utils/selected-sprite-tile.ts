import { GSM } from "../../game-state-manager.service"
import { Cell } from "../../models/map"
import { GridAsset } from "../../models/sprite-tile.model"

export function getHoveredOverGridAsset(hoveringCell: Cell): GridAsset {
  let selectedAsset: GridAsset
  
  GSM.GridController.iterateYCells(hoveringCell.location.x, cell => {
    const assets = GSM.AssetController.getAssetsByCell(cell)
    assets.forEach((asset) => {
      GSM.GridController.layerIterator.forEach(layer => {
        if(asset.tile?.layer !== layer ) { return }
          const withinX = hoveringCell.position.x === asset.cell.position.x
          const withinY = hoveringCell.position.y >= (asset.cell.position.y - (GSM.AssetController.getTopAssetPerCell(cell).zIndex * GSM.Settings.blockSize)) && hoveringCell.position.y < asset.cell.position.y + GSM.Settings.blockSize
    
          if(withinX && withinY) {

          if(asset.zIndex === Math.abs(hoveringCell.location.y - asset.cell.location.y)) {
            selectedAsset = asset            
          }
        }
      })
    })
  })
  return selectedAsset
}