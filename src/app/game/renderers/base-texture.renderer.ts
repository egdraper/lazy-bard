import { RenderingLayers } from "src/app/game/models/map"
import { BackgroundAsset } from "../models/asset.model"
import { GSM } from "../game-state-manager.service"
import { BackgroundRenderer, Renderer } from "../models/renderer"

export class BaseTextureRenderer implements BackgroundRenderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.backgroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.BaseLayer
  public enabled: boolean = true

  public onDraw(asset: BackgroundAsset): void {
    if(!asset.tile || !asset.tile.imageUrl) { return }

    this.ctx.drawImage(
      GSM.ImageController.getImage(asset.tile.imageUrl),
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
