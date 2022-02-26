import { GSM } from "../game-state-manager.service";
import { Cell, ElevationLayers, GameMap, Grid, NeighborLocation, Size, TerrainLayerGrid } from "../models/map";

export class MapController {
  public gameMap: GameMap
  public loadedMaps: {[gameMapId: string]: GameMap} = {}
  public autoGenerateTerrain: boolean

  public iterateAllCells(callBack: (cell: Cell) => void) {
    for (let i = 0; i < this.gameMap.size.height; i++) {
      for (let l = 0; l < this.gameMap.size.width; l++) {
        callBack(this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${l}:y${i}`])
      }
    }
  }

  public iterateVisibleCells(callBack: (cell: Cell) => void) {
    for (let i = 0; i < this.gameMap.size.height; i++) {
      for (let l = 0; l < this.gameMap.size.width; l++) {
        callBack(this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${l}:y${i}`])
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
    return this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${x / GSM.Settings.blockSize}:y${y / GSM.Settings.blockSize}`]
  }

  public getNeighbor(cell: Cell, neighborLocation: NeighborLocation): Cell {
    switch(neighborLocation) {
      case NeighborLocation.Top:
        return this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${cell.x}:y${cell.y - 1}`]
      case NeighborLocation.Right:
        return this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${cell.x + 1}:y${cell.y}`]
      case NeighborLocation.Bottom:
        return this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${cell.x}:y${cell.y + 1}`]
      case NeighborLocation.Left:
        return this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${cell.x - 1}:y${cell.y}`]
      case NeighborLocation.TopRight:
        return this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${cell.x + 1}:y${cell.y - 1}`]
      case NeighborLocation.BottomRight:
        return this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${cell.x + 1}:y${cell.y + 1}`]
      case NeighborLocation.BottomLeft:
        return this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${cell.x - 1}:y${cell.y + 1}`]
      case NeighborLocation.TopLeft:
        return this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${cell.x - 1}:y${cell.y - 1}`]  
    }
  }

  public getAllNeighbors(cell: Cell): Cell[] {
    const cells = []
    cells.push(this.getNeighbor(cell, NeighborLocation.Top))
    cells.push(this.getNeighbor(cell, NeighborLocation.Right))
    cells.push(this.getNeighbor(cell, NeighborLocation.Bottom))
    cells.push(this.getNeighbor(cell, NeighborLocation.Left))
    cells.push(this.getNeighbor(cell, NeighborLocation.TopRight))
    cells.push(this.getNeighbor(cell, NeighborLocation.BottomRight))
    cells.push(this.getNeighbor(cell, NeighborLocation.BottomLeft))
    cells.push(this.getNeighbor(cell, NeighborLocation.TopLeft))
    return cells
  } 

  public setupNewMap(size: Size): void {
    this.gameMap = new GameMap(size)
    this.gameMap.grids[ElevationLayers.BaseLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.CeilingObjectLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.FloorObjectLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.GatewayLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.PartitionLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.StructureLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.SuspendedObjectLayer] = new Grid()
    this.gameMap.grids[ElevationLayers.TerrainLayer] = new TerrainLayerGrid()
    this.gameMap.grids[ElevationLayers.WallObjectLayer] = new Grid()    
    this.gameMap.id = Math.random().toString()

    for (let i = 0; i < this.gameMap.size.height; i++) {
        for (let l = 0; l < this.gameMap.size.width; l++) {
          this.gameMap.grids[ElevationLayers.BaseLayer].cells[`x${l}:y${i}`] = {
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