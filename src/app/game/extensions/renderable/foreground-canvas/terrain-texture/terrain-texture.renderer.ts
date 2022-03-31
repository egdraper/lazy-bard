import { drawableItems } from "../../../../db/drawable-items.db"
import { GSM } from "../../../../game-state-manager.service"
import { RenderingLayers } from "../../../../models/map"
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"

export class TerrainPaintBrushRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.TerrainLayer

  public onDraw(event: RenderOptionsEvent): void {
    if(!event.spriteTile) { return }

    if(GSM.EventController.generalActionFire.value.name.includes("Terrain")) {
      event.spriteTile = TerrainEdgeCalculator.calculateTerrainEdges(
        event.cell,
        event.spriteTile,
        drawableItems.find(item => item.id === event.spriteTile.drawableTileId),
        event.elevationIndex
      )
    }

    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(
      GSM.ImageController.getImage(event.spriteTile.imageUrl),
      event.spriteTile.spritePosX * GSM.Settings.blockSize,
      event.spriteTile.spritePosY * GSM.Settings.blockSize,
      event.spriteTile.spriteSize.x * GSM.Settings.blockSize,
      event.spriteTile.spriteSize.y * GSM.Settings.blockSize,
      event.cell.posX + event.spriteTile.offsetX,
      event.cell.posY + event.spriteTile.offsetY,
      event.spriteTile.spriteSize.x * GSM.Settings.blockSize,
      event.spriteTile.spriteSize.y * GSM.Settings.blockSize
    )
  }
}
