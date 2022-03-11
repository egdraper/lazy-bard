
import { CanvasCTX, Extension } from "src/app/game/models/extension.model";
import { ElevationLayers } from "src/app/game/models/map";
import { AddOnBase } from "../../addon-base";
import { PlayableAssetExtension } from "./playable-asset/playable-asset.extension";
import { SelectionIndicatorExtension } from "./selection-indicator/selection-indicator.extension";

export class MovableItemsAddon extends AddOnBase {
  public id = "MovableItemsAddOn"
  public visibleName = "Movable Items"
  public zIndex: number = 10
  public largeImage: HTMLImageElement = null
  public ctx = CanvasCTX.Foreground
 
  public override excludeFromSingleImagePainting: boolean = true

  public extensions: Extension[] = [
    new PlayableAssetExtension(),
    new SelectionIndicatorExtension()
  ]
}