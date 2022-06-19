import { ThisReceiver } from '@angular/compiler'
import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import { Cell, Grid, NeighborLocation, RenderingLayers } from '../models/map'
import { Asset, GridAsset } from '../models/asset.model'
import { getTopAssetBlockingCell } from './utils/selected-sprite-tile'

export class AssetController {
  public assetClicked = new Subject<GridAsset>()
  public assetClickedAtZIndex = new Subject<GridAsset>()
  private assetIterator: GridAsset[] = []

  constructor() {
    GSM.MouseController.cellClick.subscribe(this.onCellClicked.bind(this))
    GSM.FrameController.frameFire.subscribe(this.animateAsset.bind(this))
  }

  // what makes an asset playable
  // what makes them terrain

  /*
     Asset has life
*/
  public addAsset(gridAsset: GridAsset, cell: Cell, zIndex: number, layer: RenderingLayers): void {
    gridAsset.cell = cell
    gridAsset.zIndex = zIndex

    if (!cell.assets) {
      cell.assets = {}
    }

    if (!cell.assets[zIndex]) {
      cell.assets[zIndex] = {}
    }

    cell.assets[zIndex][layer] = gridAsset
    
    this.refreshAssetIterator()
  }

  public getAsset(cell: Cell, zIndex: number, layer: RenderingLayers): GridAsset {
    if(!cell.assets[zIndex]) {
      return null
    }

    if(!cell.assets[zIndex][layer]) {
      return null
    }

    return cell.assets[zIndex][layer]
  }

  public iterateAsset(callBack: (asset: GridAsset) => void) {
    this.assetIterator.forEach((asset) => { callBack(asset) })
  }

  public deselectAllAssets(): void {
    this.assetIterator.forEach((asset) => (asset.selected = false))
  }

  public changeZAxis(direction: "up" | "down", asset: GridAsset, layer: RenderingLayers): void {
    const upAsset = GSM.CellNeighborsController.getImmediateNeighboringAsset(asset, NeighborLocation.Up)
    const downAsset = GSM.CellNeighborsController.getImmediateNeighboringAsset(asset, NeighborLocation.Down)
    
    if (direction === "up") {
      if(upAsset && upAsset[layer] && upAsset[layer].tile?.layer === asset.tile.layer ) { return }
      this.removeAsset(asset.cell, asset.zIndex, layer)
      this.addAsset(asset, asset.cell, asset.zIndex+1, layer)
      return
    }
    if (direction === "down") {
      if(downAsset && downAsset[layer] && downAsset[layer].tile?.layer === asset.tile.layer ) { return }
      this.removeAsset(asset.cell, asset.zIndex, layer)
      this.addAsset(asset, asset.cell, asset.zIndex-1, layer)
      return
    }
  }

  public getTopAssetPerCell(cell: Cell, layer?: RenderingLayers): GridAsset {
    const gridAsset: GridAsset[] = []
    if(layer) {
      const zAxisList = Object.keys(cell.assets)
      const sortedZAxisList = zAxisList.sort((a, b) => Number(a) - Number(b))
      
      sortedZAxisList.forEach((zAxis) => {
          if (cell.assets[zAxis][layer]) {
            gridAsset.push(cell.assets[zAxis][layer])
          }
      })
      
      if (gridAsset.length > 0) {
        return gridAsset.pop()
      } else {
        return null
      }
  
    }
    
    return this.getAssetsByCell(cell).pop()
  }

  public getAssetsByCell(cell: Cell): GridAsset[] {
    if (!cell.assets) { return [] }

    const gridAsset: GridAsset[] = []
    const zAxisList = Object.keys(cell.assets)
    const sortedZAxisList = zAxisList.sort((a, b) => Number(a) - Number(b))
    
    sortedZAxisList.forEach((zAxis) => {
      GSM.RendererController.iterateRenderingLayers((layer) => {
        if (cell.assets[zAxis][layer]) {
          gridAsset.push(cell.assets[zAxis][layer])
        }
      })
    })

    return gridAsset
  }

  public getAssetByCellAtZ(cell: Cell, zIndex: number): GridAsset {
    return this.getAssetsByCell(cell).find((asset) => asset.zIndex === zIndex)
  }

  public switchAssetToNewCell(asset: GridAsset, currentCell: Cell, newCell: Cell, currentZIndex: number, newZIndex: number, currentLayer: RenderingLayers, newLayer: RenderingLayers) {
    asset.cell = newCell
    GSM.AssetController.addAsset(asset, newCell, newZIndex, newLayer)
    GSM.AssetController.removeAsset(currentCell, currentZIndex, currentLayer)
  }

  public getSelectedAssets(): Asset[] {
    const assets = []
    GSM.AssetController.iterateAsset((asset) => {
      if (asset.selected) {
        assets.push(asset)
      }
    })
    return assets
  }

  public removeAsset(cell: Cell, zIndex: number, layer: RenderingLayers): void {
    if (cell.assets[zIndex][layer]) {
      delete cell.assets[zIndex][layer]
    }

    if (Object.keys(cell.assets[zIndex]).length === 0) {
      delete cell.assets[zIndex]
    }

    this.refreshAssetIterator()
  }

  public refreshAssetIterator(): void {
    this.assetIterator = []

    GSM.GridController.iterateCells((cell) => {
      const gridAssets = this.getAssetsByCell(cell)
      gridAssets.forEach((gridAsset) => this.assetIterator.push(gridAsset))
    })
  }

  // Helper

  private onCellClicked(cell: Cell): void {
    const asset = getTopAssetBlockingCell(cell);
    
    if (asset) {
      this.assetClicked.next(asset)
      return
    }
  }

  private animateAsset(frame: number): void {
    GSM.AssetController.iterateAsset((asset: Asset) => {
      if (asset.animating) {
        if (frame % asset.animation.changeEveryNthFrame === 0) {
          asset.movement.updateAnimation()
        }
      }
    })
  }
}
