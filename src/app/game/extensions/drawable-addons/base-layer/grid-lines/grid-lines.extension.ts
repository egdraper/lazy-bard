import { AddOnExtension } from "src/app/game/models/extension.model";
import { GridLinesRenderer } from "./grid-lines.renderer";

export class GridLineExtension implements AddOnExtension {
  public id = "GridLineExtension"
  public renderer = new GridLinesRenderer()
}