import { GSM } from "src/app/game/game-state-manager.service";
import { CanvasLayerExtension } from "src/app/game/models/renderer";
import { GeneralAction } from "src/app/game/models/settings";
import { generateElevationImage } from "src/app/game/controllers/utils/create-layer-image";
import { CanvasCTX } from "../../../models/extension.model";
import { CanvasModule } from "../../addon-base";
import { BaseTextureExtension } from "./base-texture/base-texture.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";

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
    renderers.forEach(renderer => renderer.excludeFromIndividualCellPainting = false)
    
    GSM.ImageController.baseLayerImage = generateElevationImage(renderers, GSM.ElevationController.baseElevationLayerIndex)
    renderers.forEach(renderer => renderer.excludeFromIndividualCellPainting = true)
  }
}