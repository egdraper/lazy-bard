import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import {Cell, RenderingLayers, GameMap, Grid, NeighborLocation, Size } from '../models/map'
import { GeneralAction } from '../models/settings'

export class MapController {
  public gameMap: GameMap
  public loadedMaps: { [gameMapId: string]: GameMap } = {}
  public autoGenerateTerrain: boolean
  public currentElevationLayerIndex: number = 0
  public baseElevationLayerIndex: number = 0
  public topMostElevationLayerIndex: number = 0
  public bottomMostElevationLayerIndex: number = 0
  public newGridCreated: Subject<Grid> = new Subject<Grid>()
  
  public layerIterator: RenderingLayers[] = []
  private gridIterator: {[elevationIndex: number]: Cell[] } = []

  constructor() {
    GSM.EventController.generalActionFire.subscribe(this.onElevationChange.bind(this))
  }  

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

  public getNeighbor(
    cell: Cell,
    neighborLocation: NeighborLocation,
    layer: number
  ): Cell {
    switch (neighborLocation) {
      case NeighborLocation.Top:
        return this.gameMap.elevations[layer].cells[
          `x${cell.x}:y${cell.y - 1}`
        ]
      case NeighborLocation.Right:
        return this.gameMap.elevations[layer].cells[
          `x${cell.x + 1}:y${cell.y}`
        ]
      case NeighborLocation.Bottom:
        return this.gameMap.elevations[layer].cells[
          `x${cell.x}:y${cell.y + 1}`
        ]
      case NeighborLocation.Left:
        return this.gameMap.elevations[layer].cells[
          `x${cell.x - 1}:y${cell.y}`
        ]
      case NeighborLocation.TopRight:
        return this.gameMap.elevations[layer].cells[
          `x${cell.x + 1}:y${cell.y - 1}`
        ]
      case NeighborLocation.BottomRight:
        return this.gameMap.elevations[layer].cells[
          `x${cell.x + 1}:y${cell.y + 1}`
        ]
      case NeighborLocation.BottomLeft:
        return this.gameMap.elevations[layer].cells[
          `x${cell.x - 1}:y${cell.y + 1}`
        ]
      case NeighborLocation.TopLeft:
        return this.gameMap.elevations[layer].cells[
          `x${cell.x - 1}:y${cell.y - 1}`
        ]
    }
  }

  public getAllNeighbors(cell: Cell, elevationIndex: number): Cell[] {
    const cells = []
    cells.push(this.getNeighbor(cell, NeighborLocation.Top, elevationIndex))
    cells.push(this.getNeighbor(cell, NeighborLocation.Right, elevationIndex))
    cells.push(this.getNeighbor(cell, NeighborLocation.Bottom, elevationIndex))
    cells.push(this.getNeighbor(cell, NeighborLocation.Left, elevationIndex))
    cells.push(this.getNeighbor(cell, NeighborLocation.TopRight, elevationIndex))
    cells.push(this.getNeighbor(cell, NeighborLocation.BottomRight, elevationIndex))
    cells.push(this.getNeighbor(cell, NeighborLocation.BottomLeft, elevationIndex))
    cells.push(this.getNeighbor(cell, NeighborLocation.TopLeft, elevationIndex))
    return cells
  }

  public createGameMap(size: Size): void {
    this.gameMap = new GameMap(size)
    this.gameMap.id = Math.random().toString()
    this.setupMap(0)
    this.setupMap(1)
    this.topMostElevationLayerIndex = 1
    this.currentElevationLayerIndex = 1

    Object.keys(RenderingLayers).forEach(key => {
      GSM.GridController.layerIterator.push(RenderingLayers[key])
    })
  }

  private onElevationChange(event: GeneralAction<any>) {
    if(!this.gameMap) { return }
   
    if(event.name === "addElevationUp") {
      if(this.currentElevationLayerIndex === this.topMostElevationLayerIndex) {
        this.setupMap(++this.topMostElevationLayerIndex)
        this.currentElevationLayerIndex = this.topMostElevationLayerIndex
        return
      } else {
        this.currentElevationLayerIndex++
      }
    }

    if(event.name === "addElevationDown") {
      if(this.currentElevationLayerIndex === this.bottomMostElevationLayerIndex) {
        this.setupMap(--this.bottomMostElevationLayerIndex)
        this.currentElevationLayerIndex = this.bottomMostElevationLayerIndex
        return
      } else {
        this.currentElevationLayerIndex--
      }
    }
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
