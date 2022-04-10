import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import {Cell, RenderingLayers, GameMap, Grid, Size } from '../models/map'

export class MapController {
  public newGridCreated: Subject<Grid> = new Subject<Grid>()  
  public layerIterator: RenderingLayers[] = []
  private gridIterator: {[elevationIndex: number]: Cell[] } = []

  public iterateCells(elevationIndex: number, callBack: (cell: Cell) => void): void {
    this.gridIterator[elevationIndex].forEach((cell) => {
      callBack(cell)
    })
  }

  public iterateElevations(callBack: (elevation: Grid) => void): void {
    const elevations = Object.keys(GSM.GameData.map.elevations).map(key => GSM.GameData.map.elevations[key])
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
    return GSM.GameData.map.elevations[elevation].cells[
      `x${x / GSM.Settings.blockSize}:y${y / GSM.Settings.blockSize}`
    ]
  }

  public getCell(x: number, y: number, elevationLayer: number): Cell {
    return GSM.GameData.map.elevations[elevationLayer].cells[`x${x}:y${y}`]
  }

  public getCellAtLayer(cellId: string, layer: number): Cell {
    return GSM.GameData.map.elevations[layer].cells[cellId]
  }
 
  public createGameMap(size: Size): void {
    GSM.GameData.map = new GameMap(size)
    GSM.GameData.map.id = Math.random().toString()
    this.setupMap(-1)
    this.setupMap(0)
    this.setupMap(1)
    this.setupMap(2)
    GSM.GameData.map.topMostElevationLayerIndex = 2
    GSM.GameData.map.currentElevationLayerIndex = 0

    Object.keys(RenderingLayers).forEach(key => {
      GSM.GridController.layerIterator.push(RenderingLayers[key])
    })
  }

  public setupMap(elevation: number): void {   
    for (let i = 0; i < GSM.GameData.map.size.y; i++) {
      for (let l = 0; l < GSM.GameData.map.size.x; l++) {
        if(!GSM.GameData.map.elevations[elevation]) {
          GSM.GameData.map.elevations[elevation] = new Grid()
          GSM.GameData.map.elevations[elevation].elevationIndex = elevation
        }

        if(!this.gridIterator[elevation]) {
          this.gridIterator[elevation] = []
        }

           // creates cell
        const cell: Cell = {
          elevationIndex: elevation,
          location: { x: l, y: i - elevation, z: elevation},
          position: { x: l * GSM.Settings.blockSize, y: (i - elevation) * GSM.Settings.blockSize, z: elevation * GSM.Settings.blockSize},
          id: `x${l}:y${i - elevation}`,
          renderers: [],
          terrainTiles: {}
        }

        // adds cell to grid at layer
        GSM.GameData.map.elevations[elevation].cells[`x${l}:y${i - elevation}`] = cell
        this.gridIterator[elevation].push(cell)
      }
    }

    this.newGridCreated.next(GSM.GameData.map.elevations[elevation])
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
