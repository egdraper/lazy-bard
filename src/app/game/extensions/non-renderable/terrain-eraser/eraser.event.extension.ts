import { Extension } from 'src/app/game/models/extension.model';
import { EraserEventHandler as TerrainEraserEventHandler } from './eraser.event-handler';

export class TerrainEraserExtension extends Extension {
  public override async init(): Promise<void> {
    new TerrainEraserEventHandler();
  }
}
