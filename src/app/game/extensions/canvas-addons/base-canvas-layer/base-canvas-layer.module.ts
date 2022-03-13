import { GSM } from "src/app/game/game-state-manager.service";
import { CanvasLayerExtension } from "src/app/game/models/renderer";
import { CanvasCTX } from "../../../models/extension.model";
import { CanvasModule } from "../../addon-base";
import { ImageGenerator } from "../image-generator.util";
import { BaseTextureExtension } from "./base-texture/base-texture.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";

export class BaseCanvasModule extends CanvasModule {
  public ctx = CanvasCTX.Background
 
  // order matters for rendering
  public extensions: CanvasLayerExtension[] = [
    new BaseTextureExtension(),
    new GridLineExtension(),
  ]

  public override async init(): Promise<void> {
    await super.init()
    setTimeout(() => {
      this.onGenerateBackground()
    }, 500)
  }

  private onGenerateBackground(): void {
    const renderers = this.extensions.map(extension => extension.renderer)
    const image = ImageGenerator.generateLayerImage(renderers)
    GSM.RendererController.baseCanvasRenderer.image = image    
  }
}