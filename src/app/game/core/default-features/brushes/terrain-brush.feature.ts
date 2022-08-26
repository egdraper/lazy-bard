import { assetAttributes } from '../../../db/asset-attributes';
import { GSM } from '../../../game-state-manager.service';
import { Asset } from '../../../models/asset.model';
import { Extension } from '../../../models/extension.model';
import { NeighborLocation, RenderingLayers } from '../../../models/map';
import { DrawableTile, TerrainTile } from '../../../models/sprite-tile.model';
import { TerrainCleanup } from '../../utils/terrain-cleanup';

export class TerrainBrushExtension extends Extension {
  public gameMasterView: boolean = true
  public gamePlayerView: Boolean = false

  public override async init(): Promise<void> {
    GSM.MouseManager.cellDown.subscribe(this.cellClicked.bind(this));
    GSM.MouseManager.cellHover.subscribe(this.onMouseEnteredCell.bind(this));
    GSM.MouseManager.mouseUp.subscribe(this.onMouseUp.bind(this));
  }

  private cellClicked(): void {
    if(GSM.EventManager.generalActionFire.value.name === "paintingTerrain") {
      const cells = GSM.GridManager.getCellsWithinRadius(GSM.MouseManager.hoveringCellAtZAxisOnMouseDown, GSM.Settings.brushSize)

      cells.forEach((cell) => {
        if(!cell) { return }
        GSM.RendererManager.renderAsAssets()
        const drawableTile = GSM.EventManager.generalActionFire.value.data as DrawableTile
         
        let hoveringZAxis = GSM.MouseManager.hoveringZAxisAtMouseDown
        const newCell = GSM.GridManager.getCellByLocation(cell.location.x, cell.location.y)
        const northCell = GSM.CellNeighborsManager.getImmediateNeighborCell(newCell, NeighborLocation.North)
        const northEastCell = GSM.CellNeighborsManager.getImmediateNeighborCell(newCell, NeighborLocation.NorthEast)
        const eastCell = GSM.CellNeighborsManager.getImmediateNeighborCell(newCell, NeighborLocation.East)       
        const southEastCell = GSM.CellNeighborsManager.getImmediateNeighborCell(newCell, NeighborLocation.SouthEast)
        const southCell = GSM.CellNeighborsManager.getImmediateNeighborCell(newCell, NeighborLocation.South)
        const southWestCell = GSM.CellNeighborsManager.getImmediateNeighborCell(newCell, NeighborLocation.SouthWest)
        const westCell = GSM.CellNeighborsManager.getImmediateNeighborCell(newCell, NeighborLocation.West)
        const northWestCell = GSM.CellNeighborsManager.getImmediateNeighborCell(newCell, NeighborLocation.NorthWest)
        
        const downAsset = GSM.AssetManager.getAsset(newCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const northDownAsset = GSM.AssetManager.getAsset(northCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const northEastDownAsset = GSM.AssetManager.getAsset(northEastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const eastDownAsset = GSM.AssetManager.getAsset(eastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const southEastDownAsset = GSM.AssetManager.getAsset(southEastCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const southDownAsset = GSM.AssetManager.getAsset(southCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const southWestDownAsset = GSM.AssetManager.getAsset(southWestCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const westDownAsset = GSM.AssetManager.getAsset(westCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
        const northWestDownAsset = GSM.AssetManager.getAsset(northWestCell, hoveringZAxis-1, RenderingLayers.TerrainLayer)
  
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
            GSM.AssetManager.addAsset(newAsset, cell, hoveringZAxis + i)
            this.removeAllAboveTerrain(newAsset)    
          })
        }   
      })  
      TerrainCleanup.run()
    }
  }

  private onMouseEnteredCell(): void {
    const actionName = GSM.EventManager.generalActionFire.value.name    
    if(actionName !== "paintingTerrain" && actionName !== "deleteTerrain") { return }    
    if(!GSM.KeyManager.keysPressed.has("mouseDown")) { return }

    this.cellClicked()
  }

  private removeAllAboveTerrain(asset: Asset): void {
    GSM.AssetManager.getAssetsByCell(asset.anchorCell).forEach((_asset: Asset) => {
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

        GSM.AssetManager.removeAsset(_asset)
      }
    })
  }

  private onMouseUp(): void {
    if(GSM.EventManager.generalActionFire.value.name === "paintingTerrain") {
      TerrainCleanup.run()
      setTimeout(() => {
        GSM.RendererManager.renderAsSingleImage()
      })
    }
  }
}
