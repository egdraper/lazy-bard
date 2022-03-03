import { Extension } from "../../../../game/models/extension.model";
import { ElevationLayers } from "../../../../game/models/map";
import { LayerExtension } from "../../layer-extension";
import { BackgroundExtension } from "./background/background.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";
import { SelectionIndicatorExtension } from "./selection-indicator/selection-indicator.extension";

export class BaseLayerExtension extends LayerExtension {
  public layer = ElevationLayers.BaseLayer
  public zIndex: number = 1
  public largeImage: HTMLImageElement = null
  
  public extensions: Extension[] = [
    new BackgroundExtension(),
    new GridLineExtension(),
    new SelectionIndicatorExtension()
  ]
}