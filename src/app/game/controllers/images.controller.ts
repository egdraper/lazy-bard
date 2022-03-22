import { GSM } from "../game-state-manager.service";
import { generateElevationImage } from "../support/create-layer-image";

export class ImagesController {
  public images: { [imageUrl: string]: HTMLImageElement } = {};
  public baseLayerImage: HTMLImageElement
  public elevationLayersImages: {[elevation: number]: HTMLImageElement } = {} 

  constructor() {
    GSM.EventController.generalActionFire.subscribe(this.refreshAllImages.bind(this))
    GSM.GridController.newGridCreated.subscribe(this.refreshAllImages.bind(this))
  }

  public getImage(url: string): HTMLImageElement {
    return this.images[url];
  }

  public addImageBySrcUrl(url: string): void {
    if (this.images[url]) {
      return;
    }

    const newImage = new Image();
    newImage.src = url;
    this.images[url] = newImage;
  }

  public removeImage(url: string): void {
    delete this.images[url];
  }

  public refreshAllImages() {
    if(!GSM?.GridController?.gameMap) { return }

    GSM.GridController.iterateElevations(elevation => {
      GSM.CanvasModuleController.canvasModules.forEach(module => {
        const image = generateElevationImage(module.renderers, elevation.elevationIndex)
        this.elevationLayersImages[elevation.elevationIndex] = image
      })
    })
  }
}
