import { Cell, SpriteLocation } from "src/app/game/models/map"
import { backgroundSprites } from "../../db/background.db"
import { GSM } from "../../game-state-manager.service"
import { BackgroundAsset } from "../../models/asset.model"
import { BackgroundTile, TerrainTile } from "../../models/sprite-tile.model"
import { TextureSprite } from "../../models/sprites"

export class BaseTexture {
  private static baseTexture: TextureSprite

  public static async addBackgroundAssets(baseTextureId: string, cells: Cell[]): Promise<void> {
    this.loadImagesIntoImageController(backgroundSprites)    
    this.setSpriteTexture(backgroundSprites, baseTextureId)
    this.setBackgroundImages(cells)
  }

  public static getRandomBackgroundTileCoordinates(baseTexture: TextureSprite) {
    const lessCommonTextureWidth = baseTexture.fullImageWidth - GSM.Settings.commonTextureWidth
    const commonTextureWidth = GSM.Settings.commonTextureWidth
    const odds = Math.floor(Math.random() * GSM.Settings.commonTextureOdds)
    
    let tileX
    if(odds <= 10) {
      tileX = Math.floor(Math.random() * lessCommonTextureWidth + commonTextureWidth)
    } else {
      tileX = Math.floor(Math.random() * commonTextureWidth)
    }

    return {x:  tileX, y: 0}
  }

  // Helper

  private static loadImagesIntoImageController(textureSprites: TextureSprite[]): void {
    textureSprites.forEach(textureSprite => {
      GSM.ImageManager.addImageBySrcUrl(textureSprite.imageUrl)
    })    
  }

  private static setSpriteTexture(textureSprites: TextureSprite[], baseTextureId: string): void {
    const textureSprite = textureSprites.find(sprite => sprite.id === baseTextureId)
    if(textureSprite) {
      this.baseTexture = textureSprite
    } else {
      throw new Error("Unable to get Texture")
    }
  } 

  private static setBackgroundImages(cells: Cell[]): void {
    cells.forEach(cell => {
      const backgroundAsset = new BackgroundAsset(cell, new BackgroundTile(this.baseTexture?.imageUrl || ""))
      this.addRandomTextureToBackgroundTile(backgroundAsset.tile, this.baseTexture)
      const a = GSM.AssetManager
      GSM.AssetManager.addBackgroundAsset(backgroundAsset, 0)
    })    
  }

  private static addRandomTextureToBackgroundTile(tile: TerrainTile, baseTexture: TextureSprite) {
    const spriteCoords = this.getRandomBackgroundTileCoordinates(baseTexture)

    if(!tile.baseWith) {
      tile.drawsWith = new SpriteLocation()
    }

    tile.drawsWith.x = spriteCoords.x * GSM.Settings.blockSize
    tile.drawsWith.y = spriteCoords.y    
  }        
}

