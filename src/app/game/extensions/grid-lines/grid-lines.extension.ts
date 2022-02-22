import { GSM } from "../../game-state-manager.service";
import { GridLinesPainter } from "./grid-lines.painter";

export class GridLineExtension {
  private painter = new GridLinesPainter()

  constructor() {
    GSM.PaintController.registerPainter(this.painter)
  }
}