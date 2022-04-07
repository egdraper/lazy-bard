import { drawableItems } from "../../db/drawable-items.db"
import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, Cell } from "../../models/map"

export function getClickedOnTerrainTile(clickPosX: number, clickPosY: number): { layer: RenderingLayers, cell: Cell} {
  let selectedTerrainTile
  GSM.GridController.iterateCells(GSM.GameData.map.currentElevationLayerIndex, cell => {
    if(Object.keys(cell.terrainTiles).length === 0) { return }
      
    GSM.GridController.layerIterator.forEach(layer => {
      if(!cell.terrainTiles[layer]) { return }
        
      const terrainTile = cell.terrainTiles[layer]
      const itemDetails = drawableItems.find(item => item.id === terrainTile.drawableTileId)

      if((clickPosX > cell.position.x && clickPosX < cell.position.x + (GSM.Settings.blockSize))
        && (clickPosY > (cell.position.y + itemDetails.offsetY) && clickPosY < cell.position.y + GSM.Settings.blockSize)) 
      {
        selectedTerrainTile = {layer, cell}
      }
    })
  })
  return selectedTerrainTile
}