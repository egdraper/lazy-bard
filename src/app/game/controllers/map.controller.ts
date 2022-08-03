import { ThisReceiver } from '@angular/compiler'
import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import { Cell, RenderingLayers, GameMap, Grid, Size, MapRotationIndex } from '../models/map'

const DEFAULT_ITERATOR = MapRotationIndex.northUp

export class MapController {
  public map: GameMap
  public newGridCreated: Subject<Grid> = new Subject<Grid>()  
  public layerIterator: RenderingLayers[] = []
  public gridIterator: {[rotation: number]: Cell[]} = {}

  public iterateCells(callBack: (cell: Cell) => void): void {
    this.gridIterator[GSM.RotationController.currentRotationIndex].forEach((cell) => {
      callBack(cell)
    })
  }

  public iterateYCells(x: number, callBack: (cell: Cell) => void): void {
    for(let y = 0; y < GSM.GridController.map.size.y; y++) {
      callBack(this.getCellByLocation(x, y))
    }
  }
  public iterateYCellsFrom(startY: number, x: number, callBack: (cell: Cell) => void): void {
    for(let y = startY; y < GSM.GridController.map.size.y; y++) {
      callBack(this.getCellByLocation(x, y))
    }
  }

  public getCellByPosition(x: number, y: number ): Cell {
    while (x % GSM.Settings.blockSize !== 0) {
      x--
    }
    while (y % GSM.Settings.blockSize !== 0) {
      y--
    }

    return GSM.GridController.gridIterator[GSM.RotationController.currentRotationIndex].find(a => a.position.x === x && a.position.y === y)
  }

  public getCellsWithinRadius(cell: Cell, radius: number): Cell[] {
    const _x = Math.floor(radius / 2)
    const _y = Math.floor(radius / 2)
    const cornerX = cell.location.x - _x
    const cornerY = cell.location.y - _y
    
    const cells = []
    for(let y = 0; y < radius; y++ ) {
      for(let x = 0; x < radius; x++) {
        cells.push(this.getCellByLocation(cornerX + x, cornerY + y))
      }
    }

    return cells
  }

  public getCellByLocation(x: number, y: number): Cell {
    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.northUp) {
      return GSM.GridController.map.grid[`x${x}:y${y}`]
    }
    
    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.westUp) {
      return GSM.GridController.map.grid[`x${y}:y${(GSM.GridController.map.size.x - 1) - x}`]
    }
    
    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.southUp) {
      return GSM.GridController.map.grid[`x${(GSM.GridController.map.size.x - 1) - x}:y${(GSM.GridController.map.size.y - 1) - y}`]
    }
    
    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.eastUp) {
      return GSM.GridController.map.grid[`x${(GSM.GridController.map.size.y - 1) - y}:y${x}`]
    }
    
    return GSM.GridController.gridIterator[GSM.RotationController.currentRotationIndex].find(a => a.location.x === x && a.location.y === y)
  }

  public getCellById(cellId: string): Cell {
    return GSM.GridController.map.grid[cellId]
  }
 
  public createGameMap(size: Size): void {
    GSM.GridController.map = new GameMap(size)
    GSM.GridController.map.id = Math.floor(Math.random() * 100000000).toString()
    this.setupMap()

    Object.keys(RenderingLayers).forEach(key => {
      GSM.GridController.layerIterator.push(RenderingLayers[key])
    })
  }

  public setupMap(): void {   
    this.gridIterator[DEFAULT_ITERATOR] = []
    let iterationOrder = 0
    for (let y = 0; y < GSM.GridController.map.size.y; y++) {
      for (let x = 0; x < GSM.GridController.map.size.x; x++) {
        const cell: Cell = {
          id: `x${x}:y${y}`,
          iterationOrder: iterationOrder++,
          location: { x, y },
          position: { x: x * GSM.Settings.blockSize, y: y * GSM.Settings.blockSize },
        }

        GSM.GridController.map.grid[`x${x}:y${y}`] = cell
        this.gridIterator[DEFAULT_ITERATOR].push(cell)
      }
    }

    this.newGridCreated.next(GSM.GridController.map)
  }
}
