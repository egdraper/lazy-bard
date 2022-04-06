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
    if(event.terrainTile.baseWith) {      
      this.ctx.drawImage(
        GSM.ImageController.getImage(event.terrainTile.imageUrl),
        event.terrainTile.baseWith.x * GSM.Settings.blockSize,
        event.terrainTile.baseWith.y * GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        event.cell.position.x + event.terrainTile.offsetX,
        event.cell.position.y + event.terrainTile.offsetY,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
      )
    }

    if(event.terrainTile.topWith) {
      this.ctx.drawImage(
        GSM.ImageController.getImage(event.terrainTile.imageUrl),
        event.terrainTile.topWith.x * GSM.Settings.blockSize,
        event.terrainTile.topWith.y * GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        event.cell.position.x + event.terrainTile.offsetX,
        event.cell.position.y + event.terrainTile.offsetY - (event.terrainTile.height * GSM.Settings.blockSize),
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
      )
    }

    if(event.terrainTile.expandWith && event.terrainTile.height > 1) {
      for(let i = 1; i < event.terrainTile.height; i++) {
        this.ctx.drawImage(
          GSM.ImageController.getImage(event.terrainTile.imageUrl),
          event.terrainTile.expandWith.x * GSM.Settings.blockSize,
          event.terrainTile.expandWith.y * GSM.Settings.blockSize,
          GSM.Settings.blockSize,
          GSM.Settings.blockSize,
          event.cell.position.x + event.terrainTile.offsetX,
          event.cell.position.y + event.terrainTile.offsetY - (i * GSM.Settings.blockSize),
          GSM.Settings.blockSize,
          GSM.Settings.blockSize,
        )
      }
    }
  }
}
