import { Extension } from 'src/app/game/models/extension.model';
import { TerrainCliffBrushEventHandler } from './terrain-cliff-brush.event-handler';

export class TerrainCliffBrushExtension extends Extension {
  public override async init(): Promise<void> {
    new TerrainCliffBrushEventHandler();
  }
}
