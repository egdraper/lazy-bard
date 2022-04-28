import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import { Cell, RenderingLayers, GameMap, Grid, Size } from '../models/map'
import { TerrainTile } from '../models/sprite-tile.model'

export class MapController {
  public newGridCreated: Subject<Grid> = new Subject<Grid>()  
  public layerIterator: RenderingLayers[] = []
  public gridIterator: {[rotation: number]: Cell[]} = {}

  public iterateCells(callBack: (cell: Cell) => void): void {
    this.gridIterator[GSM.RotationController.currentRotation].forEach((cell) => {
      callBack(cell)
    })
  }

  public iterateYCells(x: number, callBack: (cell: Cell) => void): void {
    for(let y = 0; y < GSM.GameData.map.size.y; y++) {
      callBack(this.getCellByLocation(x, y))
    }
  }

  public getCellByPosition(
    x: number,
    y: number
  ): Cell {
    while (x % GSM.Settings.blockSize !== 0) {
      x--
    }
    while (y % GSM.Settings.blockSize !== 0) {
      y--
    }
    return GSM.GridController.gridIterator[GSM.RotationController.currentRotation].find(a => a.position.x === x && a.position.y === y)
    // return GSM.GameData.map.grid[`x${x / GSM.Settings.blockSize}:y${y / GSM.Settings.blockSize}`]
  }

  public getCellByLocation(x: number, y: number): Cell {
    return GSM.GridController.gridIterator[GSM.RotationController.currentRotation].find(a => a.location.x === x && a.location.y === y)
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
    this.gridIterator[0] = []
    this.gridIterator[1] = []
    this.gridIterator[2] = []
    this.gridIterator[3] = []
    for (let y = 0; y < GSM.GameData.map.size.y; y++) {
      for (let x = 0; x < GSM.GameData.map.size.x; x++) {
        // creates cell
        const cell: Cell = {
          id: `x${x}:y${y}`,
          location: { x, y},
          obstructions: {},
          assets: {},
          position: { x: x * GSM.Settings.blockSize, y: y * GSM.Settings.blockSize},
        }

        // adds cell to grid at layer
        GSM.GameData.map.grid[`x${x}:y${y}`] = cell
        this.gridIterator[0].push(cell)
      }
    }

    this.newGridCreated.next(GSM.GameData.map)
  
    for (let x = 0; x < GSM.GameData.map.size.x; x++) {
      for (let y = GSM.GameData.map.size.y - 1; y >= 0;  y--) {
        this.gridIterator[1].push(this.getCellById(`x${x}:y${y}`))
      }
    }

    for (let y = GSM.GameData.map.size.y - 1; y >= 0;  y--) {
      for (let x = GSM.GameData.map.size.x - 1; x >= 0; x--) {
        this.gridIterator[2].push(this.getCellById(`x${x}:y${y}`))
      }
    }

    for (let x = GSM.GameData.map.size.x - 1; x >= 0; x--) {
      for (let y = 0; y < GSM.GameData.map.size.y; y++) {
        this.gridIterator[3].push(this.getCellById(`x${x}:y${y}`))
      }
    }
    // for (let x = GSM.GameData.map.size.x - 1; x >= 0; x--) {
    //   for (let y = 0; y < GSM.GameData.map.size.y; y++) {
    //     this.gridIterator[2].push(this.getCellById(`x${x}:y${y}`))r
    //   }
    // }

    // for (let y = GSM.GameData.map.size.y - 1; y >= 0;  y--) {
    //   for (let x = GSM.GameData.map.size.x - 1; x >= 0; x--) {
    //     this.gridIterator[1].push(this.getCellById(`x${x}:y${y}`))
    //   }
    // }

    // for (let x = 0; x < GSM.GameData.map.size.x; x++) {
    //   for (let y = GSM.GameData.map.size.y - 1; y >= 0;  y--) {
    //     this.gridIterator[3].push(this.getCellById(`x${x}:y${y}`))
    //   }
    // }
  }

}

// public maps: {[gridId: string]: GameMap} = {}
// public mapIds: string[] = []
// public activeMap: GameMap
// public hoveringCell: Cell

// private index = 0

// public switchGrid(gridId: string): GameMap {
//   if(GSM.Map.activeMap) {
//     GSM.Map.activeMap.changePageXOffset = GSM.Canvas.canvasViewPortOffsetX
//     GSM.Map.activeMap.changePageYOffset = GSM.Canvas.canvasViewPortOffsetY
//   }

//   this.activeMap = this.maps[gridId]

//   GSM.Canvas.resetViewport()

//   if((GSM.Map.activeMap.changePageXOffset || GSM.Map.activeMap.changePageXOffset === 0) || (GSM.Map.activeMap.changePageXOffset || GSM.Map.activeMap.changePageYOffset === 0)) {
//     GSM.Canvas.pageChangeAdjust(this.activeMap)
//   }

//   return this.activeMap
// }

// public createNewGrid(width: number, height: number, defaultMapSettings: DefaultMapSettings, autoSwitchMap: boolean = false): GameMap {
//    // Grid Setup
//   const newMap = new GameMap(width, height, defaultMapSettings)

//   newMap.largeImage = new LargeCanvasImage(GSM.Canvas.drawingCanvas, GSM.Canvas.drawingCTX)
//   newMap.id = this.index.toString()
//   this.index++

//   // Set Grid
//   this.mapIds.push(newMap.id)
//   this.maps[newMap.id] = newMap
//   if(autoSwitchMap) {
//     GSM.Map.switchGrid(newMap.id)
//     GSM.Canvas.resetViewport()
//   }
//   return newMap
// }
// }
