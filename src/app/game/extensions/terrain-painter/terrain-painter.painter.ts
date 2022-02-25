import { GSM } from "../../game-state-manager.service"
import { DrawableItem, ElevationLayers, TerrainCell } from "../../models/map"
import { Painter } from "../../models/painter"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"

export class TerrainPainterPainter implements Painter {
  public layer = ElevationLayers.TerrainLayer
  public paintOrder = 1
  public ctx = GSM.CanvasController.foregroundCTX
  public images: { [imageUrl: string]: HTMLImageElement; } = {}
  
  private drawableItem: DrawableItem

  constructor() {
    GSM.editorController.selectedDrawableItem.subscribe(drawableItem => this.drawableItem = drawableItem)
  }

  public paint(cell: TerrainCell): void {
    if(!cell.drawableTileId) { return }
    TerrainEdgeCalculator.calculateTerrainEdges(cell, this.drawableItem)

    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(
      this.images[cell.imageTile.imageUrl],
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
