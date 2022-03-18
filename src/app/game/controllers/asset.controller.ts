import { Subject } from "rxjs";
import { GSM } from "../game-state-manager.service";
import { Asset } from "../models/asset.model";
import { Cell, Grid } from "../models/map";
import { Settings } from "../models/settings";

export class AssetController {
  public assets: Asset[] = []
  public assetClicked = new Subject<Asset>()
  public spriteTileClicked = new Subject<Cell>()

  constructor() {
    GSM.EventController.cellClick.subscribe(this.onCellClicked.bind(this))
    GSM.EventController.mouseDown.subscribe(this.onMouseDown.bind(this))
  }

  public getAssetByCellId(cellId: string): Asset | undefined {
    return this.assets.find(asset => asset.cell.id === cellId)
  }

  public getSelectedAssets(): Asset[] {
    return this.assets.filter(asset => asset.selected)
  }

  public deselectAllAssets(): void {
    this.assets.forEach(asset => asset.selected = false)
  }

  private onCellClicked(cellId: string): void {
    const asset = this.getAssetByCellId(cellId)
    if (asset) {
      this.assetClicked.next(asset)
      return
    }
  } 

  private onMouseDown(event: MouseEvent) {
    if(GSM.EventController.generalActionFire.value.name !== "deleteTerrain") { return }

    const clickPosX = event.offsetX
    const clickPosY = event.offsetY
    
    let selectedSpriteTile
    GSM.GridController.iterateCells(GSM.GridController.currentElevationLayerIndex, cell => {
      if(Object.keys(cell.spriteTiles).length === 0) { return }
      
      GSM.GridController.layerIterator.forEach(layer => {
        if(!cell.spriteTiles[layer]) { return }
        
        const spriteTile = cell.spriteTiles[layer]
        const selectableArea = cell.spriteTiles[layer].selectableArea
        if((clickPosX > cell.posX && clickPosX < cell.posX + spriteTile.tileWidth * GSM.Settings.blockSize)
          && (clickPosY > (cell.posY + spriteTile.tileOffsetY) && clickPosY < cell.posY + 32)) 
        {
          selectedSpriteTile = {layer, cell}
        }
      })
    })

    if(selectedSpriteTile) {
      this.spriteTileClicked.next(selectedSpriteTile)
    }

  }
}