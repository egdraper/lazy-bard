import { GSM } from "../../../../game-state-manager.service";
import { Cell, RenderingLayers, SpriteTile } from "../../../../models/map";
import { Renderer } from "../../../../models/renderer";
import { PlayableAsset } from "../playable-asset/playable-asset.model";

export class SelectionIndicatorRenderer extends Renderer {
  public elevationLayer: RenderingLayers = RenderingLayers.CharacterLayer
  public override excludeFromSingleImagePainting: boolean = true
  
  private posX 
  private posY
  private width
  private height

  public onDraw(cell: Cell, spriteTile: SpriteTile, layerIndex: number, frame: number): void {
    const asset = GSM.AssetController.getSelectedAssets().find(asset => asset.cell.id === cell.id) as PlayableAsset 
    if(!asset) { return } 
    
    this.animateMarker(asset, frame)
    this.ctx.beginPath()
    this.ctx.moveTo(asset.positionX, asset.positionY)
    this.ctx.rect(this.posX, this.posY, this.width, this.height)    
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "rgba(255, 0 , 0, .5)"
    this.ctx.stroke()
  }

  private animateMarker(asset: PlayableAsset, frame: number): void {
    if(frame <= 32) {
      this.posX = asset.positionX - Math.floor(frame / 6)
      this.posY = asset.positionY - Math.floor(frame / 6)
      this.width = 32 + Math.floor(frame / 3)
      this.height = 32 + Math.floor(frame / 3)
    }
    if(frame > 32) {
      this.posX = asset.positionX - Math.abs(Math.floor(frame / 6) - 12)
      this.posY = asset.positionY - Math.abs(Math.floor(frame / 6) - 12)
      this.width = 32 + Math.abs(Math.floor(frame / 3) - 24)
      this.height = 32 + Math.abs(Math.floor(frame / 3) - 24)
    }
  }
}