import { GSM } from "../game-state-manager.service"
import { Cell, NeighborLocation } from "../models/map"

export class CellNeighborsController {
  public getImmediateNeighbor(
    cell: Cell,
    neighborLocation: NeighborLocation,
    layer: number
  ): Cell {
    switch (neighborLocation) {
      case NeighborLocation.North:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.location.x}:y${cell.location.y - 1}`]
      case NeighborLocation.East:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.location.x + 1}:y${cell.location.y}`]
      case NeighborLocation.South:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.location.x}:y${cell.location.y + 1}`]
      case NeighborLocation.West:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.location.x - 1}:y${cell.location.y}`]
      case NeighborLocation.NorthEast:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.location.x + 1}:y${cell.location.y - 1}`]
      case NeighborLocation.SouthEast:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.location.x + 1}:y${cell.location.y + 1}`]
      case NeighborLocation.SouthWest:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.location.x - 1}:y${cell.location.y + 1}`]
      case NeighborLocation.NorthWest:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.location.x - 1}:y${cell.location.y - 1}`]
      case NeighborLocation.Up:
        return GSM.GameData.map.elevations[layer + 1].cells[`x${cell.location.x}:y${cell.location.y}`]
      case NeighborLocation.UpNorth:
        return GSM.GameData.map.elevations[layer + 1].cells[`x${cell.location.x}:y${cell.location.y - 1}`]
      case NeighborLocation.UpEast:
        return GSM.GameData.map.elevations[layer + 1].cells[`x${cell.location.x + 1}:y${cell.location.y}`]
      case NeighborLocation.UpSouth:
        return GSM.GameData.map.elevations[layer + 1].cells[`x${cell.location.x}:y${cell.location.y + 1}`]
      case NeighborLocation.UpWest:
        return GSM.GameData.map.elevations[layer + 1].cells[`x${cell.location.x - 1}:y${cell.location.y}`]
      case NeighborLocation.UpNorthEast:
        return GSM.GameData.map.elevations[layer + 1].cells[`x${cell.location.x + 1}:y${cell.location.y - 1}`]
      case NeighborLocation.UpSouthEast:
        return GSM.GameData.map.elevations[layer + 1].cells[`x${cell.location.x + 1}:y${cell.location.y + 1}`]
      case NeighborLocation.UpSouthWest:
        return GSM.GameData.map.elevations[layer + 1].cells[`x${cell.location.x - 1}:y${cell.location.y + 1}`]
      case NeighborLocation.UpNorthWest:
        return GSM.GameData.map.elevations[layer + 1].cells[`x${cell.location.x - 1}:y${cell.location.y - 1}`]
      case NeighborLocation.Down:
        return GSM.GameData.map.elevations[layer - 1].cells[`x${cell.location.x}:y${cell.location.y}`]
      case NeighborLocation.DownNorth:
        return GSM.GameData.map.elevations[layer - 1].cells[`x${cell.location.x}:y${cell.location.y - 1}`]
      case NeighborLocation.DownEast:
        return GSM.GameData.map.elevations[layer - 1].cells[`x${cell.location.x + 1}:y${cell.location.y}`]
      case NeighborLocation.DownSouth:
        return GSM.GameData.map.elevations[layer - 1].cells[`x${cell.location.x}:y${cell.location.y + 1}`]
      case NeighborLocation.DownWest:
        return GSM.GameData.map.elevations[layer - 1].cells[`x${cell.location.x - 1}:y${cell.location.y}`]
      case NeighborLocation.DownNorthEast:
        return GSM.GameData.map.elevations[layer - 1].cells[`x${cell.location.x + 1}:y${cell.location.y - 1}`]
      case NeighborLocation.DownSouthEast:
        return GSM.GameData.map.elevations[layer - 1].cells[`x${cell.location.x + 1}:y${cell.location.y + 1}`]
      case NeighborLocation.DownSouthWest:
        return GSM.GameData.map.elevations[layer - 1].cells[`x${cell.location.x - 1}:y${cell.location.y + 1}`]
      case NeighborLocation.DownNorthWest:
        return GSM.GameData.map.elevations[layer - 1].cells[`x${cell.location.x - 1}:y${cell.location.y - 1}`]
    }
    return null
  }

  public getHorizontalNeighbors(cell: Cell, elevationIndex: number): Cell[] {
    const cells = []
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.North, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.East, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.South, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.West, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.NorthEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.SouthEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.SouthWest, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.NorthWest, elevationIndex))
    return cells
  }  

  public getAllImmediateNeighbors(cell: Cell, elevationIndex: number): Cell[] {
    const cells = []
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.North, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.East, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.South, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.West, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.NorthEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.SouthEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.SouthWest, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.NorthWest, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.Up, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.UpNorth, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.UpEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.UpSouth, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.UpWest, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.UpNorthEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.UpSouthEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.UpSouthWest, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.UpNorthWest, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.Down, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.DownNorth, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.DownEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.DownSouth, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.DownWest, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.DownNorthEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.DownSouthEast, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.DownSouthWest, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.DownNorthWest, elevationIndex))
    return cells
  }
}