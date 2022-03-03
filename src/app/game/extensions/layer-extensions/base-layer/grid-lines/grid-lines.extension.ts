import { Extension } from "src/app/game/models/extension.model";
import { GridLinesPainter } from "./grid-lines.painter";

export class GridLineExtension implements Extension {
  public painter = new GridLinesPainter()
}