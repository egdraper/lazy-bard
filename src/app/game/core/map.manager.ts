import { Subject } from 'rxjs'
import { GSM } from '../game-state-manager.service'
import { Cell, RenderingLayers, GameMap, Grid, Size, MapRotationIndex } from '../models/map'
import { BaseTexture } from './utils/base-texture.generator'
import { TerrainTexture } from './utils/terrain-texture'

const DEFAULT_ITERATOR = MapRotationIndex.northUp

export class MapManager {
  public map: GameMap
  public newGridCreated: Subject<Grid> = new Subject<Grid>()  
  public layerIterator: RenderingLayers[] = []
  public gridIterator: {[rotation: number]: Cell[]} = {}

  public iterateCells(callBack: (cell: Cell) => void): void {
    this.gridIterator[GSM.RotationManager.currentRotationIndex].forEach((cell) => {
      callBack(cell)
    })
  }

  public iterateYCells(x: number, callBack: (cell: Cell) => void): void {
    for(let y = 0; y < GSM.GridManager.map.size.y; y++) {
      callBack(this.getCellByLocation(x, y))
    }
  }
  public iterateYCellsFrom(startY: number, x: number, callBack: (cell: Cell) => void): void {
    for(let y = startY; y < GSM.GridManager.map.size.y; y++) {
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

    return GSM.GridManager.gridIterator[GSM.RotationManager.currentRotationIndex].find(a => a.position.x === x && a.position.y === y)
  }

  public getCellsWithinRadius(cell: Cell, radius: number): Cell[] {
    const _x = Math.floor(radius / 2)
    const _y = Math.floor(radius / 2)
    const cornerX = cell.location.x - _x
    const cornerY = cell.location.y - _y
    
    const cells = []
    for(let y = 0; y < radius; y++ ) {
      for(let x = 0; x < radius; x++) {
        cells.push(this.getCellByLocation(cornerX + x, cornerY + y))
      }
    }

    return cells
  }

  public getCellByLocation(x: number, y: number): Cell {
    if(GSM.RotationManager.currentRotationIndex === MapRotationIndex.northUp) {
      return GSM.GridManager.map.grid[`x${x}:y${y}`]
    }
    
    if(GSM.RotationManager.currentRotationIndex === MapRotationIndex.westUp) {
      return GSM.GridManager.map.grid[`x${y}:y${(GSM.GridManager.map.size.x - 1) - x}`]
    }
    
    if(GSM.RotationManager.currentRotationIndex === MapRotationIndex.southUp) {
      return GSM.GridManager.map.grid[`x${(GSM.GridManager.map.size.x - 1) - x}:y${(GSM.GridManager.map.size.y - 1) - y}`]
    }
    
    if(GSM.RotationManager.currentRotationIndex === MapRotationIndex.eastUp) {
      return GSM.GridManager.map.grid[`x${(GSM.GridManager.map.size.y - 1) - y}:y${x}`]
    }
    
    return GSM.GridManager.gridIterator[GSM.RotationManager.currentRotationIndex].find(a => a.location.x === x && a.location.y === y)
  }

  public getCellById(cellId: string): Cell {
    return GSM.GridManager.map.grid[cellId]
  }

  public getCellAtZAxis(cellOver: Cell, zIndex: number ) {
    return GSM.GridManager.getCellByLocation(cellOver.location.x, cellOver.location.y + zIndex)
  }
 
  public createGameMap(size: Size, texture: string): void {
    GSM.GridManager.map = new GameMap(size)
    GSM.GridManager.map.id = Math.floor(Math.random() * 100000000).toString()
    this.setupMap()
    BaseTexture.addBackgroundAssets(texture, this.gridIterator[GSM.RotationManager.currentRotationIndex])
    TerrainTexture.setupImages()

    Object.keys(RenderingLayers).forEach(key => {
      GSM.GridManager.layerIterator.push(RenderingLayers[key])
    })
  }

  public setupMap(): void {   
    this.gridIterator[DEFAULT_ITERATOR] = []
    let iterationOrder = 0
    for (let y = 0; y < GSM.GridManager.map.size.y; y++) {
      for (let x = 0; x < GSM.GridManager.map.size.x; x++) {
        const cell: Cell = {
          id: `x${x}:y${y}`,
          iterationOrder: iterationOrder++,
          location: { x, y },
          position: { x: x * GSM.Settings.blockSize, y: y * GSM.Settings.blockSize },
        }

        GSM.GridManager.map.grid[`x${x}:y${y}`] = cell
        this.gridIterator[DEFAULT_ITERATOR].push(cell)
      }
    }

    this.newGridCreated.next(GSM.GridManager.map)
  }
}
