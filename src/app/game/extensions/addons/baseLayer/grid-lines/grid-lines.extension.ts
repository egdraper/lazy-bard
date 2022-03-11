import { AddOnExtension } from "src/app/game/models/extension.model";
import { GridLinesPainter } from "./grid-lines.painter";

export class GridLineExtension implements AddOnExtension {
  public id = "GridLineExtension"
  public painter = new GridLinesPainter()
}