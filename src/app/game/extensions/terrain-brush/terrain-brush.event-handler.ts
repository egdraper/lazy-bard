import { terrainCleanup } from 'src/app/game/controllers/utils/terrain-cleanup';
import { NeighborLocation, RenderingLayers } from 'src/app/game/models/map';
import { DrawableTile, TerrainTile } from 'src/app/game/models/sprite-tile.model';
import { assetAttributes } from '../../db/asset-attributes';
import { GSM } from '../../game-state-manager.service';
import { Asset } from '../../models/asset.model';

export class TerrainTreeBrushEventHandler {
  constructor() {
    GSM.MouseController.cellDown.subscribe(this.cellClicked.bind(this));
    GSM.MouseController.cellHover.subscribe(this.onMouseEnteredCell.bind(this));
    GSM.MouseController.mouseUp.subscribe(this.onMouseUp.bind(this));
  }

  private cellClicked(): void {
    if(GSM.ActionController.generalActionFire.value.name === "paintingTerrain") {
      const cells = GSM.GridController.getCellsWithinRadius(GSM.MouseController.hoveringCellAtZAxisOnMouseDown, GSM.Settings.brushSize)

      cells.forEach((cell) => {
        if(!cell) { return }
        GSM.RendererController.renderAsAssets()
        const drawableTile = GSM.ActionController.generalActionFire.value.data as DrawableTile
         
        let hoveringZAxis = GSM.MouseController.hoveringZAxisAtMouseDown
        const newCell = GSM.GridController.getCellByLocation(cell.location.x, cell.location.y)
        const northCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.North)
        const northEastCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.NorthEast)
        const eastCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.East)       
        const southEastCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.SouthEast)
        const southCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.South)
        const southWestCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.SouthWest)
        const westCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.West)
        const northWestCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.NorthWest)
        
        const downAsset = GSM.AssetController.getAsset(newCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const northDownAsset = GSM.AssetController.getAsset(northCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const northEastDownAsset = GSM.AssetController.getAsset(northEastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const eastDownAsset = GSM.AssetController.getAsset(eastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const southEastDownAsset = GSM.AssetController.getAsset(southEastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const southDownAsset = GSM.AssetController.getAsset(southCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const southWestDownAsset = GSM.AssetController.getAsset(southWestCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const westDownAsset = GSM.AssetController.getAsset(westCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const northWestDownAsset = GSM.AssetController.getAsset(northWestCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
  
        const newId = downAsset?.tile?.drawableTile?.expandable
        const northId = northDownAsset?.tile?.drawableTile?.expandable
        const northEastId = northEastDownAsset?.tile?.drawableTile?.expandable
        const eastId = eastDownAsset?.tile?.drawableTile?.expandable
        const southEastId = southEastDownAsset?.tile?.drawableTile?.expandable
        const southId = southDownAsset?.tile?.drawableTile?.expandable
        const southWestId = southWestDownAsset?.tile?.drawableTile?.expandable
        const westId = westDownAsset?.tile?.drawableTile?.expandable
        const northWestId = northWestDownAsset?.tile?.drawableTile?.expandable
  

        let cells
        let placementLocationFound = false
        if(hoveringZAxis === 0) {
          placementLocationFound = true
          cells = [newCell, northCell, northEastCell, eastCell]
        } else if (newId && northId && northEastId && eastId) {
          placementLocationFound = true
          cells = [newCell, northCell, northEastCell, eastCell]
        } else if (newId && northId && northWestId && westId) {
          placementLocationFound = true
          cells = [newCell, northCell, northWestCell, westCell]
        } else if (newId && southId && southEastId && eastId) {
          placementLocationFound = true
          cells = [newCell, southCell, southEastCell, eastCell]
        } else if (newId && southId && southWestId && westId) {
          cells = [newCell, southCell, southWestCell, westCell]
          placementLocationFound = true
        }
  
        if(!placementLocationFound) { return }

        const staticHeight = drawableTile.staticHeight || 1
        for(let i = 0; i < staticHeight; i++) {
          
          cells.forEach(cell => {
            const newAsset = new Asset<TerrainTile>()
            newAsset.baseZIndex = hoveringZAxis + i
            newAsset.tile = new TerrainTile()
            newAsset.tile.drawableTileId = drawableTile.id
            newAsset.tile.drawableTile = drawableTile
            newAsset.layer = RenderingLayers.TerrainLayer
            newAsset.attributesId = drawableTile.assetAttributeId
            newAsset.attributes = assetAttributes.find((attribute) => newAsset.attributesId === attribute.id)
            GSM.AssetController.addAsset(newAsset, cell, hoveringZAxis + i)
            this.removeAllAboveTerrain(newAsset)    
          })
        }   
      })  
      terrainCleanup()
    }
  }

  private onMouseEnteredCell(): void {
    const actionName = GSM.ActionController.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }    
    if(!GSM.KeyController.keysPressed.has("mouseDown")) { return }

    this.cellClicked()
  }

  private removeAllAboveTerrain(asset: Asset): void {
    GSM.AssetController.getAssetsByCell(asset.anchorCell).forEach((_asset: Asset) => {
      const isAboveAssetAnObject = !_asset.tile.drawableTileId
      const isAssetAbove = _asset.baseZIndex > asset.baseZIndex
      const isAboveTerrainTypeDifferent = asset.tile?.drawableTile?.assetAttributeId !== _asset.tile?.drawableTile?.assetAttributeId
      const isAboveTerrainNonExpandable = !_asset.tile?.drawableTile?.expandable
      const assetHasHeightOfZero = asset.attributes.size.z === 0

      
      if((isAssetAbove && (isAboveTerrainTypeDifferent || isAboveTerrainNonExpandable)) || isAboveAssetAnObject) {
        if(assetHasHeightOfZero && isAboveAssetAnObject && _asset.baseZIndex === asset.baseZIndex) {
          // add If Shift Down remove the trees.
          return
        }

        GSM.AssetController.removeAsset(_asset)
      }
    })
  }

  private onMouseUp(): void {
    if(GSM.ActionController.generalActionFire.value.name === "paintingTerrain") {
      terrainCleanup()
      setTimeout(() => {
        GSM.RendererController.renderAsSingleImage()
      })
    }
  }
}
