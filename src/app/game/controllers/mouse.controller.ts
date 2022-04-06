import { Cell } from "../models/map"

export class MouseController {
  public hoveringPosX: number = 0
  public hoveringPosY: number = 0
  public hoveringCellId: string = ""
  public hoveringCell: Cell = null
}