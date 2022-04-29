import { CanvasModule } from '../extensions/addon-base';
import { Extension } from '../models/extension.model';

export class CanvasModuleController {
  public canvasModules: CanvasModule[] = [];

  public registerModule(canvasModule: CanvasModule) {
    this.canvasModules.push(canvasModule);
  }
}
