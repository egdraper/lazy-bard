import { Cell, MapRotationIndex, RenderingLayers } from "src/app/game/models/map"
import { BackgroundAsset, BackgroundTile } from "src/app/game/models/sprite-tile.model"
import { backgroundSprites } from "../../../../db/background.db"
import { GSM } from "../../../../game-state-manager.service"
import { CanvasLayerExtension } from "../../../../models/renderer"
import { TextureSprite } from "../../../../models/sprites"
import { BaseTextureRandomGenerator } from "./base-texture.generator"
import { BaseTextureRenderer } from "./base-texture.renderer"

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
    const textureSprite = textureSprites.find(sprite => sprite.baseTexture === GSM.GameData.map.baseTexture)
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
    GSM.GridController.iterateCells(MapRotationIndex.northUp,(cell: Cell) => {
      cell.backgroundAsset = new BackgroundAsset()
      cell.backgroundAsset.tile = new BackgroundTile()
      cell.backgroundAsset.tile.imageUrl = this.baseTexture?.imageUrl || ""
      cell.backgroundAsset.cell = cell
      
      BaseTextureRandomGenerator.autoFillBackgroundTerrain(cell.backgroundAsset.tile, this.baseTexture)
    })
  }
}
