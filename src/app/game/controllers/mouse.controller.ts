
import { GSM } from "../game-state-manager.service"
import { Cell, MousePosition, RenderingLayers } from "../models/map"
import { Tile } from "../models/sprite-tile.model"
import { getClickedOnTerrainTile } from "./utils/selected-sprite-tile"
import { terrainCleanup } from "./utils/terrain-cleanup"

export class MouseController {
  public hoveringPosX: number = 0
  public hoveringPosY: number = 0
  public hoveringCellId: string = ""
  public hoveringCell: Cell = null
  public hoveringSpriteTileCell: Tile

  constructor() {
    GSM.EventController.mouseHover.subscribe(this.selectTerrainTile.bind(this))
  }

  private selectTerrainTile(event: MousePosition) {
     const tile = getClickedOnTerrainTile(event.posX, event.posY)
     if(tile) {
       this.hoveringSpriteTileCell = tile.cell
     } else {
       this.hoveringSpriteTileCell = null
     }
  }
}