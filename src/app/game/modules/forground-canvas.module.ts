
import { CanvasCTX } from "src/app/game/models/extension.model"
import { CanvasLayerExtension } from "src/app/game/models/renderer"
import { CanvasModule } from "../extensions/addon-base"
import { AssetExtension } from "../extensions/asset/asset.extension"
import { ObjectExtension } from "../extensions/asset/object.extension"

import { SelectionIndicatorExtension } from "../extensions/selection-indicator/selection-indicator.extension"
import { TerrainTextureExtension } from "../extensions/terrain-texture/terrain-texture.extension"

export class ForegroundCanvasModule extends CanvasModule {
  public ctx = CanvasCTX.Foreground
  public canvas: string = "foreground"

  // order matters for drawing, index '0' draws first.
  public extensions: CanvasLayerExtension[] = [
    new TerrainTextureExtension,
    new SelectionIndicatorExtension(),
    new ObjectExtension(),
    new AssetExtension(),
  ]
}