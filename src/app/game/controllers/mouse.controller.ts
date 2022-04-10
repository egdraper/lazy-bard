
import { GSM } from "../game-state-manager.service"
import { Cell, MousePosition, RenderingLayers } from "../models/map"
import { Tile } from "../models/sprite-tile.model"
import { getHoveredOverTerrainTile } from "./utils/selected-sprite-tile"
import { terrainCleanup } from "./utils/terrain-cleanup"

export class MouseController {
  public hoveringPosX: number = 0
  public hoveringPosY: number = 0
  public hoveringCellId: string = ""
  public hoveringCell: Cell = null
  public hoveringSpriteTileCell: Tile
  public hoveringCellAtZAxisIterator: Cell[] = []
  public hoveringCellAtZAxis: {[elevation: number ]: Cell} = {}

  constructor() {
    GSM.EventController.mouseHover.subscribe(this.onMouseHover.bind(this))
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseCellEnter.bind(this))
  }

  private onMouseHover(event: MousePosition): void {
    this.setMouseDetails(event)
    this.selectTerrainTile(event)
  }

  private onMouseCellEnter(): void {
    this.hoveringCellAtZAxisIterator = []
    GSM.GridController.iterateElevations((grid) => {
      const cell =  GSM.GridController.getGridCellByCoordinate(
        this.hoveringPosX, 
        this.hoveringPosY + grid.elevationIndex * GSM.Settings.blockSize,
        grid.elevationIndex
      )
      this.hoveringCellAtZAxis[grid.elevationIndex] = cell 
      this.hoveringCellAtZAxisIterator.push(cell)           
    })
  } 

  private setMouseDetails(event: MousePosition): void {
    this.hoveringPosX = event.posX
    this.hoveringPosY = event.posY
    let elevation = GSM.GameData.map.currentElevationLayerIndex
    
    // if(GSM.GameData.map.currentElevationLayerIndex > 1 || GSM.GameData.map.currentElevationLayerIndex < 0) { 
    //   elevation = GSM.GameData.map.currentElevationLayerIndex
    // }

    const hoveringCell = GSM.GridController.getGridCellByCoordinate(
      this.hoveringPosX,
      this.hoveringPosY + elevation * GSM.Settings.blockSize,
      elevation
    )
    
    if(hoveringCell && this.hoveringCellId !== hoveringCell.id) {
      this.hoveringCellId = hoveringCell.id
      this.hoveringCell = hoveringCell
      GSM.EventController.cellMouseEntered.next(this.hoveringCell)
    }
  }

  private selectTerrainTile(event: MousePosition) {
    const tile = getHoveredOverTerrainTile(event.posX, event.posY)
    if(tile) {
      this.hoveringSpriteTileCell = tile.cell
    } else {
      this.hoveringSpriteTileCell = null
    }
  }
}