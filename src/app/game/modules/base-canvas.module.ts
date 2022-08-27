import { GSM } from "src/app/game/game-state-manager.service";
import { Renderer } from "src/app/game/models/renderer";
import { GeneralAction } from "src/app/game/models/settings";
import { CanvasCTX, Extension } from "../models/extension.model";
import { RootCanvasModule } from "./root.module";
import { FullImageGenerator } from "../core/utils/create-background-image";
import { BaseTextureRenderer } from "../core/default-renderers/base-texture.renderer";
import { GridLinesRenderer } from "../core/default-renderers/grid-lines.renderer";
import { Action } from "../models/base.interaction";

export class BaseCanvasModule extends RootCanvasModule {
  public ctx = CanvasCTX.Background
  public canvasName: string = "base"
 
  // order matters for rendering
  public extensions: Extension[] = [

  ]

  public renderers: Renderer[] = [
    new BaseTextureRenderer(),
    new GridLinesRenderer(),
  ]

  constructor() {
    super()
    GSM.EventManager.generalActionFire.subscribe(this.onGenerateBackground.bind(this))
  }

  private onGenerateBackground(event: GeneralAction): void {
    if (event.name !== "startGame") { return }
    FullImageGenerator.generateBackgroundImage(this.renderers)
  }
}