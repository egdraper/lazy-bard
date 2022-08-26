import { GSM } from "../game-state-manager.service"
import { RenderingLayers } from "../models/map"

export class ImagesManager {
  // caches all sprite images by URL
  public images: { [imageUrl: string]: HTMLImageElement } = {};

  // caches an image for each rendering layer
  public renderingLayerImages: {[layer: string]: HTMLImageElement } = {}

  public getImage(url: string): HTMLImageElement {
    return this.images[url]
  }

  public addImageBySrcUrl(url: string): void {
    if (this.images[url]) {
      return
    }

    const newImage = new Image()
    newImage.src = url
    this.images[url] = newImage
  }

  public removeImage(url: string): void {
    delete this.images[url]
  }
}
