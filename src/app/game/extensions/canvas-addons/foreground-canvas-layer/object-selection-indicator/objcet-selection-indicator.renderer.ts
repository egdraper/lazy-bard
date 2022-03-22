import { RenderingLayers } from "../../../../models/map";
import { Renderer, RenderOptionsEvent } from "../../../../models/renderer";

export class ObjectSelectionIndicatorRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.TerrainLayer
  public override excludeFromSingleImagePainting: boolean = true
  public override drawOnFrameOnly: boolean = true
  
  public onDraw(event: RenderOptionsEvent): void {
    this.ctx.beginPath()
    this.ctx.moveTo(asset.positionX, asset.positionY)
    this.ctx.rect(this.posX, this.posY, this.width, this.height)    
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "rgba(255, 0 , 0, .5)"
    this.ctx.stroke()
  } 
}