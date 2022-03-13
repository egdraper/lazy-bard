import { drawableItems } from "../../../../db/drawable-items.db"
import { GSM } from "../../../../game-state-manager.service"
import { Cell, DrawableItem, ElevationLayers, SpriteTile } from "../../../../models/map"
import { Renderer } from "../../../../models/renderer"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"

export class TerrainPaintBrushRenderer extends Renderer {
  public elevationLayer: ElevationLayers = ElevationLayers.TerrainLayer

  public onDraw(cell: Cell, spriteTile: SpriteTile): void {
    if(!spriteTile) { return }

    if(GSM.EventController.generalActionFire.value.name.includes("Terrain")) {
      spriteTile = TerrainEdgeCalculator.calculateTerrainEdges(cell, spriteTile, drawableItems.find(item => item.id === spriteTile.drawableTileId))
    }

    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(
      GSM.ImageController.getImage(spriteTile.imageUrl),
      spriteTile.spriteGridPosX * GSM.Settings.blockSize,
      spriteTile.spriteGridPosY * GSM.Settings.blockSize,
      spriteTile.tileWidth * GSM.Settings.blockSize,
      spriteTile.tileHeight * GSM.Settings.blockSize,
      cell.posX + spriteTile.tileOffsetX,
      cell.posY + spriteTile.tileOffsetY,
      spriteTile.tileWidth * (spriteTile.sizeAdjustment || GSM.Settings.blockSize),
      spriteTile.tileHeight * (spriteTile.sizeAdjustment || GSM.Settings.blockSize)
    )
  }
}