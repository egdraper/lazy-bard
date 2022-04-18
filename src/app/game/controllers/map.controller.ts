import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import { Cell, RenderingLayers, GameMap, Grid, Size } from '../models/map'
import { TerrainTile } from '../models/sprite-tile.model'

export class MapController {
  public newGridCreated: Subject<Grid> = new Subject<Grid>()  
  public layerIterator: RenderingLayers[] = []
  private gridIterator:  Cell[] = []

  public iterateCells(callBack: (cell: Cell) => void): void {
    this.gridIterator.forEach((cell) => {
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
    return GSM.GameData.map.grid[`x${x / GSM.Settings.blockSize}:y${y / GSM.Settings.blockSize}`]
  }

  public getCellByLocation(x: number, y: number): Cell {
    return GSM.GameData.map.grid[`x${x}:y${y}`]
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
    this.gridIterator = []
    for (let i = 0; i < GSM.GameData.map.size.y; i++) {
      for (let l = 0; l < GSM.GameData.map.size.x; l++) {
        // creates cell
        const cell: Cell = {
          id: `x${l}:y${i}`,
          location: { x: l, y: i},
          obstructions: {},
          position: { x: l * GSM.Settings.blockSize, y: (i) * GSM.Settings.blockSize},
        }

        // adds cell to grid at layer
        GSM.GameData.map.grid[`x${l}:y${i}`] = cell
        this.gridIterator.push(cell)
      }
    }

    this.newGridCreated.next(GSM.GameData.map)
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
