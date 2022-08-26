import { GSM } from "../game-state-manager.service"
import { AssetBlock, Asset } from "../models/asset.model"
import { Cell, NeighborLocation, RenderingLayers } from "../models/map"

export class CellNeighborsManager {
  public getImmediateNeighborCell(
    cell: Cell,
    neighborLocation: NeighborLocation
  ): Cell {   
    switch (neighborLocation) {
      case NeighborLocation.North:
        return GSM.GridManager.getCellByLocation(cell.location.x ,cell.location.y - 1)
      case NeighborLocation.East:
        return GSM.GridManager.getCellByLocation(cell.location.x + 1, cell.location.y)
      case NeighborLocation.South:
        return GSM.GridManager.getCellByLocation(cell.location.x ,cell.location.y + 1)
      case NeighborLocation.West:
        return GSM.GridManager.getCellByLocation(cell.location.x - 1, cell.location.y)
      case NeighborLocation.NorthEast:
        return GSM.GridManager.getCellByLocation(cell.location.x + 1, cell.location.y - 1)
      case NeighborLocation.SouthEast:
        return GSM.GridManager.getCellByLocation(cell.location.x + 1, cell.location.y + 1)
      case NeighborLocation.SouthWest:
        return GSM.GridManager.getCellByLocation(cell.location.x - 1, cell.location.y + 1)
      case NeighborLocation.NorthWest:
        return GSM.GridManager.getCellByLocation(cell.location.x - 1, cell.location.y - 1)
    }
    return null
  }

  public getImmediateNeighboringAssets(
    gridAsset: Asset,
    neighborLocation: NeighborLocation,
    layer?: RenderingLayers
  ): Asset[] {
    let blocks: AssetBlock[] = []
    switch (neighborLocation) {
      case NeighborLocation.North:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { north: true })
        return this.filterAssets(blocks, 0, -1, 0, layer)
      case NeighborLocation.East:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { east: true })
        return this.filterAssets(blocks, 1, 0, 0, layer)
      case NeighborLocation.South:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { south: true })
        return this.filterAssets(blocks, 0, 1, 0, layer)
      case NeighborLocation.West:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { west: true })
        return this.filterAssets(blocks, -1, 0, 0, layer)
      case NeighborLocation.NorthEast:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { north: true, east: true })
        return this.filterAssets(blocks, 1, -1, 0, layer)
      case NeighborLocation.SouthEast:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { south: true, east: true })
        return this.filterAssets(blocks, 1, 1, 0, layer)
      case NeighborLocation.SouthWest:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { south: true, west: true })
        return this.filterAssets(blocks, -1, 1, 0, layer)
      case NeighborLocation.NorthWest:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { north: true, west: true })
        return this.filterAssets(blocks, -1, -1, 0, layer)
      case NeighborLocation.Up:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { up: true })
        return this.filterAssets(blocks, 0, 0, 1, layer)
      case NeighborLocation.UpNorth:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { up: true, north: true })
        return this.filterAssets(blocks, 0, -1, 1, layer)
      case NeighborLocation.UpEast:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { up: true, east: true })
        return this.filterAssets(blocks, 1, 0, 1, layer)
      case NeighborLocation.UpSouth:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { up: true, south: true })
        return this.filterAssets(blocks, 0, 1, 1, layer)
      case NeighborLocation.UpWest:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { up: true, west: true })
        return this.filterAssets(blocks, -1, 0, 1, layer)
      case NeighborLocation.UpNorthEast:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { up: true, north: true , east: true })
        return this.filterAssets(blocks, 1, -1, 1, layer)
      case NeighborLocation.UpSouthEast:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { up: true, south: true , east: true })
        return this.filterAssets(blocks, 1, 1, 1, layer)
      case NeighborLocation.UpSouthWest:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { up: true, south: true , west: true })
        return this.filterAssets(blocks, -1, 1, 1, layer)
      case NeighborLocation.UpNorthWest:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { up: true, north: true , west: true })
        return this.filterAssets(blocks, -1, -1, -1, layer)
      case NeighborLocation.Down:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { down: true })
        return this.filterAssets(blocks, 0, 0, -1, layer)
      case NeighborLocation.DownNorth:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { down: true, north: true })
        return this.filterAssets(blocks, 0, -1, -1, layer)
      case NeighborLocation.DownEast:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { down: true, east: true })
        return this.filterAssets(blocks, 1, 0, -1, layer)
      case NeighborLocation.DownSouth:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { down: true, south: true })
        return this.filterAssets(blocks, 0, 1, -1, layer)
      case NeighborLocation.DownWest:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { down: true, west: true })
        return this.filterAssets(blocks, -1, 0, -1, layer)
      case NeighborLocation.DownNorthEast:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { down: true, north: true, east: true})
        return this.filterAssets(blocks, 1, -1, -1, layer)
      case NeighborLocation.DownSouthEast:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { down: true, south: true, east: true})
        return this.filterAssets(blocks, 1, 1, -1, layer)
      case NeighborLocation.DownSouthWest:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { down: true, south: true, west: true})
        return this.filterAssets(blocks, -1, 1, -1, layer)
      case NeighborLocation.DownNorthWest:
        blocks = GSM.AssetManager.getAllAssetBlocksByEdge(gridAsset, { down: true, north: true, west: true})
        return this.filterAssets(blocks, -1, -1, -1, layer)
    }
  }

  public getHorizontalNeighborsCell(cell: Cell): Cell[] {
    const cells = []
    cells.push(this.getImmediateNeighborCell(cell, NeighborLocation.North))
    cells.push(this.getImmediateNeighborCell(cell, NeighborLocation.East))
    cells.push(this.getImmediateNeighborCell(cell, NeighborLocation.South))
    cells.push(this.getImmediateNeighborCell(cell, NeighborLocation.West))
    cells.push(this.getImmediateNeighborCell(cell, NeighborLocation.NorthEast))
    cells.push(this.getImmediateNeighborCell(cell, NeighborLocation.SouthEast))
    cells.push(this.getImmediateNeighborCell(cell, NeighborLocation.SouthWest))
    cells.push(this.getImmediateNeighborCell(cell, NeighborLocation.NorthWest))
    return cells
  }  

  public getHorizontalNeighborsAsset(asset: Asset, layer?: RenderingLayers): Asset[][] | Asset[] {
    const gridAssets: Asset[][] = []
    gridAssets.push(this.getImmediateNeighboringAssets(asset, NeighborLocation.North, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(asset, NeighborLocation.East, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(asset, NeighborLocation.South, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(asset, NeighborLocation.West, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(asset, NeighborLocation.NorthEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(asset, NeighborLocation.SouthEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(asset, NeighborLocation.SouthWest, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(asset, NeighborLocation.NorthWest, layer))
    return gridAssets
  }  

  public getAllImmediateNeighbors(gridAsset: Asset, layer?: RenderingLayers): Asset[][] | Asset[] {
    const gridAssets: Asset[][] = []
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.North, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.East, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.South, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.West, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.NorthEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.SouthEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.SouthWest, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.NorthWest, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.Up, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.UpNorth, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.UpEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.UpSouth, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.UpWest, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.UpNorthEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.UpSouthEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.UpSouthWest, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.UpNorthWest, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.Down, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.DownNorth, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.DownEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.DownSouth, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.DownWest, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.DownNorthEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.DownSouthEast, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.DownSouthWest, layer))
    gridAssets.push(this.getImmediateNeighboringAssets(gridAsset, NeighborLocation.DownNorthWest, layer))
    return gridAssets
  }

  public getRelativeNeighbor(cell: Cell, xDistance: number, yDistance: number): Cell {
    const x = cell.location.x + xDistance
    const y = cell.location.y + yDistance

    return GSM.GridManager.getCellByLocation(x, y)
  }

  private filterAssets(blocks: AssetBlock[], xDirection: number, yDirection: number, zOffset: number = 0, layer: RenderingLayers ) {
    let gridAssets = []
    blocks.forEach(block => {
      const neighborCell = GSM.GridManager.getCellByLocation(block.cell.location.x + xDirection, block.cell.location.y + yDirection)
      let neighborAssets
      
      if(layer) {
        neighborAssets = GSM.AssetManager.getAsset(neighborCell, block.zIndex + zOffset, layer)
        gridAssets = neighborAssets
      } else {
        neighborAssets = GSM.AssetManager.getAssetsByCellAtZ(neighborCell, block.zIndex + zOffset)
        if(neighborAssets.length !== 0) {
          gridAssets = [...gridAssets, ...neighborAssets]
        }
      }
    })
    return gridAssets
  }

}