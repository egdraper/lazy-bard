export class Sprite {
  id: string
  imageUrl: string
  fullImageWidth: number
  fullImageHeight?: number
}

export class TextureSprite extends Sprite {
  textureType: string
}