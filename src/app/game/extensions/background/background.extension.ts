import { backgroundSprites } from "../../db/background.db"
import { GSM } from "../../game-state-manager.service"
import { TextureSprite } from "../../models/sprites"
import { BackgroundPainter } from "./background.painter"

export class BackgroundExtension {
  private painter = new BackgroundPainter()

  constructor() {
    this.setupImages()
  }

  public async setupImages(): Promise<void> {
    const textureSprites = await this.getBackgroundImages()
    this.loadImagesIntoPainter(textureSprites)    
    this.loadBaseTextureSpriteIntoPainter(textureSprites)

    GSM.PaintController.registerPainter(this.painter)
  }

  private loadImagesIntoPainter(textureSprites: TextureSprite[]): void {
    textureSprites.forEach(textureSprite => {
      const image = new Image()
      image.src = textureSprite.imageUrl
      this.painter.images[textureSprite.imageUrl] = image
    })    
  }

  private loadBaseTextureSpriteIntoPainter(textureSprites: TextureSprite[]): void {
    const textureSprite = textureSprites.find(sprite => sprite.baseTexture === GSM.GridController.grid.baseTexture)
    if(textureSprite) {
      this.painter.baseTexture = textureSprite
    } else {
      throw new Error("Unable to get Texture")
    }
  } 

  // MOCKS DB call from Server
  private getBackgroundImages(): Promise<TextureSprite[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(backgroundSprites.filter(sprite => sprite.textureType === "background"))
      }, 200)
    })
  }
}
