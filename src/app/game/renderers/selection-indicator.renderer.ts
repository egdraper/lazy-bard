import { PlaceableAsset } from '../models/asset.model'
import { GSM } from '../game-state-manager.service'
import { RenderingLayers } from '../models/map'
import { Renderer } from '../models/renderer'

export class SelectionIndicatorRenderer implements Renderer {
  public id: string = "SelectionIndicatorRenderer"
  ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.AssetLayer
  public enabled: boolean = true

  public animate = true

  private posX
  private posY
  private width
  private height

  public onDraw(asset: PlaceableAsset, frame: number): void {
    if (!asset || !GSM.AssetController.selectedAssets.find(_asset => _asset.id === asset.id)) {
      return
    }

    // const walkOverAsset = getHoveredOverGridAsset(asset.cell)
    // let shadowZ = asset.zIndex
    // if(walkOverAsset && walkOverAsset.zIndex <= shadowZ ) {
    //    shadowZ = walkOverAsset ? walkOverAsset.zIndex * GSM.Settings.blockSize : 0
    // } 

    let color = 'rgba(255, 0 , 0, .5)'
    if (asset.hovering) {
      color = 'rgba(50, 50 , 255, .5)'
    }

    if (this.animate) {
      this.animateMarker(asset, frame)
    } else {
      this.posX = asset.movement ? asset?.movement.movementOffset.x : asset.anchorCell.position.x
      this.posY = asset.movement ? asset?.movement.movementOffset.y : asset.anchorCell.position.y
      this.width = GSM.Settings.blockSize
      this.height = GSM.Settings.blockSize
    }

    this.ctx.beginPath()
    this.ctx.rect(this.posX, this.posY - (asset.baseZIndex * GSM.Settings.blockSize) , this.width, this.height)
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = color
    this.ctx.stroke()
  }

  private animateMarker(asset: PlaceableAsset, frame: number): void {
    const movementOffsetX = asset.movement ? asset?.movement.movementOffset.x : asset.anchorCell.position.x
    const movementOffsetY = asset.movement ? asset?.movement.movementOffset.y : asset.anchorCell.position.y
    
    if (frame <= 32) {
      this.posX = movementOffsetX - Math.floor(frame / 6)
      this.posY =  movementOffsetY - Math.floor(frame / 6)
      this.width = GSM.Settings.blockSize + Math.floor(frame / 3)
      this.height = GSM.Settings.blockSize + Math.floor(frame / 3)
    }
    if (frame > 32) {
      this.posX = movementOffsetX - Math.abs(Math.floor(frame / 6) - 12)
      this.posY =  movementOffsetY - Math.abs(Math.floor(frame / 6) - 12)
      this.width =
        GSM.Settings.blockSize + Math.abs(Math.floor(frame / 3) - 24)
      this.height =
        GSM.Settings.blockSize + Math.abs(Math.floor(frame / 3) - 24)
    }
  }
}
