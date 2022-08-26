import { RootCanvasModule } from '../modules/root.module';

export class CanvasModuleManager {
  public canvasModules: RootCanvasModule[] = [];

  public registerModule(canvasModule: RootCanvasModule) {
    this.canvasModules.push(canvasModule);
  }
}
