import { Renderer } from "../../models/renderer"
import { TerrainAsset } from "../../models/asset.model"
import { drawableItems } from "../../db/drawable-items.db"
import { GSM } from "../../game-state-manager.service"
import { RenderingLayers } from "../../models/map"

export class TerrainPaintBrushRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.TerrainLayer

  public onDraw(asset: TerrainAsset, frame: number, opacity: number = 1): void {
    if(!asset.tile || !asset.tile.drawableTileId) { return }
    
    const itemDetails = drawableItems.find(item => item.id === asset.tile.drawableTileId)
    

      this.ctx.imageSmoothingEnabled = false
      this.ctx.globalAlpha = opacity
      if(asset.tile.drawsWith) {      
        this.ctx.drawImage(
          GSM.ImageController.getImage(asset.tile.imageUrl),
          asset.tile.drawsWith.x * GSM.Settings.blockSize,
          asset.tile.drawsWith.y * GSM.Settings.blockSize,
          GSM.Settings.blockSize,
          GSM.Settings.blockSize * asset.ownedBlockIds.length,
          asset.anchorCell.position.x + itemDetails.offsetX,
          asset.anchorCell.position.y + itemDetails.offsetY - (asset.baseZIndex * GSM.Settings.blockSize),
          GSM.Settings.blockSize,
          GSM.Settings.blockSize * asset.ownedBlockIds.length,
        )
      }
      
      if(asset.tile.drawsWithTop) {      
        this.ctx.drawImage(
          GSM.ImageController.getImage(asset.tile.imageUrl),
          asset.tile.drawsWithTop.x * GSM.Settings.blockSize,
          asset.tile.drawsWithTop.y * GSM.Settings.blockSize,
          GSM.Settings.blockSize,
          GSM.Settings.blockSize,
          asset.anchorCell.position.x + itemDetails.offsetX,
          asset.anchorCell.position.y + itemDetails.offsetY - GSM.Settings.blockSize - (asset.baseZIndex * GSM.Settings.blockSize),
          GSM.Settings.blockSize,
          GSM.Settings.blockSize,
        )
       }

       this.ctx.globalAlpha = 1

  }
}
