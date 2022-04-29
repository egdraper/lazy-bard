import { BaseCanvasModule } from './extensions/renderable/base-canvas/base-canvas-layer.module';
import { ForegroundCanvasModule } from './extensions/renderable/foreground-canvas/forground-canvas-layer.module';
import { TerrainEraserExtension } from './extensions/non-renderable/terrain-eraser/eraser.event.extension';
import { TerrainTreeBrushExtension } from './extensions/non-renderable/terrain-brush/terrain-brush.extension';

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


