import { GSM } from "../../../../game-state-manager.service";
import { Cell } from "../../../../models/map";
import { Painter } from "../../../../models/painter";
import { MovableAsset } from "../../floor-layer/movable-asset/movable-asset";

export class SelectionIndicatorPainter extends Painter {
  public paintOrder = 10
  
  private posX 
  private posY
  private width
  private height

  public paint(cell: Cell, frame: number): void {
    const selectedAssets = GSM.AssetController.getSelectedAssets()
    
    selectedAssets.forEach((asset: MovableAsset) => {
      this.animateMarker(asset, frame)
      this.ctx.beginPath()
      this.ctx.moveTo(asset.positionX, asset.positionY)
      this.ctx.rect(this.posX, this.posY, this.width, this.height)    
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = "rgba(255, 0 , 0, .1)"
      this.ctx.stroke()
    })
  }

  private animateMarker(asset: MovableAsset, frame: number): void {
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