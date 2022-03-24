
import { CanvasCTX } from "src/app/game/models/extension.model";
import { CanvasLayerExtension } from "src/app/game/models/renderer";
import { CanvasModule } from "../../addon-base";

import { PlayableAssetExtension } from "./playable-asset/playable-asset.extension";
import { SelectionIndicatorExtension } from "./selection-indicator/selection-indicator.extension";
import { TerrainTextureExtension } from "./terrain-texture/terrain-texture.extension";

export class ForegroundCanvasModule extends CanvasModule {
  public ctx = CanvasCTX.Foreground

  // order matters for drawing, index '0' draws first.
  public extensions: CanvasLayerExtension[] = [
    new TerrainTextureExtension,
    new SelectionIndicatorExtension(),
    new PlayableAssetExtension()
  ]
}