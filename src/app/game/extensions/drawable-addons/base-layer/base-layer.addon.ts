import { GSM } from "src/app/game/game-state-manager.service";
import { AddOnExtension, CanvasCTX, Extension } from "../../../models/extension.model";
import { ElevationLayers } from "../../../models/map";
import { AddOnBase } from "../../addon-base";
import { ImageGenerator } from "../image.generator";
import { BaseTextureExtension } from "./base-texture/base-texture.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";

export class BaseLayerAddOn extends AddOnBase {
  public id = "BaseLayerAddOn"
  public visibleName = "Base Layer"
  public zIndex: number = 1
  public largeImage: HTMLImageElement = null
  public ctx = CanvasCTX.Background
  public override excludeFromIndividualCellPainting = true
  
  public extensions: AddOnExtension[] = [
    new BaseTextureExtension(),
    new GridLineExtension(),
  ]

  constructor() {
    super()
  }

  public override async init(): Promise<void> {
    await super.init()
    setTimeout(() => {
      this.onGenerateBackground()
    }, 500)
  }

  private onGenerateBackground(): void {
    const renderers = this.extensions.map(extension => extension.renderer)
    const image = ImageGenerator.generateLayerImage(renderers)
    GSM.RendererController.BaseCanvasRenderer.image = image    
  }
}