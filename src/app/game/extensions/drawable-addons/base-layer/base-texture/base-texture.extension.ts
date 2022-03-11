import { Cell, MapAssetImageCell, SpriteTile } from "src/app/game/models/map"
import { AddOnExtension } from "../../../../models/extension.model"
import { backgroundSprites } from "../../../../db/background.db"
import { GSM } from "../../../../game-state-manager.service"
import { TextureSprite } from "../../../../models/sprites"
import { BaseTextureRenderer } from "./base-texture.renderer"
import { BaseTextureRandomGenerator } from "./base-texture.generator"

export class BaseTextureExtension implements AddOnExtension {
  public id = "BaseTextureExtension"
  public renderer = new BaseTextureRenderer()
  public baseTexture: TextureSprite

  public async init(): Promise<void> {
    await this.setupImages()
  }

  public async setupImages(): Promise<void> {
    const textureSprites = await this.getBackgroundImages()
    this.loadImagesIntoImageController(textureSprites)    
    this.loadBaseTextureSpriteIntoRenderer(textureSprites)
    this.setBackgroundImages()
  }

  private loadImagesIntoImageController(textureSprites: TextureSprite[]): void {
    textureSprites.forEach(textureSprite => {
      GSM.ImageController.addImageBySrcUrl(textureSprite.imageUrl)
    })    
  }

  private loadBaseTextureSpriteIntoRenderer(textureSprites: TextureSprite[]): void {
    const textureSprite = textureSprites.find(sprite => sprite.baseTexture === GSM.GridController.gameMap.baseTexture)
    if(textureSprite) {
      this.baseTexture = textureSprite
    } else {
      throw new Error("Unable to get Texture")
    }
  } 

  // MOCKS DB call from Server
  private getBackgroundImages(): TextureSprite[] {
    return backgroundSprites.filter(sprite => sprite.textureType === "background")
  }

  private setBackgroundImages(): void {
    GSM.GridController.iterateCells((cell: Cell) => {
      const assetCell = new MapAssetImageCell()
      assetCell.imageTile = new SpriteTile()  
      assetCell.imageTile.imageUrl = this.baseTexture?.imageUrl || ""
      BaseTextureRandomGenerator.autoFillBackgroundTerrain(assetCell.imageTile, this.baseTexture)

      this.renderer.mapAssets[cell.id] = assetCell
    })
  }
}
