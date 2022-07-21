import { ThisReceiver } from '@angular/compiler'
import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import { Cell, RenderingLayers, GameMap, Grid, Size, MapRotationIndex } from '../models/map'

const DEFAULT_ITERATOR = MapRotationIndex.northUp

export class MapController {
  public newGridCreated: Subject<Grid> = new Subject<Grid>()  
  public layerIterator: RenderingLayers[] = []
  public gridIterator: {[rotation: number]: Cell[]} = {}

  public iterateCells(callBack: (cell: Cell) => void): void {
    this.gridIterator[GSM.RotationController.currentRotationIndex].forEach((cell) => {
      callBack(cell)
    })
  }

  public iterateYCells(x: number, callBack: (cell: Cell) => void): void {
    for(let y = 0; y < GSM.GameData.map.size.y; y++) {
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

  public getCellByLocation(x: number, y: number): Cell {
    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.northUp) {
      return GSM.GameData.map.grid[`x${x}:y${y}`]
    }
    
    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.westUp) {
      return GSM.GameData.map.grid[`x${y}:y${(GSM.GameData.map.size.x - 1) - x}`]
    }
    
    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.southUp) {
      return GSM.GameData.map.grid[`x${(GSM.GameData.map.size.x - 1) - x}:y${(GSM.GameData.map.size.y - 1) - y}`]
    }
    
    if(GSM.RotationController.currentRotationIndex === MapRotationIndex.eastUp) {
      return GSM.GameData.map.grid[`x${(GSM.GameData.map.size.y - 1) - y}:y${x}`]
    }
    
    return GSM.GridController.gridIterator[GSM.RotationController.currentRotationIndex].find(a => a.location.x === x && a.location.y === y)
  }

  public getCellById(cellId: string): Cell {
    return GSM.GameData.map.grid[cellId]
  }
 
  public createGameMap(size: Size): void {
    GSM.GameData.map = new GameMap(size)
    GSM.GameData.map.id = Math.floor(Math.random() * 100000000).toString()
    this.setupMap()

    Object.keys(RenderingLayers).forEach(key => {
      GSM.GridController.layerIterator.push(RenderingLayers[key])
    })
  }

  public setupMap(): void {   
    this.gridIterator[DEFAULT_ITERATOR] = []
    let iterationOrder = 0
    for (let y = 0; y < GSM.GameData.map.size.y; y++) {
      for (let x = 0; x < GSM.GameData.map.size.x; x++) {
        const cell: Cell = {
          id: `x${x}:y${y}`,
          iterationOrder: iterationOrder++,
          location: { x, y },
          position: { x: x * GSM.Settings.blockSize, y: y * GSM.Settings.blockSize },
        }

        GSM.GameData.map.grid[`x${x}:y${y}`] = cell
        this.gridIterator[DEFAULT_ITERATOR].push(cell)
      }
    }

    this.newGridCreated.next(GSM.GameData.map)
  }
}
