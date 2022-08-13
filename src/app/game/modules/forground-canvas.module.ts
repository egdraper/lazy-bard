
import { CanvasCTX } from "src/app/game/models/extension.model"
import { CanvasLayerExtension } from "src/app/game/models/renderer"
import { RootCanvasModule } from "./root.module"
import { AssetExtension } from "../extensions/asset/asset.extension"
import { ObjectExtension } from "../extensions/asset/object.extension"

import { SelectionIndicatorExtension } from "../extensions/selection-indicator/selection-indicator.extension"
import { TerrainBrushExtension } from "../extensions/terrain-brush/terrain-brush.extension"

export class ForegroundCanvasModule extends RootCanvasModule {
  public ctx = CanvasCTX.Foreground
  public canvasName: string = "foreground"

  // order matters for drawing, index '0' draws first.
  public extensions: CanvasLayerExtension[] = [
    new SelectionIndicatorExtension(),
    new TerrainBrushExtension(),
    new ObjectExtension(),
    new AssetExtension(),
  ]
}