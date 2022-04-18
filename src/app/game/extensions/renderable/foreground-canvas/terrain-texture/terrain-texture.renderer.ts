import { Renderer } from "src/app/game/models/renderer"
import { TerrainAsset } from "src/app/game/models/sprite-tile.model"
import { drawableItems } from "../../../../db/drawable-items.db"
import { GSM } from "../../../../game-state-manager.service"
import { RenderingLayers } from "../../../../models/map"

export class TerrainPaintBrushRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.TerrainLayer

  public onDraw(asset: TerrainAsset): void {
    if(!asset.tile || !asset.tile.drawableTileId) { return }
    
    const itemDetails = drawableItems.find(item => item.id === asset.tile.drawableTileId)

    this.ctx.imageSmoothingEnabled = false
    if(asset.tile.drawsWith) {      
      this.ctx.drawImage(
        GSM.ImageController.getImage(asset.tile.imageUrl),
        asset.tile.drawsWith.x * GSM.Settings.blockSize,
        asset.tile.drawsWith.y * GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        asset.cell.position.x + itemDetails.offsetX,
        asset.cell.position.y + itemDetails.offsetY - asset.zIndex,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
      )
     }
    if(asset.tile.drawsWithTop) {      
      this.ctx.drawImage(
        GSM.ImageController.getImage(asset.tile.imageUrl),
        asset.tile.drawsWithTop.x * GSM.Settings.blockSize,
        asset.tile.drawsWithTop.y * GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        GSM.Settings.blockSize,
        asset.cell.position.x + itemDetails.offsetX,
        asset.cell.position.y + itemDetails.offsetY - GSM.Settings.blockSize - asset.zIndex,
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
