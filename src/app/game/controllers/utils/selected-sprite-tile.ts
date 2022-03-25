import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, Cell } from "../../models/map"

export function getClickedOnSpriteTile(clickPosX: number, clickPosY: number): { layer: RenderingLayers, cell: Cell} {
  let selectedSpriteTile
  GSM.GridController.iterateCells(GSM.GridController.gameMap.currentElevationLayerIndex, cell => {
    if(Object.keys(cell.spriteTiles).length === 0) { return }
      
    GSM.GridController.layerIterator.forEach(layer => {
      if(!cell.spriteTiles[layer]) { return }
        
      const spriteTile = cell.spriteTiles[layer]
      if((clickPosX > cell.posX && clickPosX < cell.posX + spriteTile.tileWidth * GSM.Settings.blockSize)
        && (clickPosY > (cell.posY + spriteTile.tileOffsetY) && clickPosY < cell.posY + GSM.Settings.blockSize)) 
      {
        selectedSpriteTile = {layer, cell}
      }
    })
  })
  return selectedSpriteTile
}