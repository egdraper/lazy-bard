import { CanvasLayerExtension } from "../../../../models/renderer";
import { GridLinesRenderer } from "./grid-lines.renderer";

export class GridLineExtension extends CanvasLayerExtension {
  public override excludeFromIndividualCellPainting = true
  public renderer = new GridLinesRenderer()
}