import { drawableItems } from '../../db/drawable-items.db';
import { GSM } from '../../game-state-manager.service';
import { CanvasLayerExtension } from '../../models/renderer';
import { DrawableTile } from '../../models/sprite-tile.model';
import { TerrainTreeBrushEventHandler } from './terrain-brush';
import { TerrainRenderer } from '../../renderers/terrain.renderer';

export class TerrainBrushExtension extends CanvasLayerExtension {
  public renderer = new TerrainRenderer()
  public gameMasterView: boolean = true
  public gamePlayerView: Boolean = false

  public override async init(): Promise<void> {
    new TerrainTreeBrushEventHandler();
  }
}
