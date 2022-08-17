import { CanvasLayerExtension } from "../../models/renderer";
import { GridLinesRenderer } from "../../renderers/grid-lines.renderer";

export class GridLineExtension extends CanvasLayerExtension {
  public renderer = new GridLinesRenderer()
  public gameMasterView: Boolean = true
  public gamePlayerView: Boolean = true
}