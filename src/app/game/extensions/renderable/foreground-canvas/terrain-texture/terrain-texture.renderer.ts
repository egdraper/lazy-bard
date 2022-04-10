import { drawableItems } from "../../../../db/drawable-items.db"
import { GSM } from "../../../../game-state-manager.service"
import { Cell, RenderingLayers } from "../../../../models/map"
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer"
import { TerrainEdgeCalculator } from "../../../../controllers/utils/terrain-edge-calculator"

export class TerrainPaintBrushRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.TerrainLayer

  public onDraw(event: RenderOptionsEvent): void {
    if(!event.terrainTile || !event.terrainTile.drawableTileId) { return }
    
    const itemDetails = drawableItems.find(item => item.id === event.terrainTile.drawableTileId)

    this.ctx.imageSmoothingEnabled = false
    if(event.terrainTile.drawsWith) {      
      this.ctx.drawImage(
        GSM.ImageController.getImage(event.terrainTile.imageUrl),
        event.terrainTile.drawsWith.x * GSM.Settings.blockSize,
        event.terrainTile.drawsWith.y * GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        event.cell.position.x + itemDetails.offsetX,
        event.cell.position.y + itemDetails.offsetY - event.cell.position.z,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
      )
     }
    if(event.terrainTile.drawsWith1) {      
      this.ctx.drawImage(
        GSM.ImageController.getImage(event.terrainTile.imageUrl),
        event.terrainTile.drawsWith1.x * GSM.Settings.blockSize,
        event.terrainTile.drawsWith1.y * GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        event.cell.position.x + itemDetails.offsetX,
        event.cell.position.y + itemDetails.offsetY - GSM.Settings.blockSize - event.cell.position.z,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
      )
     }

    // if(event.terrainTile.topWith) {
    //   const height = itemDetails.staticHeight | itemDetails.variableHeight
    //   this.ctx.drawImage(
    //     GSM.ImageController.getImage(event.terrainTile.imageUrl),
    //     event.terrainTile.topWith.x * GSM.Settings.blockSize,
    //     event.terrainTile.topWith.y * GSM.Settings.blockSize,
    //     GSM.Settings.blockSize,
    //     GSM.Settings.blockSize,
    //     event.cell.position.x + itemDetails.offsetX,
    //     event.cell.position.y + itemDetails.offsetY - (height * GSM.Settings.blockSize),
    //     GSM.Settings.blockSize,
    //     GSM.Settings.blockSize,
    //   )
    // }

    // if(event.terrainTile.expandWith) {
    //   const height = itemDetails.staticHeight | itemDetails.variableHeight

    //   if(height > 1) {
    //     for(let i = 1; i < height; i++) {
    //       this.ctx.drawImage(
    //         GSM.ImageController.getImage(event.terrainTile.imageUrl),
    //         event.terrainTile.expandWith.x * GSM.Settings.blockSize,
    //         event.terrainTile.expandWith.y * GSM.Settings.blockSize,
    //         GSM.Settings.blockSize,
    //         GSM.Settings.blockSize,
    //         event.cell.position.x + itemDetails.offsetX,
    //         event.cell.position.y + itemDetails.offsetY - (i * GSM.Settings.blockSize),
    //         GSM.Settings.blockSize,
    //         GSM.Settings.blockSize,
    //       )
    //     }
    //   }
    // }
  }
}
