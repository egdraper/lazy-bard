import { Cell } from "src/app/game/models/map"
import { BackgroundAsset } from "../../models/asset.model"
import { backgroundSprites } from "../../db/background.db"
import { GSM } from "../../game-state-manager.service"
import { CanvasLayerExtension } from "../../models/renderer"
import { TextureSprite } from "../../models/sprites"
import { BaseTextureRandomGenerator } from "./base-texture.generator"
import { BaseTextureRenderer } from "./base-texture.renderer"
import { BackgroundTile } from "../../models/sprite-tile.model"

export class BaseTextureExtension extends CanvasLayerExtension {
  public override excludeFromIndividualCellPainting = true
  public renderer = new BaseTextureRenderer()
  
  private baseTexture: TextureSprite

  public override async init(): Promise<void> {
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
    const textureSprite = textureSprites.find(sprite => sprite.baseTexture === GSM.GridController.map.baseTexture)
    if(textureSprite) {
      this.baseTexture = textureSprite
    } else {
      throw new Error("Unable to get Texture")
    }
  } 

  // MOCKS DB call from Server
  private getBackgroundImages(): TextureSprite[] {
    return backgroundSprites.filter(sprite => sprite.id === "greenGrass")
  }

  private setBackgroundImages(): void {
    GSM.GridController.iterateCells((cell: Cell) => {
      const backgroundAsset = new BackgroundAsset(cell, new BackgroundTile(this.baseTexture?.imageUrl || ""))
      BaseTextureRandomGenerator.autoFillBackgroundTerrain(backgroundAsset.tile, this.baseTexture)
      GSM.AssetController.addBackgroundAsset(backgroundAsset, 0)
    })
  }
}
