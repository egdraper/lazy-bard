import { GSM } from "src/app/game/game-state-manager.service";
import { CanvasCTX, Extension } from "../../../models/extension.model";
import { ElevationLayers } from "../../../models/map";
import { LayerAddOn } from "../../layer-extension";
import { BackgroundExtension } from "./background/background.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";
import { SelectionIndicatorExtension } from "./selection-indicator/selection-indicator.extension";

export class BaseLayerAddOn extends LayerAddOn {
  public id = "BaseLayerAddOn"
  public layer = ElevationLayers.BaseLayer
  public zIndex: number = 1
  public largeImage: HTMLImageElement = null
  public ctx = CanvasCTX.Background
  
  public extensions: Extension[] = [
    new BackgroundExtension(),
    new GridLineExtension(),
    new SelectionIndicatorExtension()
  ]
}