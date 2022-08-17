
import { CanvasCTX, Extension } from "src/app/game/models/extension.model"
import { Renderer } from "src/app/game/models/renderer"
import { RootCanvasModule } from "./root.module"

import { AssetBrushExtension } from "../extensions/asset/asset-brush.extension"
import { SelectorExtension } from "../extensions/asset/selector.extension"
import { InteractionExtension } from "../extensions/interacting/interaction.extension"
import { TerrainBrushExtension } from "../extensions/terrain-brush/terrain-brush.extension"
import { TerrainExtension } from "../extensions/terrain-brush/terrain.extension"
import { AssetRenderer } from "../renderers/asset.renderer"
import { ObjectRenderer } from "../renderers/object.renderer"
import { SelectionIndicatorRenderer } from "../renderers/selection-indicator.renderer"
import { SelectorRenderer } from "../renderers/selector.renderer"
import { TerrainRenderer } from "../renderers/terrain.renderer"

export class ForegroundCanvasModule extends RootCanvasModule {
  public ctx = CanvasCTX.Foreground
  public canvasName: string = "foreground"

  // order matters for drawing, index '0' draws first.
  public extensions: Extension[] = [
    new TerrainExtension(),
    new TerrainBrushExtension(),
    new AssetBrushExtension(),
    new SelectorExtension(),
    new InteractionExtension(),
  ]

  public renderers: Renderer[] = [
    new AssetRenderer(),
    new ObjectRenderer(),
    new SelectionIndicatorRenderer(),
    new SelectorRenderer(),
    new TerrainRenderer(),
  ]
}