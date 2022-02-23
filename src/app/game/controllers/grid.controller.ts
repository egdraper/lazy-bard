import { GSM } from "../game-state-manager.service";
import { Cell, Grid, Size } from "../models/map";

export class GridController {
  public grid: Grid
  public loadedGrids: {[gridId: string]: Grid} = {}
  public autoGenerateTerrain: boolean

  public iterateAllCells(callBack: (cell: Cell) => void) {
    for (let i = 0; i < this.grid.size.height; i++) {
      for (let l = 0; l < this.grid.size.width; l++) {
        callBack(this.grid.cells[`x${l}:y${i}`])
      }
    }
  }

  public iterateVisibleCells(callBack: (cell: Cell) => void) {
    for (let i = 0; i < this.grid.size.height; i++) {
      for (let l = 0; l < this.grid.size.width; l++) {
        callBack(this.grid.cells[`x${l}:y${i}`])
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
      return this.grid.cells[`x${x / GSM.Settings.blockSize}:y${y / GSM.Settings.blockSize}`]
  }

  public setupGrid(size: Size): void {
    this.grid = new Grid(size)
    this.grid.id = Math.random().toString()

    for (let i = 0; i < this.grid.size.height; i++) {
        for (let l = 0; l < this.grid.size.width; l++) {
          this.grid.cells[`x${l}:y${i}`] = {
              x: l,
              y: i,
              posX: l * GSM.Settings.blockSize,
              posY: i * GSM.Settings.blockSize,
              id: `x${l}:y${i}`,
            };
        }
      }
    
  
    this.loadedGrids[this.grid.id] = this.grid
  }
    // private addNeighbors() {
    //   for (let i = 0; i < this.height; i++) {
    //     for (let l = 0; l < this.width; l++) {
    //       const cell = this.grid[`x${l}:y${i}`];
    //       cell.neighbors = [];
    //       cell.neighbors[5] = this.grid[`x${l + 1}:y${i + 1}`];
    //       cell.neighbors[0] = this.grid[`x${l}:y${i - 1}`];
    //       cell.neighbors[2] = this.grid[`x${l}:y${i + 1}`];
    //       cell.neighbors[4] = this.grid[`x${l + 1}:y${i - 1}`];
    //       cell.neighbors[1] = this.grid[`x${l + 1}:y${i}`];
    //       cell.neighbors[6] = this.grid[`x${l - 1}:y${i + 1}`];
    //       cell.neighbors[3] = this.grid[`x${l - 1}:y${i}`];
    //       cell.neighbors[7] = this.grid[`x${l - 1}:y${i - 1}`];
    //     }
    //   }
    // }
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