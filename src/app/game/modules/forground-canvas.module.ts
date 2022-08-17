
import { CanvasCTX, Extension } from "src/app/game/models/extension.model"
import { CanvasLayerExtension } from "src/app/game/models/renderer"
import { RootCanvasModule } from "./root.module"
import { AssetExtension } from "../extensions/asset/asset.extension"
import { ObjectExtension } from "../extensions/asset/object.extension"

import { SelectionIndicatorExtension } from "../extensions/selection-indicator/selection-indicator.extension"
import { TerrainBrushExtension } from "../extensions/terrain-brush/terrain-brush.extension"
import { SelectorExtension } from "../extensions/asset/selector.extension"
import { TerrainExtension } from "../extensions/terrain-brush/terrain.extension"
import { AssetBrushExtension } from "../extensions/asset/asset-brush.extension"
import { InteractionsController } from "../controllers/interactions.controller"
import { InteractionExtension } from "../extensions/interacting/interaction.extension"

export class ForegroundCanvasModule extends RootCanvasModule {
  public ctx = CanvasCTX.Foreground
  public canvasName: string = "foreground"

  // order matters for drawing, index '0' draws first.
  public extensions: Extension[] = [
    new SelectionIndicatorExtension(),
    new TerrainExtension(),
    new TerrainBrushExtension(),
    new ObjectExtension(),
    new AssetExtension(),
    new AssetBrushExtension(),
    new SelectorExtension(),
    new InteractionExtension(),
  ]
}