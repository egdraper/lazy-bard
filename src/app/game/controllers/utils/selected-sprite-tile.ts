import { drawableItems } from "../../db/drawable-items.db"
import { GSM } from "../../game-state-manager.service"
import { GridAsset } from "../../models/sprite-tile.model"

export function getHoveredOverGridAsset(mousePosX: number, mousePosY: number): GridAsset {
  let selectedAsset: GridAsset

  const cell = GSM.GridController.getCellByPosition(mousePosX, mousePosY)
  
  GSM.GridController.iterateYCells(cell.location.x, cell => {
    const assets = GSM.GridAssetController.getAssetsByCell(cell)
    assets.forEach((asset) => {
      GSM.GridController.layerIterator.forEach(layer => {
        if(!asset.tile[layer]) { return }
          
        const terrainTile = asset.tile[layer]
        const itemDetails = drawableItems.find(item => item.id === terrainTile.drawableTileId)
    
        if(itemDetails) {
          const withinX = mousePosX > cell.position.x && mousePosX < cell.position.x + (GSM.Settings.blockSize)
          const withinY = mousePosY > (cell.position.y - (itemDetails.variableHeight * GSM.Settings.blockSize)) && mousePosY < cell.position.y + GSM.Settings.blockSize
    
          if(withinX && withinY) {
            selectedAsset = asset
          }
        }
      })
    })
  })
  return selectedAsset
}