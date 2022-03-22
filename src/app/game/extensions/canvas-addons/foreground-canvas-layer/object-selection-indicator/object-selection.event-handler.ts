import { GSM } from "src/app/game/game-state-manager.service";
import { Cell, RenderingLayers } from "src/app/game/models/map";

export class ObjectSelectionEventHandler {
  onKeyDown: any;
  constructor() {
    GSM.AssetController.spriteTileClicked.subscribe(this.spriteTileClicked.bind(this));
    GSM.EventController.keyDown.subscribe(this.onKeyDown.bind(this));
  }

  private spriteTileClicked(event: {cell: Cell, layer: RenderingLayers}): void {    
    event.cell.spriteTiles[event.layer]
  }
}