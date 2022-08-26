import { GSM } from "../../game-state-manager.service"
import { BackgroundAsset } from "../../models/asset.model"
import { RenderingLayers } from "../../models/map"
import { BackgroundRenderer } from "../../models/renderer"

export class BaseTextureRenderer implements BackgroundRenderer {
  public id: string = "BaseTextureRenderer"
  public ctx: CanvasRenderingContext2D = GSM.CanvasManager.backgroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer
  public enabled: boolean = true

  public onDraw(asset: BackgroundAsset): void {
    if(!asset.tile || !asset.tile.imageUrl) { return }

    this.ctx.drawImage(
      GSM.ImageManager.getImage(asset.tile.imageUrl),
      asset.tile.drawsWith.x,
      asset.tile.drawsWith.y,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize,
      asset.anchorCell.position.x,
      asset.anchorCell.position.y,
      GSM.Settings.blockSize,
      GSM.Settings.blockSize
    )
  }
}
