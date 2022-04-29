import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import { Cell, RenderingLayers, GameMap, Grid, Size } from '../models/map'

const DEFAULT_ITERATOR = 0

export class MapController {
  public newGridCreated: Subject<Grid> = new Subject<Grid>()  
  public layerIterator: RenderingLayers[] = []
  public gridIterator: {[rotation: number]: Cell[]} = {}

  public iterateCells(iteratorId: number, callBack: (cell: Cell) => void): void {
    this.gridIterator[iteratorId].forEach((cell) => {
      callBack(cell)
    })
  }

  public iterateYCells(x: number, iteratorId: number, callBack: (cell: Cell) => void): void {
    for(let y = 0; y < GSM.GameData.map.size.y; y++) {
      callBack(this.getCellByLocation(x, y, iteratorId))
    }
  }

  public getCellByPosition(
    x: number,
    y: number,
    iteratorId: number
  ): Cell {
    while (x % GSM.Settings.blockSize !== 0) {
      x--
    }
    while (y % GSM.Settings.blockSize !== 0) {
      y--
    }

    return GSM.GridController.gridIterator[iteratorId].find(a => a.position.x === x && a.position.y === y)
  }

  public getCellByLocation(x: number, y: number, iteratorId: number): Cell {
    return GSM.GridController.gridIterator[iteratorId].find(a => a.location.x === x && a.location.y === y)
  }

  public getCellById(cellId: string): Cell {
    return GSM.GameData.map.grid[cellId]
  }
 
  public createGameMap(size: Size): void {
    GSM.GameData.map = new GameMap(size)
    GSM.GameData.map.id = Math.random().toString()
    this.setupMap()

    Object.keys(RenderingLayers).forEach(key => {
      GSM.GridController.layerIterator.push(RenderingLayers[key])
    })
  }

  public setupMap(): void {   
    this.gridIterator[DEFAULT_ITERATOR] = []
    
    for (let y = 0; y < GSM.GameData.map.size.y; y++) {
      for (let x = 0; x < GSM.GameData.map.size.x; x++) {
        const cell: Cell = {
          id: `x${x}:y${y}`,
          location: { x, y},
          obstructions: {},
          assets: {},
          position: { x: x * GSM.Settings.blockSize, y: y * GSM.Settings.blockSize},
        }

        GSM.GameData.map.grid[`x${x}:y${y}`] = cell
        this.gridIterator[DEFAULT_ITERATOR].push(cell)
      }
    }

    this.newGridCreated.next(GSM.GameData.map)
  }
}
