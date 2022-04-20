import { drawableItems } from "../../db/drawable-items.db"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"
import { GSM } from "../../game-state-manager.service"
import { RenderingLayers, NeighborLocation } from "../../models/map"
import { TerrainAsset, TerrainTile } from "../../models/sprite-tile.model"

export function terrainCleanup() {
      GSM.GridAssetController.iterateAsset((asset: TerrainAsset) => {
        if(asset.tile.layer !== RenderingLayers.TerrainLayer) { return }
        const layer = RenderingLayers.TerrainLayer
        const neighbors = GSM.CellNeighborsController.getHorizontalNeighborsAsset(asset)
        const cellTileId = asset.tile.drawableTileId

        const leftTileId = neighbors[NeighborLocation.West] ? neighbors[NeighborLocation.West][layer]?.tile?.drawableTileId : undefined
        const rightTileId = neighbors[NeighborLocation.East] ? neighbors[NeighborLocation.East][layer]?.tile?.drawableTileId : undefined
        const topTileId = neighbors[NeighborLocation.North] ? neighbors[NeighborLocation.North][layer]?.tile?.drawableTileId : undefined
        const bottomTileId = neighbors[NeighborLocation.South] ? neighbors[NeighborLocation.South][layer]?.tile?.drawableTileId : undefined
    
        // const topLeftTileId = (neighbors[NeighborLocation.NorthWest][layer]?.tile as TerrainTile).drawableTileId 
        // const topRightTileId = (neighbors[NeighborLocation.NorthEast][layer]?.tile as TerrainTile).drawableTileId
        // const bottomLeftTileId = (neighbors[NeighborLocation.SouthWest][layer]?.tile as TerrainTile).drawableTileId
        // const bottomRightTileId = (neighbors[NeighborLocation.SouthEast][layer]?.tile as TerrainTile).drawableTileId
              
        if (leftTileId !== cellTileId && rightTileId !== cellTileId) {
          delete asset.tile[RenderingLayers.TerrainLayer]
          asset.cell.obstructions[asset.zIndex] = false
        }
        if (topTileId !== cellTileId &&  bottomTileId !== cellTileId) {
          delete asset.tile[RenderingLayers.TerrainLayer]
          asset.cell.obstructions[asset.zIndex] = false
        }
        // if(bottomLeftTileId === cellTileId && !leftTileId && bottomTileId !== cellTileId) {
        //   neighbors[NeighborLocation.West][layer].tile = new TerrainTile();
        //   (neighbors[NeighborLocation.West][layer].tile as TerrainTile).drawableTileId = asset.tile.drawableTileId
        //   neighbors[NeighborLocation.South][layer].tile = new TerrainTile();
        //   (neighbors[NeighborLocation.South][layer].tile as TerrainTile).drawableTileId = asset.tile.drawableTileId
        //   neighbors[NeighborLocation.SouthEast][layer].tile = new TerrainTile();
        //   (neighbors[NeighborLocation.SouthEast][layer].tile as TerrainTile).drawableTileId = asset.tile.drawableTileId
          
        //   const leftLeftCell = GSM.GridController.getCellByLocation(
        //     neighbors[NeighborLocation.West][layer].cell.location.x - 1,
        //     neighbors[NeighborLocation.West][layer].cell.location.y
        //   )
        //   leftLeftCell.assets[asset.zIndex][layer].tile = new TerrainTile();
        //   (leftLeftCell.assets[asset.zIndex][layer].tile as TerrainTile).drawableTileId = asset.tile[layer].drawableTileId
        // }
        
        if(asset.tile.drawableTileId) {
          const itemDetails = drawableItems.find(item => item.id === asset.tile.drawableTileId)
        
          if(GSM.EventController.generalActionFire.value.name.includes("Terrain")) {
            TerrainEdgeCalculator.calculateTerrainEdges(
              asset,
              asset.tile,
              itemDetails
            )
          }
        }
      })    
  
}