
import { CanvasCTX, Extension } from "src/app/game/models/extension.model";
import { ElevationLayers } from "src/app/game/models/map";
import { LayerAddOn } from "../../layer-extension";
import { MovableAssetExtension } from "./movable-asset/movable-asset.extension";
import { SelectionIndicatorExtension } from "./selection-indicator/selection-indicator.extension";

export class CharacterLayerAddon extends LayerAddOn {
  public id = "CharacterLayerAddOn"
  public visibleName = "Character Layer"
  public layerName = ElevationLayers.CharacterLayer
  public zIndex: number = 10
  public largeImage: HTMLImageElement = null
  public ctx = CanvasCTX.Foreground
 
  public override excludeFromSingleImagePainting: boolean = true

  public extensions: Extension[] = [
    new MovableAssetExtension(),
    new SelectionIndicatorExtension()
  ]
}