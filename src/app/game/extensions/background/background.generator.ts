import { GSM } from "../../game-state-manager.service"
import { ImageTile } from "../../models/map"
import { TextureSprite } from "../../models/sprites"

export class BackgroundRandomGenerator {
  public static autoFillBackgroundTerrain(tile: ImageTile, baseTexture: TextureSprite) {
    const lessCommonTextureWidth = baseTexture.fullImageWidth - GSM.Settings.commonTextureWidth
    const commonTextureWidth = GSM.Settings.commonTextureWidth
    const odds = Math.floor(Math.random() * GSM.Settings.commonTextureOdds)
    
    let tileX
    if(odds <= 10) {
      tileX = Math.floor(Math.random() * lessCommonTextureWidth + commonTextureWidth)
    } else {
      tileX = Math.floor(Math.random() * commonTextureWidth)
    }

    tile.tilePosX = tileX * GSM.Settings.blockSize
    tile.tilePosY = 0    
  }    
}

