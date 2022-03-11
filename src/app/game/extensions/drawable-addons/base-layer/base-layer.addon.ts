import { CanvasCTX, Extension } from "../../../models/extension.model";
import { ElevationLayers } from "../../../models/map";
import { AddOnBase } from "../../addon-base";
import { BaseTextureExtension } from "./base-texture/base-texture.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";

export class BaseLayerAddOn extends AddOnBase {
  public id = "BaseLayerAddOn"
  public visibleName = "Base Layer"
  public layerName = ElevationLayers.BaseLayer
  public zIndex: number = 1
  public largeImage: HTMLImageElement = null
  public ctx = CanvasCTX.Background
  
  public extensions: Extension[] = [
    new BaseTextureExtension(),
    new GridLineExtension(),
  ]

  constructor() {
    super()
  }
}