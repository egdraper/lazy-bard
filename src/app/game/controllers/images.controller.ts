import { GSM } from "../game-state-manager.service";
import { generateElevationImage } from "./utils/create-layer-image";

export class ImagesController {
  public baseLayerImage: HTMLImageElement
  public elevationLayersImages: {[elevation: number]: HTMLImageElement } = {} 

  constructor() {
    GSM.GridController.newGridCreated.subscribe(this.refreshAllImages.bind(this))
  }

  public getImage(url: string): HTMLImageElement {
    return GSM.GameData.images[url];
  }

  public addImageBySrcUrl(url: string): void {
    if (GSM.GameData.images[url]) {
      return;
    }

    const newImage = new Image();
    newImage.src = url;
    GSM.GameData.images[url] = newImage;
  }

  public removeImage(url: string): void {
    delete GSM.GameData.images[url];
  }

  public refreshAllImages() {
    if(!GSM?.GameData?.map) { return }

    GSM.GridController.iterateElevations(elevation => {
      GSM.CanvasModuleController.canvasModules.forEach(module => {
        const image = generateElevationImage(module.renderers, elevation.elevationIndex)
        this.elevationLayersImages[elevation.elevationIndex] = image
      })
    })
  }
}
