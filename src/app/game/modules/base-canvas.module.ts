import { generateBackgroundImage } from "src/app/game/controllers/utils/create-background-image";
import { GSM } from "src/app/game/game-state-manager.service";
import { CanvasLayerExtension, Renderer } from "src/app/game/models/renderer";
import { GeneralAction } from "src/app/game/models/settings";
import { CanvasCTX } from "../models/extension.model";
import { RootCanvasModule } from "./root.module";
import { BaseTextureExtension } from "../extensions/base-texture/base-texture.extension";
import { GridLineExtension } from "../extensions/grid-lines/grid-lines.extension";
import { BaseTextureRenderer } from "../renderers/base-texture.renderer";
import { GridLinesRenderer } from "../renderers/grid-lines.renderer";

export class BaseCanvasModule extends RootCanvasModule {
  public ctx = CanvasCTX.Background
  public canvasName: string = "base"
 
  // order matters for rendering
  public extensions: CanvasLayerExtension[] = [
    new BaseTextureExtension(),
    new GridLineExtension(),
  ]

  public renderers: Renderer[] = [
    new BaseTextureRenderer(),
    new GridLinesRenderer(),
  ]

  constructor() {
    super()
    GSM.EventController.generalActionFire.subscribe(this.onGenerateBackground.bind(this))
  }

  private onGenerateBackground(event: GeneralAction): void {
    if (event.name !== "startGame") { return }
    const renderers = this.extensions.map(extension => extension.renderer)
    generateBackgroundImage(renderers)
  }
}