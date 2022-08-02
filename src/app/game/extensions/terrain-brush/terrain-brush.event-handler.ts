import { terrainCleanup } from 'src/app/game/controllers/utils/terrain-cleanup';
import { drawableItems } from 'src/app/game/db/drawable-items.db';
import { Cell, NeighborLocation, RenderingLayers } from 'src/app/game/models/map';
import { DrawableItemViewModel, TerrainTile } from 'src/app/game/models/sprite-tile.model';
import { assetAttributes } from '../../db/asset-items';
import { GSM } from '../../game-state-manager.service';
import { Asset, GridAsset } from '../../models/asset.model';

export class TerrainTreeBrushEventHandler {
  constructor() {
    GSM.MouseController.cellClick.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.MouseController.cellDown.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.MouseController.cellHover.subscribe(this.onMouseEnteredCell.bind(this));
    GSM.MouseController.mouseUp.subscribe(this.onMouseUp.bind(this));
  }

  private onEmptyCellClicked(cell1: Cell): void {
    if(GSM.ActionController.generalActionFire.value.name === "paintingTerrain") {
      const _cells = GSM.GridController.getCellsWithinRadius(GSM.MouseController.hoveringCellAtZAxis, GSM.Settings.brushSize)
      let cellCount = 0
      _cells.forEach((cell) => {
        GSM.RendererController.renderAsAssets(RenderingLayers.TerrainLayer)
        const drawableTile = GSM.ActionController.generalActionFire.value.data as DrawableItemViewModel
         
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
        const asset = GSM.AssetController.getAsset(newCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        
        let expandable 
        if(asset) {
         expandable = drawableItems.find(item => item.id === asset.tile.drawableTileId).expandable
        }
  
        const newId = GSM.AssetController.getAsset(newCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId && expandable
        const northId = GSM.AssetController.getAsset(northCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId && expandable
        const northEastId = GSM.AssetController.getAsset(northEastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId && expandable
        const eastId = GSM.AssetController.getAsset(eastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId  && expandable
        const southEastId = GSM.AssetController.getAsset(southEastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId && expandable
        const southId = GSM.AssetController.getAsset(southCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId && expandable
        const southWestId = GSM.AssetController.getAsset(southWestCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId && expandable
        const westId = GSM.AssetController.getAsset(westCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId && expandable
        const northWestId = GSM.AssetController.getAsset(northWestCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId && expandable
  
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
            const newAsset = new GridAsset<TerrainTile>()
            newAsset.baseZIndex = hoveringZAxis + i
            newAsset.tile = new TerrainTile()
            newAsset.tile.drawableTileId = drawableTile.id
            newAsset.layer = RenderingLayers.TerrainLayer
            newAsset.attributes = assetAttributes.find(attribute => attribute.id === drawableTile.assetAttributeId)
            newAsset.attributesId = drawableTile.assetAttributeId
            GSM.AssetController.addAsset(newAsset, cell, hoveringZAxis + i)
            this.removeAllAboveTerrain(newAsset)        
            cellCount++
          })
        }   
      })  
      terrainCleanup()
    }
    



  }

  private onMouseEnteredCell(cell: Cell): void {
    const actionName = GSM.ActionController.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }    
    if(!GSM.KeyController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cell)
  }

  private removeAllAboveTerrain(asset: GridAsset): void {
    GSM.AssetController.getAssetsByAnchorCell(asset.anchorCell).forEach((_asset: GridAsset) => {
      if(_asset.baseZIndex > asset.baseZIndex && asset.tile.drawableTileId !== _asset.tile.drawableTileId) {
        GSM.AssetController.removeAsset(_asset, RenderingLayers.TerrainLayer)
      }
    })
  }

  private onMouseUp(): void {
    if(GSM.ActionController.generalActionFire.value.name === "paintingTerrain") {
      terrainCleanup()
      setTimeout(() => {
        GSM.RendererController.renderAsSingleImage(RenderingLayers.TerrainLayer)
      })
    }
  }
}
