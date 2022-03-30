import { GSM } from "../game-state-manager.service"
import { Cell, NeighborLocation } from "../models/map"

export class CellNeighborsController {
  public getImmediateNeighbor(
    cell: Cell,
    neighborLocation: NeighborLocation,
    layer: number
  ): Cell {
    switch (neighborLocation) {
      case NeighborLocation.Top:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.x}:y${cell.y - 1}`]
      case NeighborLocation.Right:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.x + 1}:y${cell.y}`]
      case NeighborLocation.Bottom:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.x}:y${cell.y + 1}`]
      case NeighborLocation.Left:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.x - 1}:y${cell.y}`]
      case NeighborLocation.TopRight:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.x + 1}:y${cell.y - 1}`]
      case NeighborLocation.BottomRight:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.x + 1}:y${cell.y + 1}`]
      case NeighborLocation.BottomLeft:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.x - 1}:y${cell.y + 1}`]
      case NeighborLocation.TopLeft:
        return GSM.GameData.map.elevations[layer].cells[`x${cell.x - 1}:y${cell.y - 1}`]
    }
  }

  public getAllImmediateNeighbors(cell: Cell, elevationIndex: number): Cell[] {
    const cells = []
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.Top, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.Right, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.Bottom, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.Left, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.TopRight, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.BottomRight, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.BottomLeft, elevationIndex))
    cells.push(this.getImmediateNeighbor(cell, NeighborLocation.TopLeft, elevationIndex))
    return cells
  }
}