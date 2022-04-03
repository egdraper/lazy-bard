import { drawableItems } from "../../../../db/drawable-items.db"
import { GSM } from "../../../../game-state-manager.service"
import { RenderingLayers } from "../../../../models/map"
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer"
import { TerrainEdgeCalculator } from "./terrain-edge-calculator"

export class TerrainPaintBrushRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.TerrainLayer

  public onDraw(event: RenderOptionsEvent): void {
    if(!event.terrainTile) { return }

    if(GSM.EventController.generalActionFire.value.name.includes("Terrain")) {
      event.terrainTile = TerrainEdgeCalculator.calculateTerrainEdges(
        event.cell,
        event.terrainTile,
        drawableItems.find(item => item.id === event.terrainTile.drawableTileId),
        event.elevationIndex
      )
    }

    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(
      GSM.ImageController.getImage(event.terrainTile.imageUrl),
      event.terrainTile.spritePosX * GSM.Settings.blockSize,
      event.terrainTile.spritePosY * GSM.Settings.blockSize,
      event.terrainTile.spriteSize.x,
      event.terrainTile.spriteSize.y,
      event.cell.posX + event.terrainTile.offsetX,
      event.cell.posY + event.terrainTile.offsetY,
      event.terrainTile.spriteSize.x,
      event.terrainTile.spriteSize.y,
    )
  }
}
