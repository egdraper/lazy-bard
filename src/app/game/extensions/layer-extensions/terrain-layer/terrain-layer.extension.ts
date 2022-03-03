
import { Extension } from "src/app/game/models/extension.model";
import { ElevationLayers } from "src/app/game/models/map";
import { LayerExtension } from "../../layer-extension";
import { TerrainPainterExtension } from "./terrain-painter/terrain-painter.extension";

export class TerrainLayerExtension extends LayerExtension {
  public layer = ElevationLayers.TerrainLayer
  public zIndex: number = 3
  public largeImage: HTMLImageElement = null
  public extensions: Extension[] = [
    new TerrainPainterExtension()
  ]
}