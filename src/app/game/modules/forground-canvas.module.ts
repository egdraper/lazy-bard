
import { CanvasCTX, Extension } from "src/app/game/models/extension.model"
import { Renderer } from "src/app/game/models/renderer"
import { RootCanvasModule } from "./root.module"

import { AssetBrushFeature } from "../core/default-features/brushes/asset-brush.feature"
import { SelectorExtension } from "../core/default-features/selector/selector.feature"
import { InteractionExtension } from "../features/interactions/interaction.extension"
import { TerrainBrushExtension } from "../core/default-features/brushes/terrain-brush.feature"
import { SelectionIndicatorRenderer } from "../core/default-renderers/selection-indicator.renderer"
import { SelectorRenderer } from "../core/default-renderers/selector.renderer"
import { TerrainRenderer } from "../core/default-renderers/terrain.renderer"
import { AssetRenderer } from "../core/default-renderers/asset.renderer"
import { ObjectRenderer } from "../core/default-renderers/object.renderer"

export class ForegroundCanvasModule extends RootCanvasModule {
  public ctx = CanvasCTX.Foreground
  public canvasName: string = "foreground"

  public extensions: Extension[] = [
    new TerrainBrushExtension(),
    new AssetBrushFeature(),
    new SelectorExtension(),
    new InteractionExtension(),
  ]
  
  // order matters for drawing, index '0' draws first.
  public renderers: Renderer[] = [
    new SelectionIndicatorRenderer(),
    new AssetRenderer(),
    new ObjectRenderer(),
    new SelectorRenderer(),
    new TerrainRenderer(),
  ]
}