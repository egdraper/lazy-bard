import { Cell, ImageTile } from "src/app/game/models/map"
import { AddOnExtension } from "../../../../models/extension.model"
import { backgroundSprites } from "../../../../db/background.db"
import { GSM } from "../../../../game-state-manager.service"
import { TextureSprite } from "../../../../models/sprites"
import { BackgroundPainter } from "./background.painter"
import { BackgroundRandomGenerator } from "./background.generator"

export class BackgroundExtension implements AddOnExtension {
  public id = "BackgroundExtension"
  public painter = new BackgroundPainter()
  public baseTexture: TextureSprite

  public init() {
    this.setupImages()
  }

  public async setupImages(): Promise<void> {
    const textureSprites = await this.getBackgroundImages()
    this.loadImagesIntoImageController(textureSprites)    
    this.loadBaseTextureSpriteIntoPainter(textureSprites)
    this.setBackgroundImages()
  }

  private loadImagesIntoImageController(textureSprites: TextureSprite[]): void {
    textureSprites.forEach(textureSprite => {
      GSM.ImageController.addImageBySrcUrl(textureSprite.imageUrl)
    })    
  }

  private loadBaseTextureSpriteIntoPainter(textureSprites: TextureSprite[]): void {
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
    GSM.GridController.iterateLayerCell((cell: Cell) => {
      if (!cell.backgroundTile) { 
        cell.backgroundTile = new ImageTile()  
        cell.backgroundTile.imageUrl = this.baseTexture?.imageUrl || ""
        BackgroundRandomGenerator.autoFillBackgroundTerrain(cell.backgroundTile, this.baseTexture)
      }
    })
  }
}
