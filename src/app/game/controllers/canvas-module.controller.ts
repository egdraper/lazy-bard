import { CanvasModule } from '../extensions/addon-base';

export class CanvasModuleController {
  public canvasModules: CanvasModule[] = [];

  public registerAddon(canvasModule: CanvasModule) {
    this.canvasModules.push(canvasModule);
  }
}
