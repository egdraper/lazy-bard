import { GSM } from "../../game-state-manager.service"
import { TerrainAsset } from "../../models/asset.model"
import { RenderingLayers } from "../../models/map"
import { Renderer } from "../../models/renderer"

export class TerrainRenderer implements Renderer {
  public id: string = "TerrainRenderer"
  public ctx: CanvasRenderingContext2D = GSM.CanvasManager.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.TerrainLayer
  public enabled: boolean = true

  public onDraw(asset: TerrainAsset, frame: number, opacity: number = 1): void {
    if(!asset.tile || !asset.tile.drawableTileId) { return }  
      this.ctx.imageSmoothingEnabled = false
      this.ctx.globalAlpha = opacity
      if(asset.tile.drawsWith) {      
        this.ctx.drawImage(
          GSM.ImageManager.getImage(asset.tile.imageUrl),
          asset.tile.drawsWith.x * GSM.Settings.blockSize,
          asset.tile.drawsWith.y * GSM.Settings.blockSize,
          GSM.Settings.blockSize,
          GSM.Settings.blockSize * asset.ownedBlockIds.length,
          asset.anchorCell.position.x + asset.attributes.xPosOffset,
          asset.anchorCell.position.y + asset.attributes.xPosOffset - (asset.baseZIndex * GSM.Settings.blockSize),
          GSM.Settings.blockSize,
          GSM.Settings.blockSize * asset.ownedBlockIds.length,
        )
      }

      if(asset.tile.drawsWithTop) {      
        this.ctx.drawImage(
          GSM.ImageManager.getImage(asset.tile.imageUrl),
          asset.tile.drawsWithTop.x * GSM.Settings.blockSize,
          asset.tile.drawsWithTop.y * GSM.Settings.blockSize,
          GSM.Settings.blockSize,
          GSM.Settings.blockSize,
          asset.anchorCell.position.x + asset.attributes.xPosOffset,
          asset.anchorCell.position.y + asset.attributes.xPosOffset - GSM.Settings.blockSize - (asset.baseZIndex * GSM.Settings.blockSize),
          GSM.Settings.blockSize,
          GSM.Settings.blockSize,
        )
       }

       this.ctx.globalAlpha = 1
       this.ctx.filter = "brightness(100%)";
  }
}
