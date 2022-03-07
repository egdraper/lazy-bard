import { GSM } from '../game-state-manager.service';
import {
  Cell,
  ElevationLayers,
  GameMap, Grid, NeighborLocation,
  Size
} from '../models/map';

export class MapController {
  public gameMap: GameMap;
  public loadedMaps: { [gameMapId: string]: GameMap } = {};
  public autoGenerateTerrain: boolean;
  private gridIterator: {[ layer: string ]: Cell[] } = {};

  public iterateLayerCell(layer: string, callBack: (cell: Cell) => void): void {
    this.gridIterator[layer].forEach((cell) => {
      callBack(cell);
    })
  }

  public iterateAllCells(callBack: (cell: Cell) => void) {
    GSM.LayerController.layerAddOns.forEach(layer => {
      this.gridIterator[layer.layerName].forEach((cell) => {
        callBack(cell);
      });
    })
  }

  public iterateAllVisibleCells(callBack: (cell: Cell) => void) {
    GSM.LayerController.layerAddOns.forEach(layer => {
      this.gridIterator[layer.layerName].forEach((cell) => {
        callBack(cell);
      });
    })
  }

  public iterateAllVisibleLayerCells(layer: string, callBack: (cell: Cell) => void) {
    this.gridIterator[layer].forEach((cell) => {
      callBack(cell);
    })
  }

  public getGridCellByCoordinate(
    x: number,
    y: number,
    layer: ElevationLayers
  ): Cell {
    while (x % GSM.Settings.blockSize !== 0) {
      x--;
    }
    while (y % GSM.Settings.blockSize !== 0) {
      y--;
    }
    return this.gameMap.grids[layer].cells[
      `x${x / GSM.Settings.blockSize}:y${y / GSM.Settings.blockSize}`
    ];
  }

  public getCell(x: number, y: number, layer: ElevationLayers): Cell {
    return this.gameMap.grids[layer].cells[`x${x}:y${y}`];
  }

  public getLayeredCells(baseCell: Cell): Cell[] {
    const cell = []
    GSM.LayerController.layerAddOns.forEach(layer => {
      cell.push(this.getCellAtLayer(baseCell.id, layer.layerName))
    })
    return cell
  }

  public getCellAtLayer(cellId: string, layer: ElevationLayers): Cell {
    return this.gameMap.grids[layer].cells[cellId];
  }

  public getNeighbor(
    cell: Cell,
    neighborLocation: NeighborLocation,
    layer: ElevationLayers
  ): Cell {
    switch (neighborLocation) {
      case NeighborLocation.Top:
        return this.gameMap.grids[layer].cells[`x${cell.x}:y${cell.y - 1}`];
      case NeighborLocation.Right:
        return this.gameMap.grids[layer].cells[`x${cell.x + 1}:y${cell.y}`];
      case NeighborLocation.Bottom:
        return this.gameMap.grids[layer].cells[`x${cell.x}:y${cell.y + 1}`];
      case NeighborLocation.Left:
        return this.gameMap.grids[layer].cells[`x${cell.x - 1}:y${cell.y}`];
      case NeighborLocation.TopRight:
        return this.gameMap.grids[layer].cells[`x${cell.x + 1}:y${cell.y - 1}`];
      case NeighborLocation.BottomRight:
        return this.gameMap.grids[layer].cells[`x${cell.x + 1}:y${cell.y + 1}`];
      case NeighborLocation.BottomLeft:
        return this.gameMap.grids[layer].cells[`x${cell.x - 1}:y${cell.y + 1}`];
      case NeighborLocation.TopLeft:
        return this.gameMap.grids[layer].cells[`x${cell.x - 1}:y${cell.y - 1}`];
    }
  }

  public getAllNeighbors(cell: Cell, layer: ElevationLayers): Cell[] {
    const cells = [];
    cells.push(this.getNeighbor(cell, NeighborLocation.Top, layer));
    cells.push(this.getNeighbor(cell, NeighborLocation.Right, layer));
    cells.push(this.getNeighbor(cell, NeighborLocation.Bottom, layer));
    cells.push(this.getNeighbor(cell, NeighborLocation.Left, layer));
    cells.push(this.getNeighbor(cell, NeighborLocation.TopRight, layer));
    cells.push(this.getNeighbor(cell, NeighborLocation.BottomRight, layer));
    cells.push(this.getNeighbor(cell, NeighborLocation.BottomLeft, layer));
    cells.push(this.getNeighbor(cell, NeighborLocation.TopLeft, layer));
    return cells;
  }

  public createGameMap(size: Size): void {
    this.gameMap = new GameMap(size)
    this.gameMap.id = Math.random().toString();
  }

  public setupMap(): void {
    for (let i = 0; i < this.gameMap.size.height; i++) {
      for (let l = 0; l < this.gameMap.size.width; l++) {
        const layers = GSM.LayerController.layerAddOns
        layers.forEach((layer) => {
          // Creates grid at layer if doesn't exist
          if(!this.gameMap.grids[layer.layerName]) {
            this.gameMap.grids[layer.layerName] = new Grid()
          }
          
          // creates iterator at layer if doesn't exist
          if(!this.gridIterator[layer.layerName]) {
            this.gridIterator[layer.layerName] = []
          }
          
          // creates cell
          const cell = {
            x: l,
            y: i,
            posX: l * GSM.Settings.blockSize,
            posY: i * GSM.Settings.blockSize,
            id: `x${l}:y${i}`,
            painters: layer.getPainters(),
          };

          // adds cell to grid at layer
          this.gameMap.grids[layer.layerName].cells[`x${l}:y${i}`] = cell;
          this.gridIterator[layer.layerName].push(cell);
        });
      }
    }
    this.loadedMaps[this.gameMap.id] = this.gameMap;
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
