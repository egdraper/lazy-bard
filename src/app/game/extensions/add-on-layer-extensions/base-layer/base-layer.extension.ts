import { GSM } from "src/app/game/game-state-manager.service";
import { CanvasCTX, Extension } from "../../../models/extension.model";
import { ElevationLayers } from "../../../models/map";
import { LayerAddOn } from "../../layer-extension";
import { BackgroundExtension } from "./background/background.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";
import { SelectionIndicatorExtension } from "../character-layer/selection-indicator/selection-indicator.extension";

export class BaseLayerAddOn extends LayerAddOn {
  public id = "BaseLayerAddOn"
  public visibleName = "Base Layer"
  public layerName = ElevationLayers.BaseLayer
  public zIndex: number = 1
  public largeImage: HTMLImageElement = null
  public ctx = CanvasCTX.Background
  
  public extensions: Extension[] = [
    new BackgroundExtension(),
    new GridLineExtension(),
  ]

  constructor() {
    super()
    GSM.EventController.generalActionFire.subscribe(action => {
      if(action.name === "generateBackground") {
        const image = this.generateLayerImage()
        this.paintLayerAsSingleImage = true
        this.layerPainter.image = image
      }
    })
  }
}