import { drawableItems } from "../../../../db/drawable-items.db"
import { GSM } from "../../../../game-state-manager.service"
import { Cell, DrawableItem } from "../../../../models/map"
import { Renderer } from "../../../../models/renderer"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"

export class TerrainPaintBrushRenderer extends Renderer {
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

  public draw(cell: Cell): void {
    const mapAsset = this.mapAssets[cell.id]
    if(!mapAsset) { return }

    if(GSM.EventController.generalActionFire.value.name === "paintingTerrain") {
      TerrainEdgeCalculator.calculateTerrainEdges(cell, mapAsset, this.mapAssets, this.drawableItem)
    }

    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(
      GSM.ImageController.getImage(mapAsset.imageTile.imageUrl),
      mapAsset.imageTile.spriteGridPosX * GSM.Settings.blockSize,
      mapAsset.imageTile.spriteGridPosY * GSM.Settings.blockSize,
      mapAsset.imageTile.tileWidth * GSM.Settings.blockSize,
      mapAsset.imageTile.tileHeight * GSM.Settings.blockSize,
      cell.posX + mapAsset.imageTile.tileOffsetX,
      cell.posY + mapAsset.imageTile.tileOffsetY,
      mapAsset.imageTile.tileWidth * (mapAsset.imageTile.sizeAdjustment || GSM.Settings.blockSize),
      mapAsset.imageTile.tileHeight * (mapAsset.imageTile.sizeAdjustment || GSM.Settings.blockSize)
    )
  }
}
