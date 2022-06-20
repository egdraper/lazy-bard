import { Asset } from '../../models/asset.model'
import { GSM } from '../../game-state-manager.service'
import { RenderingLayers } from '../../models/map'
import { Renderer } from '../../models/renderer'

export class ObjectRenderer implements Renderer {
  ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.ObjectLayer

  public onDraw(asset: Asset, frame: number): void {
    if(asset.tile.layer !== RenderingLayers.ObjectLayer) { return }

    this.ctx.drawImage(
      GSM.ImageController.getImage(asset.tile.imageUrl),
      0,
      0,
      16,
      16,
      asset.cell.position.x,
      asset.cell.position.y - (asset.zIndex * GSM.Settings.blockSize),
      16,
      16
    )
  }
}
