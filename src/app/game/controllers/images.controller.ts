import { GSM } from "../game-state-manager.service"

export class ImagesController {
  public baseLayerImage: HTMLImageElement
  public elevationLayersImages: {[elevation: number]: HTMLImageElement } = {} 

  public getImage(url: string): HTMLImageElement {
    return GSM.GameData.images[url]
  }

  public addImageBySrcUrl(url: string): void {
    if (GSM.GameData.images[url]) {
      return
    }

    const newImage = new Image()
    newImage.src = url
    GSM.GameData.images[url] = newImage
  }

  public removeImage(url: string): void {
    delete GSM.GameData.images[url]
  }
}
