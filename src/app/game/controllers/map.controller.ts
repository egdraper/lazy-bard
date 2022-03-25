import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import {Cell, RenderingLayers, GameMap, Grid, Size } from '../models/map'

export class MapController {
  public gameMap: GameMap
  public loadedMaps: { [gameMapId: string]: GameMap } = {}
  public newGridCreated: Subject<Grid> = new Subject<Grid>()
  
  public layerIterator: RenderingLayers[] = []
  private gridIterator: {[elevationIndex: number]: Cell[] } = []

  public iterateCells(elevationIndex: number, callBack: (cell: Cell) => void): void {
    this.gridIterator[elevationIndex].forEach((cell) => {
      callBack(cell)
    })
  }

  public iterateElevations(callBack: (elevation: Grid) => void): void {
    const elevations = Object.keys(this.gameMap.elevations).map(key => GSM.GridController.gameMap.elevations[key])
    elevations.sort((a, b) => a.elevationIndex - b.elevationIndex)
    elevations.forEach(elevation => {
      callBack(elevation)
    })
  }

  public getGridCellByCoordinate(
    x: number,
    y: number,
    elevation: number
  ): Cell {
    while (x % GSM.Settings.blockSize !== 0) {
      x--
    }
    while (y % GSM.Settings.blockSize !== 0) {
      y--
    }
    return this.gameMap.elevations[elevation].cells[
      `x${x / GSM.Settings.blockSize}:y${y / GSM.Settings.blockSize}`
    ]
  }

  public getCell(x: number, y: number, elevationLayer: number): Cell {
    return this.gameMap.elevations[elevationLayer].cells[`x${x}:y${y}`]
  }

  public getCellAtLayer(cellId: string, layer: number): Cell {
    return this.gameMap.elevations[layer].cells[cellId]
  }
 
  public createGameMap(size: Size): void {
    this.gameMap = new GameMap(size)
    this.gameMap.id = Math.random().toString()
    this.setupMap(0)
    this.setupMap(1)
    GSM.GridController.gameMap.topMostElevationLayerIndex = 1
    GSM.GridController.gameMap.currentElevationLayerIndex = 1

    Object.keys(RenderingLayers).forEach(key => {
      GSM.GridController.layerIterator.push(RenderingLayers[key])
    })
  }

  public setupMap(elevation: number): void {   
    for (let i = 0; i < this.gameMap.size.height; i++) {
      for (let l = 0; l < this.gameMap.size.width; l++) {
        if(!this.gameMap.elevations[elevation]) {
          this.gameMap.elevations[elevation] = new Grid()
          this.gameMap.elevations[elevation].elevationIndex = elevation
        }

        if(!this.gridIterator[elevation]) {
          this.gridIterator[elevation] = []
        }

        // creates cell
        const cell = {
          x: l,
          y: i,
          posX: l * GSM.Settings.blockSize,
          posY: i * GSM.Settings.blockSize,
          id: `x${l}:y${i}`,
          renderers: [],
          spriteTiles: {}
        }

        // adds cell to grid at layer
        this.gameMap.elevations[elevation].cells[`x${l}:y${i}`] = cell
        this.gridIterator[elevation].push(cell)
      }
    }

    this.newGridCreated.next(this.gameMap.elevations[elevation])
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
