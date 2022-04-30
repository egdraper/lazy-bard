import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import { Cell, RenderingLayers } from '../models/map'
import { Asset, GridAsset } from '../models/sprite-tile.model'

export class AssetController {
  public assetClicked = new Subject<GridAsset[]>()
  private assetIterator: GridAsset[] = []

  constructor() {
    GSM.EventController.cellClick.subscribe(this.onCellClicked.bind(this))
    GSM.FrameController.frameFire.subscribe(this.animateAsset.bind(this))
  }

  public iterateAsset(callBack: (asset: GridAsset) => void) {
    this.assetIterator.forEach((asset) => { callBack(asset) })
  }

  public deselectAllAssets(): void {
    this.assetIterator.forEach((asset) => (asset.selected = false))
  }

  public getTopAssetPerCell(cell: Cell) {
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

  public getAssetByCellAtZ(cell: Cell, zIndex): GridAsset {
    return this.getAssetsByCell(cell).find((asset) => asset.zIndex === zIndex)
  }

  public switchAssetToNewCell(asset: GridAsset, currentCell: Cell, newCell: Cell, currentZIndex: number, newZIndex: number, currentLayer: RenderingLayers, newLayer: RenderingLayers) {
    asset.cell = newCell
    GSM.GridAssetController.addAsset(asset, newCell, newZIndex, newLayer)
    GSM.GridAssetController.removeAsset(currentCell, currentZIndex, currentLayer)
  }

  public getSelectedAssets(): Asset[] {
    const assets = []
    GSM.GridAssetController.iterateAsset((asset) => {
      if (asset.selected) {
        assets.push(asset)
      }
    })
    return assets
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

  private onCellClicked(cell: Cell): void {
    const asset = this.getAssetsByCell(cell)
    
    if (asset.length > 0) {
      this.assetClicked.next(asset)
      return
    }
  }

  private animateAsset(frame: number): void {
    GSM.GridAssetController.iterateAsset((asset: Asset) => {
      if (asset.animating) {
        if (frame % asset.tile.animation.changeEveryNthFrame === 0) {
          asset.movement.updateAnimation()
        }
      }
    })
  }
}
