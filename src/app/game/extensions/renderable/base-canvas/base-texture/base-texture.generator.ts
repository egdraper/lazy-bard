import { GSM } from "../../../../game-state-manager.service"
import { TerrainTile } from "../../../../models/sprite-tile.model"
import { TextureSprite } from "../../../../models/sprites"

export class BaseTextureRandomGenerator {
  public static autoFillBackgroundTerrain(tile: TerrainTile, baseTexture: TextureSprite) {
    const lessCommonTextureWidth = baseTexture.fullImageWidth - GSM.Settings.commonTextureWidth
    const commonTextureWidth = GSM.Settings.commonTextureWidth
    const odds = Math.floor(Math.random() * GSM.Settings.commonTextureOdds)
    
    let tileX
    if(odds <= 10) {
      tileX = Math.floor(Math.random() * lessCommonTextureWidth + commonTextureWidth)
    } else {
      tileX = Math.floor(Math.random() * commonTextureWidth)
    }

    tile.spriteX = tileX * GSM.Settings.blockSize
    tile.spriteY = 0    
  }    
}

