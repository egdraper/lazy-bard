import { GSM } from "../game-state-manager.service";
import { Grid } from "../models/map";
import { Renderer } from "../models/renderer";
import { GeneralAction } from "../models/settings";

export class ImagesController {
  public images: { [imageUrl: string]: HTMLImageElement } = {};
  public baseLayerImage: HTMLImageElement
  public elevationLayersImages: {[elevation: number]: HTMLImageElement } = {} 

  constructor() {
    GSM.EventController.generalActionFire.subscribe(this.onGridChange.bind(this))
    GSM.GridController.newGridCreated.subscribe(this.onGridChange.bind(this))
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

  private onGridChange(event: GeneralAction<any>) {
    if(!GSM?.GridController?.gameMap) { return }

    GSM.GridController.iterateElevations(elevation => {
      GSM.CanvasModuleController.canvasModules.forEach(module => {
        const image = this.generateElevationImage(module.renderers, elevation.elevationIndex)
        this.elevationLayersImages[elevation.elevationIndex] = image
      })
    })
  }

  public generateElevationImage(renderers: Renderer[], elevationIndex: number): HTMLImageElement {
    if(!GSM.CanvasController.fullImageCTX) { return null }

    GSM.CanvasController.fullImageCTX.canvas.width = GSM.GridController.gameMap.size.width * GSM.Settings.blockSize
    GSM.CanvasController.fullImageCTX.canvas.height = GSM.GridController.gameMap.size.height * GSM.Settings.blockSize
       
    let tempCTX 
    renderers.forEach((renderer)=> {
      if(renderer.excludeFromIndividualCellPainting) { return }
     
      tempCTX = renderer.ctx
      renderer.ctx = GSM.CanvasController.fullImageCTX

      GSM.GridController.iterateCells(elevationIndex, (cell) => {
        renderer.draw(cell, elevationIndex)
      })
      renderer.ctx = tempCTX
    })

    const layerImageBase64 = GSM.CanvasController.fullImageCanvas.nativeElement.toDataURL("image/png")
    const layerImage = new Image()
    layerImage.src = layerImageBase64


    return layerImage
  }
}
