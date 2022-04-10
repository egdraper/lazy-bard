import { Extension } from 'src/app/game/models/extension.model';
import { TerrainTreeBrushEventHandler } from './terrain-brush.event-handler';

export class TerrainTreeBrushExtension extends Extension {
  public override async init(): Promise<void> {
    new TerrainTreeBrushEventHandler();
  }
}
