import { backgroundSprites } from "../../db/background.db"
import { BaseTextureRandomGenerator } from "../../extensions/base-texture/base-texture.generator"
import { GSM } from "../../game-state-manager.service"
import { Asset } from "../../models/asset.model"
import { NeighborLocation, RenderingLayers } from "../../models/map"
import { AssetTile, DrawableTile, TerrainTile } from "../../models/sprite-tile.model"

export class TerrainEdgeCalculator {
  public static calculateTerrainEdges(gridAsset: Asset<TerrainTile>, terrainTile: TerrainTile, drawableItem: DrawableTile): TerrainTile {
    const neighboringCells = GSM.CellNeighborsController.getAllImmediateNeighbors(gridAsset, RenderingLayers.TerrainLayer) as Asset[]
    const northNeighbor = neighboringCells[NeighborLocation.North]
    const northEastNeighbor = neighboringCells[NeighborLocation.NorthEast]
    const eastNeighbor = neighboringCells[NeighborLocation.East]
    const southEastNeighbor = neighboringCells[NeighborLocation.SouthEast]
    const southNeighbor = neighboringCells[NeighborLocation.South]
    const southWestNeighbor = neighboringCells[NeighborLocation.SouthWest]
    const westNeighbor = neighboringCells[NeighborLocation.West]
    const northWestNeighbor = neighboringCells[NeighborLocation.NorthWest]
    const upNeighbor = neighboringCells[NeighborLocation.Up]
    const downNeighbor = neighboringCells[NeighborLocation.Down]
    const downSouth = neighboringCells[NeighborLocation.DownSouth]
    const upSouth = neighboringCells[NeighborLocation.UpSouth]
        
    const neighborsTerrain = {
      northWestMatch: northWestNeighbor ? northWestNeighbor?.tile?.drawableTile.assetAttributeId === terrainTile.drawableTile.assetAttributeId : false,
      northMatch: northNeighbor ? northNeighbor?.tile?.drawableTile.assetAttributeId === terrainTile.drawableTile.assetAttributeId : false,
      northEastMatch: northEastNeighbor ? northEastNeighbor?.tile?.drawableTile.assetAttributeId === terrainTile.drawableTile.assetAttributeId : false,
      westMatch: westNeighbor ? westNeighbor?.tile?.drawableTile.assetAttributeId === terrainTile.drawableTile.assetAttributeId : false,
      eastMatch: eastNeighbor ? eastNeighbor?.tile?.drawableTile.assetAttributeId === terrainTile.drawableTile.assetAttributeId : false,
      southWestMatch: southWestNeighbor ? southWestNeighbor?.tile?.drawableTile.assetAttributeId === terrainTile.drawableTile.assetAttributeId : false,
      southMatch: southNeighbor ? southNeighbor?.tile?.drawableTile.assetAttributeId === terrainTile.drawableTile.assetAttributeId : false,
      southEastMatch: southEastNeighbor ? southEastNeighbor?.tile?.drawableTile.assetAttributeId === terrainTile.drawableTile.assetAttributeId : false
    }
        
    let tile = {...drawableItem.drawingRules.find((terrainTile: TerrainTile) => {
      let northMatch = false
      let northEastMatch = false
      let eastMatch = false
      let southEastMatch = false
      let southMatch = false
      let southWestMatch = false
      let westMatch = false
      let northWestMatch = false

      northMatch = neighborsTerrain.northMatch === terrainTile.drawWhen.northNeighbor || terrainTile.drawWhen.northNeighbor === null
      northEastMatch = neighborsTerrain.northEastMatch === terrainTile.drawWhen.northEastNeighbor || terrainTile.drawWhen.northEastNeighbor === null
      eastMatch = neighborsTerrain.eastMatch === terrainTile.drawWhen.eastNeighbor || terrainTile.drawWhen.eastNeighbor === null
      southEastMatch = neighborsTerrain.southEastMatch === terrainTile.drawWhen.southEastNeighbor || terrainTile.drawWhen.southEastNeighbor === null
      southMatch = neighborsTerrain.southMatch === terrainTile.drawWhen.southNeighbor || terrainTile.drawWhen.southNeighbor === null
      southWestMatch = neighborsTerrain.southWestMatch === terrainTile.drawWhen.southWestNeighbor || terrainTile.drawWhen.southWestNeighbor === null
      westMatch = neighborsTerrain.westMatch === terrainTile.drawWhen.westNeighbor || terrainTile.drawWhen.westNeighbor === null
      northWestMatch = neighborsTerrain.northWestMatch === terrainTile.drawWhen.northWestNeighbor || terrainTile.drawWhen.northWestNeighbor === null
            
      return northMatch &&
      northEastMatch &&
      eastMatch &&
      southEastMatch &&
      southMatch &&
      southWestMatch &&
      westMatch &&
      northWestMatch &&
      northWestMatch
    })}

    const upId = upNeighbor ? upNeighbor?.tile?.drawableTile.assetAttributeId : null
    const downId = downNeighbor ? downNeighbor?.tile?.drawableTile.assetAttributeId : null
    const downSouthId = downSouth ? downSouth?.tile?.drawableTile.assetAttributeId: null
    const upSouthId = upSouth ? upSouth?.tile?.drawableTile.assetAttributeId : null
    const southId = southNeighbor ? southNeighbor?.tile?.drawableTile.assetAttributeId : null

    const upMatch = upId && upId === terrainTile.drawableTile.assetAttributeId
    const downMatch = downId && downId === terrainTile.drawableTile.assetAttributeId
    const upSouthMatch = upSouthId && upSouthId === terrainTile.drawableTile.assetAttributeId
    const southMatch = southId && southId === terrainTile.drawableTile.assetAttributeId
    const downSouthMatch = downSouthId && downSouthId === terrainTile.drawableTile.assetAttributeId
    
    if (!tile) {
      tile = {...drawableItem.drawingRules.find((tile: TerrainTile) => tile.default)}
    }
      
    this.setTilesForVerticalRendering(tile, upMatch, downMatch, upSouthMatch, southMatch, downSouthMatch)
    
    if(tile.id === "MidCenter" && drawableItem.backgroundTerrainId) {
      const backgroundTexture = backgroundSprites.find(bgTile => bgTile.id === drawableItem.backgroundTerrainId)
      GSM.ImageController.addImageBySrcUrl(backgroundTexture.imageUrl)
      
      if(gridAsset.tile.imageUrl === backgroundTexture.imageUrl) {
        tile = gridAsset.tile
      } else {
        tile.imageUrl = backgroundTexture.imageUrl
        tile.drawsWithTop = BaseTextureRandomGenerator.getRandomTerrain(backgroundTexture)
      }
    } else {
      tile.imageUrl = drawableItem.imageUrl
    }
    // this.drawBackgroundForCenterTile(tile, drawableItem, gridAsset)


    tile.drawableTileId = terrainTile.drawableTileId   
    tile.drawableTile = terrainTile.drawableTile
    tile.layer = RenderingLayers.TerrainLayer

    gridAsset.tile = tile
    return tile
  }

  private static setTilesForVerticalRendering(tile: TerrainTile, upMatch: boolean, downMatch: boolean, upForwardMatch: boolean, forwardMatch: boolean, downForwardMatch: boolean ): void {
    if (upMatch && upForwardMatch) {
      tile.drawsWith = undefined
      tile.drawsWithTop = undefined
    } else if (upMatch && !upForwardMatch && forwardMatch) {
      tile.drawsWithTop = tile.topWith
    } else if (upMatch && downMatch && !forwardMatch && !downForwardMatch) {
      tile.drawsWith = tile.expandWith
    } else if (downMatch && !upMatch && !forwardMatch && !downForwardMatch) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.expandWith
    } else if (downMatch && downForwardMatch && !upMatch) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.baseWith
    } else if (upMatch && !downMatch && !forwardMatch) {
      tile.drawsWith = tile.baseWith
    } else if (upMatch && downMatch && !forwardMatch && downForwardMatch) {
      tile.drawsWith = tile.baseWith
    } else if (!upMatch && !downMatch) {
      tile.drawsWithTop = tile.topWith
      tile.drawsWith = tile.baseWith
    } else {
      tile.drawsWith = undefined
    }
  }

  private static drawBackgroundForCenterTile(tile, drawableItem, gridAsset) {
    if(tile.id === "MidCenter" && drawableItem.backgroundTerrainId) {
      const backgroundTexture = backgroundSprites.find(bgTile => bgTile.id === drawableItem.backgroundTerrainId)
      GSM.ImageController.addImageBySrcUrl(backgroundTexture.imageUrl)
      
      if(gridAsset.tile.imageUrl === backgroundTexture.imageUrl) {
        tile = gridAsset.tile
      } else {
        tile.imageUrl = backgroundTexture.imageUrl
        tile.drawsWithTop = BaseTextureRandomGenerator.getRandomTerrain(backgroundTexture)
      }
    } else {
      tile.imageUrl = drawableItem.imageUrl
    }
  }
}
