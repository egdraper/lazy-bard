import { Cell, ElevationLayers, ImageTile } from "src/app/game/models/map"
import { AddOnExtension, Extension } from "../../../../models/extension.model"
import { backgroundSprites } from "../../../../db/background.db"
import { GSM } from "../../../../game-state-manager.service"
import { TextureSprite } from "../../../../models/sprites"
import { LargeBackgroundPainter } from "../base-layer.frame-painter"
import { BackgroundPainter } from "./background.cell-painter"
import { BackgroundRandomGenerator } from "./background.generator"

export class BackgroundExtension implements AddOnExtension {
  public id = "BackgroundExtension"
  public painter = new BackgroundPainter()
  public largeImagePainter = new LargeBackgroundPainter()
  public baseTexture: TextureSprite

  public init() {
    this.setupImages()
  }

  public async setupImages(): Promise<void> {
    const textureSprites = await this.getBackgroundImages()
    this.loadImagesIntoPainter(textureSprites)    
    this.loadBaseTextureSpriteIntoPainter(textureSprites)
    this.setBackgroundImages()
  }

  private loadImagesIntoPainter(textureSprites: TextureSprite[]): void {
    textureSprites.forEach(textureSprite => {
      const image = new Image()
      image.src = textureSprite.imageUrl
      this.painter.images[textureSprite.imageUrl] = image
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
    GSM.GridController.iterateLayerCell(ElevationLayers.BaseLayer, (cell: Cell) => {
      if (!cell.tile) { 
        cell.tile = new ImageTile()  
        cell.tile.imageUrl = this.baseTexture?.imageUrl || ""
        BackgroundRandomGenerator.autoFillBackgroundTerrain(cell.tile, this.baseTexture)
      }
    })
  }
}
