import { GSM } from '../../game-state-manager.service'
import { Asset, PlaceableAsset } from '../../models/asset.model'
import { RenderingLayers } from '../../models/map'
import { Renderer } from '../../models/renderer'
import { AssetTile, TerrainTile } from '../../models/sprite-tile.model'

export class SelectorRenderer implements Renderer {
  public id: string = "SelectorRenderer"
  public ctx: CanvasRenderingContext2D = GSM.CanvasManager.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.OverlayLayer
  public enabled: boolean = true
 
  public onDraw(): void {
    if(GSM.AssetManager.selectedAssets.length === 0) {
      return
    }

    GSM.AssetManager.selectedAssets.forEach((asset: PlaceableAsset<TerrainTile>) => {
      const movementOffsetX = asset.movement ? asset.movement.movementOffset.x : asset.anchorCell.position.x
      const movementOffsetY = asset.movement ? asset.movement.movementOffset.y : asset.anchorCell.position.y
  
      let color = 'rgba(255, 0 , 0, .5)'
      if (asset.hovering) {
        color = 'rgba(50, 50 , 255, .5)'
      }

      let top = 0
      if(asset.tile.drawsWithTop) {
        top = GSM.Settings.blockSize
      }
  
      this.ctx.beginPath()
      this.ctx.rect(
        movementOffsetX + asset.attributes.xPosOffset,
        movementOffsetY + asset.attributes.yPosOffset - (asset.baseZIndex * GSM.Settings.blockSize) - top,
        asset.attributes.drawSize.x,
        asset.attributes.drawSize.y + top
      )
      this.ctx.lineWidth = 2
      this.ctx.strokeStyle = color
      this.ctx.stroke()
    })

  }

}
