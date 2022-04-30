import { terrainCleanup } from 'src/app/game/controllers/utils/terrain-cleanup';
import { drawableItems } from 'src/app/game/db/drawable-items.db';
import { Cell, NeighborLocation, RenderingLayers } from 'src/app/game/models/map';
import { GridAsset, TerrainTile } from 'src/app/game/models/sprite-tile.model';
import { GSM } from '../../../game-state-manager.service';

export class TerrainTreeBrushEventHandler {
  constructor() {
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this));
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseEnteredCell.bind(this));
  }

  private onEmptyCellClicked(cell: Cell): void {
    if(GSM.EventController.generalActionFire.value.name === "paintingTerrain") {
      const drawableTile = GSM.EventController.generalActionFire.value.data as {id: string}

      let mouseHoveringZAsset = GSM.MouseController.hoveringGridAsset
      let hoveringZAxis = GSM.MouseController.hoveringZAxisAtMouseDown
      if(!mouseHoveringZAsset) { 
        mouseHoveringZAsset = {zIndex: 0, cell: cell} as any
      }
      const itemDetails = drawableItems.find(item => item.id === drawableTile.id)
      const newCell = GSM.GridController.getCellByLocation(mouseHoveringZAsset.cell.location.x, mouseHoveringZAsset.cell.location.y)
      const northCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.North)
      const northEastCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.NorthEast)
      const eastCell = GSM.CellNeighborsController.getImmediateNeighborCell(newCell, NeighborLocation.East)       
      const newId = GSM.GridAssetController.getAsset(newCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId === itemDetails.id
      const northId = GSM.GridAssetController.getAsset(northCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId === itemDetails.id
      const northEastId = GSM.GridAssetController.getAsset(northEastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId === itemDetails.id
      const eastId = GSM.GridAssetController.getAsset(eastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)?.tile?.drawableTileId === itemDetails.id

      if(hoveringZAxis !== 0 && !(newId && northId && northEastId && eastId)) {
        return
      }
          
      for(let i = 0; i < itemDetails.variableHeight; i++) {       
        const newGridAsset = new GridAsset<TerrainTile>()
        newGridAsset.zIndex = hoveringZAxis + i
        newGridAsset.tile = new TerrainTile()
        newGridAsset.tile.drawableTileId = drawableTile.id
        GSM.GridAssetController.addAsset(newGridAsset, newCell, hoveringZAxis + i, RenderingLayers.TerrainLayer)
        newCell.obstructions[hoveringZAxis + i] = true

        const northGridAsset = new GridAsset<TerrainTile>()
        northGridAsset.zIndex = hoveringZAxis + i
        northGridAsset.tile = new TerrainTile()
        northGridAsset.tile.drawableTileId = drawableTile.id
        GSM.GridAssetController.addAsset(northGridAsset, northCell, hoveringZAxis + i, RenderingLayers.TerrainLayer)
        northCell.obstructions[hoveringZAxis + i] = true

        const northEastGridAsset = new GridAsset<TerrainTile>()
        northEastGridAsset.zIndex = hoveringZAxis + i
        northEastGridAsset.tile = new TerrainTile()
        northEastGridAsset.tile.drawableTileId = drawableTile.id
        GSM.GridAssetController.addAsset(northEastGridAsset, northEastCell, hoveringZAxis + i, RenderingLayers.TerrainLayer)
        northEastCell.obstructions[hoveringZAxis + i] = true

        const eastGridAsset = new GridAsset<TerrainTile>()
        eastGridAsset.zIndex = hoveringZAxis + i
        eastGridAsset.tile = new TerrainTile()
        eastGridAsset.tile.drawableTileId = drawableTile.id
        GSM.GridAssetController.addAsset(eastGridAsset, eastCell, hoveringZAxis + i, RenderingLayers.TerrainLayer)
        eastCell.obstructions[hoveringZAxis + i] = true

        if(!newCell.assets[hoveringZAxis + i + 1]) {
          const newGridAsset1 = new GridAsset<TerrainTile>()
          newGridAsset1.zIndex = hoveringZAxis + i + 1
          newGridAsset1.tile = new TerrainTile()
          GSM.GridAssetController.addAsset(newGridAsset1, newCell, newGridAsset1.zIndex, RenderingLayers.TerrainLayer)
        }
         
        if(!northCell.assets[hoveringZAxis + i + 1]) {
          const northGridAsset1 = new GridAsset<TerrainTile>()
          northGridAsset1.zIndex = hoveringZAxis + i + 1
          northGridAsset1.tile = new TerrainTile()
          GSM.GridAssetController.addAsset(northGridAsset1, northCell, northGridAsset1.zIndex, RenderingLayers.TerrainLayer)
        }
         
        if(!northEastCell.assets[hoveringZAxis + i + 1]) {
          const northEastGridAsset1 = new GridAsset<TerrainTile>()
          northEastGridAsset1.zIndex = hoveringZAxis + i + 1
          northEastGridAsset1.tile = new TerrainTile()
          GSM.GridAssetController.addAsset(northEastGridAsset1, northEastCell, northEastGridAsset1.zIndex, RenderingLayers.TerrainLayer)
        }
         
        if(!eastCell.assets[hoveringZAxis + i + 1]) {
          const eastGridAsset1 = new GridAsset<TerrainTile>()
          eastGridAsset1.zIndex = hoveringZAxis + i + 1
          eastGridAsset1.tile = new TerrainTile()
          GSM.GridAssetController.addAsset(eastGridAsset1, eastCell, eastGridAsset1.zIndex, RenderingLayers.TerrainLayer)
        }
      }
    }  

    terrainCleanup()
  }

  private onMouseEnteredCell(cell: Cell): void {
    const actionName = GSM.EventController.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }    
    if(!GSM.EventController.keysPressed.has("mouseDown")) { return }

    this.onEmptyCellClicked(cell)
  }
}
