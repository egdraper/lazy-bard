import { Asset } from "src/app/game/models/asset.model";
import { GSM } from "../../../../game-state-manager.service";
import { RenderingLayers } from "../../../../models/map";
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer";

export class SelectionIndicatorRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.CharacterLayer
  public override excludeFromSingleImagePainting: boolean = true
  
  private posX 
  private posY
  private width
  private height

  public onDraw(event: RenderOptionsEvent): void {
    const asset = GSM.AssetController.getSelectedAssets().find(asset => asset.cell.id === event.cell.id)
    if(!asset) { return } 
    
    this.animateMarker(asset, event.frame)
    this.ctx.beginPath()
    this.ctx.rect(this.posX, this.posY, this.width, this.height)    
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "rgba(255, 0 , 0, .5)"
    this.ctx.stroke()
  }

  private animateMarker(asset: Asset, frame: number): void {
    if(frame <= 32) {
      this.posX = asset.posX - Math.floor(frame / 6)
      this.posY = asset.posY - Math.floor(frame / 6)
      this.width = GSM.Settings.blockSize + Math.floor(frame / 3)
      this.height = GSM.Settings.blockSize + Math.floor(frame / 3)
    }
    if(frame > 32) {
      this.posX = asset.posX - Math.abs(Math.floor(frame / 6) - 12)
      this.posY = asset.posY - Math.abs(Math.floor(frame / 6) - 12)
      this.width = GSM.Settings.blockSize + Math.abs(Math.floor(frame / 3) - 24)
      this.height = GSM.Settings.blockSize + Math.abs(Math.floor(frame / 3) - 24)
    }
  }
}