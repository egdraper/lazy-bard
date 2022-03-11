
import { CanvasCTX, Extension } from "../../../models/extension.model";
import { ElevationLayers } from "../../../models/map";
import { AddOnBase } from "../../addon-base";
import { TerrainPainterExtension } from "./terrain-paint-brush/terrain-paint-brush.extension";

export class TerrainLayerAddOn extends AddOnBase {
  public id = "TerrainLayerAddOn"
  public visibleName = "Terrain Layer"
  public layerName = ElevationLayers.TerrainLayer
  public zIndex: number = 3
  public largeImage: HTMLImageElement = null
  public ctx = CanvasCTX.Foreground
  
  public extensions: Extension[] = [
    new TerrainPainterExtension()
  ]
}