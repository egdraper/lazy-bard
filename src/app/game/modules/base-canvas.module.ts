import { generateBackgroundImage } from "src/app/game/controllers/utils/create-background-image";
import { GSM } from "src/app/game/game-state-manager.service";
import { CanvasLayerExtension } from "src/app/game/models/renderer";
import { GeneralAction } from "src/app/game/models/settings";
import { CanvasCTX } from "../models/extension.model";
import { CanvasModule } from "../extensions/addon-base";
import { BaseTextureExtension } from "../extensions/base-texture/base-texture.extension";
import { GridLineExtension } from "../extensions/grid-lines/grid-lines.extension";

export class BaseCanvasModule extends CanvasModule {
  public ctx = CanvasCTX.Background
 
  // order matters for rendering
  public extensions: CanvasLayerExtension[] = [
    new BaseTextureExtension(),
    new GridLineExtension(),
  ]


  constructor() {
    super()
    GSM.EventController.generalActionFire.subscribe(this.onGenerateBackground.bind(this))
  }

  private onGenerateBackground(event: GeneralAction): void {
    if (event.name !== "startGame") { return }
    const renderers = this.extensions.map(extension => extension.renderer)
    GSM.ImageController.baseLayerImage = generateBackgroundImage(renderers)
  }
}