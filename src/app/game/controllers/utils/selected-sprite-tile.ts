import { drawableItems } from "../../db/drawable-items.db"
import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, Cell } from "../../models/map"

export function getClickedOnTerrainTile(mousePosX: number, mousePosY: number): { layer: RenderingLayers, cell: Cell} {
  let selectedTerrainTile
  GSM.GridController.iterateCells(GSM.GameData.map.currentElevationLayerIndex, cell => {
    if(Object.keys(cell.terrainTiles).length === 0) { return }
      
    GSM.GridController.layerIterator.forEach(layer => {
      if(!cell.terrainTiles[layer]) { return }
        
      const terrainTile = cell.terrainTiles[layer]
      const itemDetails = drawableItems.find(item => item.id === terrainTile.drawableTileId)

      const withinX = mousePosX > cell.position.x && mousePosX < cell.position.x + (GSM.Settings.blockSize)
      const withinY = mousePosY > (cell.position.y - (itemDetails.variableHeight * GSM.Settings.blockSize)) && mousePosY < cell.position.y + GSM.Settings.blockSize

      if(withinX && withinY) {
        selectedTerrainTile = {layer, cell}
      }
    })
  })
  return selectedTerrainTile
}