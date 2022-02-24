import { GSM } from "../../game-state-manager.service";
import { Cell } from "../../models/map";
import { Painter } from "../../models/painter";
import { PlayableAsset } from "../playable-characters/playable-character";

export class SelectionIndicatorPainter implements Painter {
  public layer = "base"
  public ctx = GSM.CanvasController.backgroundCTX

  public paint(cell: Cell, frame: number): void {
    const selectedAssets = GSM.AssetController.getSelectedAssets()

    selectedAssets.forEach((asset: PlayableAsset) => {
        this.ctx.beginPath()
        this.ctx.moveTo(asset.positionX, asset.positionY)
        this.ctx.rect(asset.positionX, asset.positionY, 32, 32)
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "rgba(255, 255 ,255,.5)"
        this.ctx.stroke()
    })
  }
}