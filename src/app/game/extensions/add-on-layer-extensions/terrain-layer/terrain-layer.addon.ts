
import { CanvasCTX, Extension } from "src/app/game/models/extension.model";
import { ElevationLayers } from "src/app/game/models/map";
import { LayerAddOn } from "../../layer-extension";
import { TerrainPainterExtension } from "./terrain-painter/terrain-painter.extension";

export class TerrainLayerAddOn extends LayerAddOn {
  public id = "TerrainLayerAddOn"
  public layer = ElevationLayers.TerrainLayer
  public zIndex: number = 3
  public largeImage: HTMLImageElement = null
  public ctx = CanvasCTX.Foreground
  
  public extensions: Extension[] = [
    new TerrainPainterExtension()
  ]
}