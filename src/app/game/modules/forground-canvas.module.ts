
import { CanvasCTX } from "src/app/game/models/extension.model"
import { CanvasLayerExtension } from "src/app/game/models/renderer"
import { CanvasModule } from "../extensions/addon-base"

import { PlayableAssetExtension } from "../extensions/character/character.extension"
import { ObjectExtension } from "../extensions/object/object.extension"
import { SelectionIndicatorExtension } from "../extensions/selection-indicator/selection-indicator.extension"
import { TerrainTextureExtension } from "../extensions/terrain-texture/terrain-texture.extension"

export class ForegroundCanvasModule extends CanvasModule {
  public ctx = CanvasCTX.Foreground

  // order matters for drawing, index '0' draws first.
  public extensions: CanvasLayerExtension[] = [
    new TerrainTextureExtension,
    new SelectionIndicatorExtension(),
    new ObjectExtension(),
    new PlayableAssetExtension(), 
  ]
}