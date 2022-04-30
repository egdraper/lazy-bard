import { SpriteLocation } from "src/app/game/models/map"
import { GSM } from "../../game-state-manager.service"
import { TerrainTile } from "../../models/sprite-tile.model"
import { Sprite, TextureSprite } from "../../models/sprites"

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

    if(!tile.baseWith) {
      tile.drawsWith = new SpriteLocation()
    }

    tile.drawsWith.x = tileX * GSM.Settings.blockSize
    tile.drawsWith.y = 0    
  }    
}

