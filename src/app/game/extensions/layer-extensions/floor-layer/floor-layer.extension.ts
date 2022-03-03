
import { Extension } from "src/app/game/models/extension.model";
import { ElevationLayers } from "src/app/game/models/map";
import { LayerExtension } from "../../layer-extension";
import { MovableAssetExtension } from "./movable-asset/movable-asset.extension";


export class FloorLayerExtension extends LayerExtension {
  public layer = ElevationLayers.FloorObjectLayer
  public zIndex: number = 2
  public largeImage: HTMLImageElement = null
  public extensions: Extension[] = [
    new MovableAssetExtension(),
  ]
}