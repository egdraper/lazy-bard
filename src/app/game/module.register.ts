import { BaseCanvasModule } from './modules/base-canvas.module';
import { ForegroundCanvasModule } from './modules/forground-canvas.module';
import { TerrainBrushExtension } from './core/default-features/brushes/terrain-brush.feature';

export class CanvasModules {
    public modules = [
      new BaseCanvasModule(),
      new ForegroundCanvasModule(),
    ]

    public async init(): Promise<void> {
      const promises = []
      this.modules.forEach(module => {
        promises.push(module.init())
      })

      await Promise.all(promises)
    }
  }


