import { BaseCanvasModule } from './modules/base-canvas.module';
import { ForegroundCanvasModule } from './modules/forground-canvas.module';
import { TerrainEraserExtension } from './extensions/terrain-eraser/eraser.event.extension';
import { TerrainTreeBrushExtension } from './extensions/terrain-brush/terrain-brush.extension';

export class Extensions {
    public addon = [
      new BaseCanvasModule(),
      new ForegroundCanvasModule(),
      new TerrainTreeBrushExtension(),
      new TerrainEraserExtension()
    ]

    public async init(): Promise<void> {
      const promises = []
      this.addon.forEach(addon => {
        promises.push(addon.init())
      })

      await Promise.all(promises)
    }
  }


