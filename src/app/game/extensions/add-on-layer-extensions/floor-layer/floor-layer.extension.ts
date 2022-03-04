
import { CanvasCTX, Extension } from "src/app/game/models/extension.model";
import { ElevationLayers } from "src/app/game/models/map";
import { LayerAddOn } from "../../layer-extension";
import { MovableAssetExtension } from "./movable-asset/movable-asset.extension";

export class FloorLayerAddOn extends LayerAddOn {
  public id = "FloorLayerAddOn"
  public layer = ElevationLayers.FloorObjectLayer
  public zIndex: number = 2
  public largeImage: HTMLImageElement = null
  public ctx = CanvasCTX.Foreground

  public extensions: Extension[] = [
    new MovableAssetExtension(),
  ]
}