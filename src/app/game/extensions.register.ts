import { BaseCanvasModule } from './extensions/canvas-addons/base-canvas-layer/base-canvas-layer.module';
import { ForegroundCanvasModule } from './extensions/canvas-addons/foreground-canvas-layer/forground-canvas-layer.module';
import { TerrainCliffBrushExtension } from './extensions/structural-addons/terrain-cliff-brush/terrain-cliff-brush.extension';
import { TerrainEraserExtension } from './extensions/structural-addons/terrain-eraser/eraser.event.extension';
import { TerrainTreeBrushExtension } from './extensions/structural-addons/terrain-tree-brush/terrain-tree-brush.extension';



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


