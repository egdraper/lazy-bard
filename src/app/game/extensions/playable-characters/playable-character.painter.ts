import { GSM } from "../../game-state-manager.service";
import { Cell } from "../../models/map";
import { Painter } from "../../models/painter";
import { PlayableAsset } from "./playable-character";

export class PlayerCharacterPainter implements Painter {
    public layer = "creature"
    public ctx = GSM.CanvasController.foregroundCTX
    public images: { [imageUrl: string]: HTMLImageElement; } = {}
    
    public paint(cell: Cell): void {
      const playableAsset = GSM.AssetController.getAssetByCell(cell) as PlayableAsset
      if(!playableAsset) {return}
    
      let image = this.images[playableAsset.imageUrl]
      if(!image) {
        this.images[playableAsset.imageUrl] = new Image()
        this.images[playableAsset.imageUrl].src = playableAsset.imageUrl  
        image = this.images[playableAsset.imageUrl]
      }

      this.ctx.drawImage(
        image,
        playableAsset.frameXPosition[playableAsset.frameCounter],
        playableAsset.frameYPosition,
        25,
        36,
        playableAsset.positionX - 8,
        playableAsset.positionY - 58,
        50,
        80
      ) 
    }
}