import { generateBackgroundImage } from "src/app/game/controllers/utils/create-background-image";
import { GSM } from "src/app/game/game-state-manager.service";
import { Renderer } from "src/app/game/models/renderer";
import { GeneralAction } from "src/app/game/models/settings";
import { BaseTextureExtension } from "../extensions/base-texture/base-texture.extension";
import { CanvasCTX, Extension } from "../models/extension.model";
import { BaseTextureRenderer } from "../common-renderers/base-texture.renderer";
import { GridLinesRenderer } from "../common-renderers/grid-lines.renderer";
import { RootCanvasModule } from "./root.module";

export class BaseCanvasModule extends RootCanvasModule {
  public ctx = CanvasCTX.Background
  public canvasName: string = "base"
 
  // order matters for rendering
  public extensions: Extension[] = [
    new BaseTextureExtension(),
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
    generateBackgroundImage(this.renderers)
  }
}