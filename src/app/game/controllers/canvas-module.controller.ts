import { RootCanvasModule } from '../modules/root.module';

export class CanvasModuleController {
  public canvasModules: RootCanvasModule[] = [];

  public registerModule(canvasModule: RootCanvasModule) {
    this.canvasModules.push(canvasModule);
  }
}
