import { GSM } from "../game-state-manager.service";
import { Cell, ElevationLayers, GameMap, Grid, Size } from "../models/map";

export class MapController {
  public gameMap: GameMap
  public loadedMaps: {[gameMapId: string]: GameMap} = {}
  public autoGenerateTerrain: boolean

  public iterateAllCells(callBack: (cell: Cell) => void) {
    for (let i = 0; i < this.gameMap.size.height; i++) {
      for (let l = 0; l < this.gameMap.size.width; l++) {
        callBack(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${l}:y${i}`])
      }
    }
  }

  public iterateVisibleCells(callBack: (cell: Cell) => void) {
    for (let i = 0; i < this.gameMap.size.height; i++) {
      for (let l = 0; l < this.gameMap.size.width; l++) {
        callBack(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${l}:y${i}`])
      }
    }
  }

  public getGridCellByCoordinate(x: number, y: number): Cell {
    while (x % GSM.Settings.blockSize !== 0) {
        x--
      }
      while (y % GSM.Settings.blockSize !== 0) {
        y--
      }
      return this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${x / GSM.Settings.blockSize}:y${y / GSM.Settings.blockSize}`]
  }

  public getAllNeighbors(cell: Cell): Cell[] {
    const cells = []
    cells.push(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${cell.x}:y${cell.y - 1}`])
    cells.push(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${cell.x + 1}:y${cell.y}`])
    cells.push(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${cell.x}:y${cell.y + 1}`])
    cells.push(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${cell.x - 1}:y${cell.y}`])
    cells.push(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${cell.x + 1}:y${cell.y - 1}`])
    cells.push(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${cell.x + 1}:y${cell.y + 1}`])
    cells.push(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${cell.x - 1}:y${cell.y + 1}`])
    cells.push(this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${cell.x - 1}:y${cell.y - 1}`])  


    return cells
  } 

  public setupNewMap(size: Size): void {
    this.gameMap = new GameMap(size)
    this.gameMap.grids[ElevationLayers.baseLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.ceilingObjectLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.floorObjectLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.gatewayLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.partitionLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.structureLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.suspendedObjectLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.terrainLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.wallObjectLayer] = new Grid()    
    this.gameMap.id = Math.random().toString()

    for (let i = 0; i < this.gameMap.size.height; i++) {
        for (let l = 0; l < this.gameMap.size.width; l++) {
          this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${l}:y${i}`] = {
              x: l,
              y: i,
              posX: l * GSM.Settings.blockSize,
              posY: i * GSM.Settings.blockSize,
              id: `x${l}:y${i}`,
            };
        }
      }
      this.loadedMaps[this.gameMap.id] = this.gameMap
  }
    private addNeighbors() {
        for (let i = 0; i < this.gameMap.size.height; i++) {
          for (let l = 0; l < this.gameMap.size.width; l++) {
          const cell = this.gameMap.grids[ElevationLayers.baseLayer].cells[`x${l}:y${i}`];
          cell.neighbors = [];
          cell.neighbors[5] = this.gameMap[`x${l + 1}:y${i + 1}`];
          cell.neighbors[0] = this.gameMap[`x${l}:y${i - 1}`];
          cell.neighbors[2] = this.gameMap[`x${l}:y${i + 1}`];
          cell.neighbors[4] = this.gameMap[`x${l + 1}:y${i - 1}`];
          cell.neighbors[1] = this.gameMap[`x${l + 1}:y${i}`];
          cell.neighbors[6] = this.gameMap[`x${l - 1}:y${i + 1}`];
          cell.neighbors[3] = this.gameMap[`x${l - 1}:y${i}`];
          cell.neighbors[7] = this.gameMap[`x${l - 1}:y${i - 1}`];
        }
      }
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