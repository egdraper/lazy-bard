
import { GSM } from "../game-state-manager.service"
import { Cell, MousePosition } from "../models/map"
import { GridAsset } from "../models/sprite-tile.model"
import { getHoveredOverGridAsset } from "./utils/selected-sprite-tile"

export class MouseController {
  public hoveringPosX: number = 0
  public hoveringPosY: number = 0
  public hoveringCellId: string = ""
  public hoveringCell: Cell = null
  public hoveringGridAsset: GridAsset
  public hoveringCellAtZAxisIterator: Cell[] = []
  public hoveringCellAtZAxis: {[elevation: number ]: Cell} = {}
  public hoveringZAxis: number = 0
  public hoveringZAxisAtMouseDown: number = 0
  public hoveringCellZAxisAtMouseDown: GridAsset

  constructor() {
    GSM.EventController.mouseHover.subscribe(this.onMouseHover.bind(this))
    GSM.EventController.cellMouseEntered.subscribe(this.onMouseCellEnter.bind(this))
    GSM.EventController.mouseDown.subscribe(this.onMouseDown.bind(this))
    GSM.EventController.mouseUp.subscribe(this.onMouseUp.bind(this))
  }

  private onMouseDown(event: MousePosition): void {
    const gridAsset = this.selectTerrainTile(this.hoveringCell)
    this.hoveringZAxisAtMouseDown = gridAsset?.zIndex || 0
    this.hoveringCellZAxisAtMouseDown = gridAsset
    GSM.EventController.cellMouseEntered.next(this.hoveringCell)
  }

  private onMouseUp(): void {
    this.hoveringZAxisAtMouseDown = 0
  }

  private onMouseHover(event: MousePosition): void {
    this.setMouseDetails(event)
  }
  
  private onMouseCellEnter(cell: Cell): void {
    this.selectTerrainTile(cell)
  } 

  private setMouseDetails(event: MousePosition): void {
    this.hoveringPosX = event.posX
    this.hoveringPosY = event.posY
    
    const hoveringCell = GSM.GridController.getCellByPosition(
      this.hoveringPosX,
      this.hoveringPosY,
      GSM.RotationController.currentRotation
    )
    
    if(hoveringCell && this.hoveringCellId !== hoveringCell.id) {
      this.hoveringCellId = hoveringCell.id
      this.hoveringCell = hoveringCell
      GSM.EventController.cellMouseEntered.next(this.hoveringCell)
    }
  }

  private selectTerrainTile(cell: Cell): GridAsset {
    const gridAsset = getHoveredOverGridAsset(cell)
    if(gridAsset) {
      this.hoveringZAxis = gridAsset.zIndex
      this.hoveringGridAsset = gridAsset
      return gridAsset
    } else {
      this.hoveringGridAsset = null
      return null
    }
  }
}