import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, Cell } from "../../models/map"

export function getClickedOnTerrainTile(clickPosX: number, clickPosY: number): { layer: RenderingLayers, cell: Cell} {
  let selectedTerrainTile
  GSM.GridController.iterateCells(GSM.GameData.map.currentElevationLayerIndex, cell => {
    if(Object.keys(cell.terrainTiles).length === 0) { return }
      
    GSM.GridController.layerIterator.forEach(layer => {
      if(!cell.terrainTiles[layer]) { return }
        
      const terrainTile = cell.terrainTiles[layer]
      if((clickPosX > cell.posX && clickPosX < cell.posX + terrainTile.spriteSize.x)
        && (clickPosY > (cell.posY + terrainTile.offsetY) && clickPosY < cell.posY + GSM.Settings.blockSize)) 
      {
        selectedTerrainTile = {layer, cell}
      }
    })
  })
  return selectedTerrainTile
}