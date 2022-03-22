import { terrainCleanup } from '../../../support/terrain-cleanup';
import { GSM } from '../../../game-state-manager.service';
import { Cell, RenderingLayers } from '../../../models/map';

export class EraserEventHandler {
  constructor() {
    GSM.AssetController.spriteTileClicked.subscribe(this.spriteTileClicked.bind(this));
  }

  private spriteTileClicked(event: {cell: Cell, layer: RenderingLayers}): void {    
    if(GSM.EventController.generalActionFire.value.name === "deleteTerrain") {
      delete event.cell.spriteTiles[RenderingLayers.TerrainLayer]
      terrainCleanup(event.layer)     
    }
  }
}