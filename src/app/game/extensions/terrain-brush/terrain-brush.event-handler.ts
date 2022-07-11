import { terrainCleanup } from 'src/app/game/controllers/utils/terrain-cleanup';
import { drawableItems } from 'src/app/game/db/drawable-items.db';
import { Cell, NeighborLocation, RenderingLayers } from 'src/app/game/models/map';
import { DrawableItemViewModel, TerrainTile } from 'src/app/game/models/sprite-tile.model';
import { assetAttributes } from '../../db/asset-items';
import { GSM } from '../../game-state-manager.service';
import { GridAsset } from '../../models/asset.model';

export class TerrainTreeBrushEventHandler {
  constructor() {
    GSM.MouseController.cellClick.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.MouseController.cellHover.subscribe(this.onMouseEnteredCell.bind(this));
  }

  private onEmptyCellClicked(cell: Cell): void {
    if(GSM.ActionController.generalActionFire.value.name === "paintingTerrain") {
      const drawableTile = GSM.ActionController.generalActionFire.value.data as DrawableItemViewModel

      let mouseHoveringZAsset = GSM.MouseController.hoveringGridAsset
      let hoveringZAxis = GSM.MouseController.hoveringZAxisAtMouseDown
      if(!mouseHoveringZAsset) { 
        mouseHoveringZAsset = {zIndex: 0, anchorCell: cell} as any
      }
      const itemDetails = drawableItems.find(item => item.id === drawableTile.id)
      const newCell = GSM.GridController.getCellByLocation(mouseHoveringZAsset.anchorCell.location.x, mouseHoveringZAsset.anchorCell.location.y)
      const northCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.North)
      const northEastCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.NorthEast)
      const eastCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.East)       
      const newId = GSM.AssetController.getAsset(newCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId === itemDetails.id
      const northId = GSM.AssetController.getAsset(northCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId === itemDetails.id
      const northEastId = GSM.AssetController.getAsset(northEastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId === itemDetails.id
      const eastId = GSM.AssetController.getAsset(eastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId === itemDetails.id

      if(hoveringZAxis !== 0 && !(newId && northId && northEastId && eastId)) {
        return
      }
      
      const itemAttributes = assetAttributes.find(attribute => attribute.id === drawableTile.assetAttributeId)
      const staticHeight = drawableTile.staticHeight || 1
      for(let i = 0; i < staticHeight; i++) {    
        const northGridAsset = new GridAsset<TerrainTile>()
        northGridAsset.baseZIndex = hoveringZAxis + i
        northGridAsset.tile = new TerrainTile()
        northGridAsset.tile.drawableTileId = drawableTile.id
        northGridAsset.layer = RenderingLayers.TerrainLayer
        northGridAsset.attributes = assetAttributes.find(attribute => attribute.id === drawableTile.assetAttributeId)
        northGridAsset.attributesId = drawableTile.assetAttributeId
        GSM.AssetController.addAsset(northGridAsset, northCell, hoveringZAxis + i)
        terrainCleanup(northGridAsset)
        
        const northEastGridAsset = new GridAsset<TerrainTile>()
        northEastGridAsset.baseZIndex = hoveringZAxis + i
        northEastGridAsset.tile = new TerrainTile()
        northEastGridAsset.tile.drawableTileId = drawableTile.id
        northEastGridAsset.layer = RenderingLayers.TerrainLayer
        northEastGridAsset.attributes = assetAttributes.find(attribute => attribute.id === drawableTile.assetAttributeId)
        northEastGridAsset.attributesId = drawableTile.assetAttributeId
        GSM.AssetController.addAsset(northEastGridAsset, northEastCell, hoveringZAxis + i)
        terrainCleanup(northEastGridAsset)
        
        const newGridAsset = new GridAsset<TerrainTile>()
        newGridAsset.baseZIndex = hoveringZAxis + i
        newGridAsset.tile = new TerrainTile() 
        newGridAsset.tile.drawableTileId = drawableTile.id
        newGridAsset.layer = RenderingLayers.TerrainLayer
        newGridAsset.attributes = itemAttributes
        newGridAsset.attributesId = drawableTile.assetAttributeId
        GSM.AssetController.addAsset(newGridAsset, newCell, hoveringZAxis + i)
        terrainCleanup(newGridAsset)

        const eastGridAsset = new GridAsset<TerrainTile>()
        eastGridAsset.baseZIndex = hoveringZAxis + i
        eastGridAsset.tile = new TerrainTile()
        eastGridAsset.tile.drawableTileId = drawableTile.id
        eastGridAsset.layer = RenderingLayers.TerrainLayer
        eastGridAsset.attributes = assetAttributes.find(attribute => attribute.id === drawableTile.assetAttributeId)
        eastGridAsset.attributesId = drawableTile.assetAttributeId
        GSM.AssetController.addAsset(eastGridAsset, eastCell, hoveringZAxis + i)
        terrainCleanup(eastGridAsset)
      }
      
    }  
  }

  private onMouseEnteredCell(cell: Cell): void {
    const actionName = GSM.ActionController.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }    
    if(!GSM.KeyController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cell)
  }
}
