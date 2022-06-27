import { GSM } from "../game-state-manager.service"
import { Cell, NeighborLocation } from "../models/map"
import { GridAsset } from "../models/asset.model"

export class CellNeighborsController {
  public getImmediateNeighborCell(
    cell: Cell,
    neighborLocation: NeighborLocation
  ): Cell {
    const x = Number(cell.id.split(":")[0].match(/\d+/))
    const y = Number(cell.id.split(":")[1].match(/\d+/))
    
    switch (neighborLocation) {
      case NeighborLocation.North:
        return GSM.GameData.map.grid[`x${x}:y${y - 1}`]
      case NeighborLocation.East:
        return GSM.GameData.map.grid[`x${x + 1}:y${y}`]
      case NeighborLocation.South:
        return GSM.GameData.map.grid[`x${x}:y${y + 1}`]
      case NeighborLocation.West:
        return GSM.GameData.map.grid[`x${x - 1}:y${y}`]
      case NeighborLocation.NorthEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y - 1}`]
      case NeighborLocation.SouthEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y + 1}`]
      case NeighborLocation.SouthWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y + 1}`]
      case NeighborLocation.NorthWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y - 1}`]
    }
    return null
  }

    public getImmediateNeighboringAsset(
      gridAsset: GridAsset,
      neighborLocation: NeighborLocation,
    ): { [layer: string]: GridAsset; } {
      const x = Number(gridAsset.blocks.id.split(":")[0].match(/\d+/))
      const y = Number(gridAsset.blocks.id.split(":")[1].match(/\d+/))
    switch (neighborLocation) {
      case NeighborLocation.North:
        return GSM.GameData.map.grid[`x${x}:y${y - 1}`]?.assets[gridAsset.zIndex]
      case NeighborLocation.East:
        return GSM.GameData.map.grid[`x${x + 1}:y${y}`]?.assets[gridAsset.zIndex]
      case NeighborLocation.South:
        return GSM.GameData.map.grid[`x${x}:y${y + 1}`]?.assets[gridAsset.zIndex]
      case NeighborLocation.West:
        return GSM.GameData.map.grid[`x${x - 1}:y${y}`]?.assets[gridAsset.zIndex]
      case NeighborLocation.NorthEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y - 1}`]?.assets[gridAsset.zIndex]
      case NeighborLocation.SouthEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y + 1}`]?.assets[gridAsset.zIndex]
      case NeighborLocation.SouthWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y + 1}`]?.assets[gridAsset.zIndex]
      case NeighborLocation.NorthWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y - 1}`]?.assets[gridAsset.zIndex]
      case NeighborLocation.Up:
        return GSM.GameData.map.grid[`x${x}:y${y}`]?.assets[gridAsset.zIndex + 1]
      case NeighborLocation.UpNorth:
        return GSM.GameData.map.grid[`x${x}:y${y - 1}`]?.assets[gridAsset.zIndex + 1]
      case NeighborLocation.UpEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y}`]?.assets[gridAsset.zIndex + 1]
      case NeighborLocation.UpSouth:
        return GSM.GameData.map.grid[`x${x}:y${y + 1}`]?.assets[gridAsset.zIndex + 1]
      case NeighborLocation.UpWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y}`]?.assets[gridAsset.zIndex + 1]
      case NeighborLocation.UpNorthEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y - 1}`]?.assets[gridAsset.zIndex + 1]
      case NeighborLocation.UpSouthEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y + 1}`]?.assets[gridAsset.zIndex + 1]
      case NeighborLocation.UpSouthWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y + 1}`]?.assets[gridAsset.zIndex + 1]
      case NeighborLocation.UpNorthWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y - 1}`]?.assets[gridAsset.zIndex + 1]
      case NeighborLocation.Down:
        return GSM.GameData.map.grid[`x${x}:y${y}`]?.assets[gridAsset.zIndex - 1]
      case NeighborLocation.DownNorth:
        return GSM.GameData.map.grid[`x${x}:y${y - 1}`]?.assets[gridAsset.zIndex - 1]
      case NeighborLocation.DownEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y}`]?.assets[gridAsset.zIndex - 1]
      case NeighborLocation.DownSouth:
        return GSM.GameData.map.grid[`x${x}:y${y + 1}`]?.assets[gridAsset.zIndex - 1]
      case NeighborLocation.DownWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y}`]?.assets[gridAsset.zIndex - 1]
      case NeighborLocation.DownNorthEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y - 1}`]?.assets[gridAsset.zIndex - 1]
      case NeighborLocation.DownSouthEast:
        return GSM.GameData.map.grid[`x${x + 1}:y${y + 1}`]?.assets[gridAsset.zIndex - 1]
      case NeighborLocation.DownSouthWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y + 1}`]?.assets[gridAsset.zIndex - 1]
      case NeighborLocation.DownNorthWest:
        return GSM.GameData.map.grid[`x${x - 1}:y${y - 1}`]?.assets[gridAsset.zIndex - 1]
    }
    return null
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

  public getHorizontalNeighborsAsset(gridAsset: GridAsset): { [layer: string]: GridAsset; }[] {
    const gridAssets: { [layer: string]: GridAsset; }[] = []
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.North))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.East))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.South))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.West))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.NorthEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.SouthEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.SouthWest))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.NorthWest))
    return gridAssets
  }  

  public getAllImmediateNeighbors(gridAsset: GridAsset): { [layer: string]: GridAsset; }[] {
    const gridAssets: { [layer: string]: GridAsset; }[] = []
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.North))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.East))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.South))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.West))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.NorthEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.SouthEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.SouthWest))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.NorthWest))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.Up))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.UpNorth))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.UpEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.UpSouth))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.UpWest))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.UpNorthEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.UpSouthEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.UpSouthWest))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.UpNorthWest))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.Down))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.DownNorth))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.DownEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.DownSouth))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.DownWest))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.DownNorthEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.DownSouthEast))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.DownSouthWest))
    gridAssets.push(this.getImmediateNeighboringAsset(gridAsset, NeighborLocation.DownNorthWest))
    return gridAssets
  }
}