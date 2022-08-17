import { drawableItems } from '../../db/drawable-items.db';
import { GSM } from '../../game-state-manager.service';
import { CanvasLayerExtension } from '../../models/renderer';
import { DrawableTile } from '../../models/sprite-tile.model';
import { TerrainTreeBrushEventHandler } from './terrain-brush';
import { TerrainPaintBrushRenderer } from './terrain.renderer';

export class TerrainBrushExtension extends CanvasLayerExtension {
  public renderer = new TerrainPaintBrushRenderer()
  public gameMasterView: boolean = true
  public gamePlayerView: Boolean = false

  public override async init(): Promise<void> {
    new TerrainTreeBrushEventHandler();
  }
}
