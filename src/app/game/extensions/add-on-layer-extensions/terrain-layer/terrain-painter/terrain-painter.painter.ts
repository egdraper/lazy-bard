import { drawableItems } from "../../../../db/drawable-items.db"
import { GSM } from "../../../../game-state-manager.service"
import { DrawableItem, TerrainCell } from "../../../../models/map"
import { Painter } from "../../../../models/painter"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"

export class TerrainPainterPainter extends Painter {
  public paintOrder = 1
  private drawableItem: DrawableItem = drawableItems[0]

  constructor() {
    super()
    GSM.EventController.generalActionFire.subscribe(action => {
      if(action.name === "paintingTerrain") {
        this.drawableItem = action.data as DrawableItem
      }
    })
  }

  public paint(cell: TerrainCell): void {
    if(!cell.drawableTileId) { return }
    if(GSM.EventController.generalActionFire.value.name === "paintingTerrain") {
      TerrainEdgeCalculator.calculateTerrainEdges(cell, this.drawableItem)
    }

    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(
      GSM.ImageController.getImage(cell.imageTile.imageUrl),
      cell.imageTile.spriteGridPosX * GSM.Settings.blockSize,
      cell.imageTile.spriteGridPosY * GSM.Settings.blockSize,
      cell.imageTile.tileWidth * GSM.Settings.blockSize,
      cell.imageTile.tileHeight * GSM.Settings.blockSize,
      cell.posX + cell.imageTile.tileOffsetX,
      cell.posY + cell.imageTile.tileOffsetY,
      cell.imageTile.tileWidth * (cell.imageTile.sizeAdjustment || GSM.Settings.blockSize),
      cell.imageTile.tileHeight * (cell.imageTile.sizeAdjustment || GSM.Settings.blockSize)
    )
  }
}
