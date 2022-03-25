import { BaseCanvasModule } from './extensions/renderable/base-canvas/base-canvas-layer.module';
import { ForegroundCanvasModule } from './extensions/renderable/foreground-canvas/forground-canvas-layer.module';
import { TerrainCliffBrushExtension } from './extensions/non-renderable/terrain-cliff-brush/terrain-cliff-brush.extension';
import { TerrainEraserExtension } from './extensions/non-renderable/terrain-eraser/eraser.event.extension';
import { TerrainTreeBrushExtension } from './extensions/non-renderable/terrain-tree-brush/terrain-tree-brush.extension';



export class Extensions {
    public addon = [
      new BaseCanvasModule(),
      new ForegroundCanvasModule(),
      new TerrainTreeBrushExtension(),
      new TerrainCliffBrushExtension(),
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


