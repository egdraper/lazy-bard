import { GSM } from "../game-state-manager.service"
import { Extension } from "./extension.model"
import { Cell, RenderingLayers, SpriteTile } from "./map"

export abstract class RendererBase {
  public ctx: CanvasRenderingContext2D
}

export class RenderOptionsEvent {
  cell?: Cell
  spriteTile?: SpriteTile
  elevationIndex?: number
  frame?: number
}

export abstract class Renderer extends RendererBase {
  public abstract onDraw(renderOptions: RenderOptionsEvent)
  public abstract renderingLayer: RenderingLayers
  public excludeFromSingleImagePainting: boolean = false // excludes this extension from background being rendered as part of a single image 
  public excludeFromIndividualCellPainting: boolean = false // excludes this extension from background being rendered as part of a single image 
  public drawOnFrameOnly = false
  
  public draw(renderOption: RenderOptionsEvent): void {
    renderOption.spriteTile = renderOption.cell.spriteTiles[this.renderingLayer]
    this.onDraw(renderOption)
  }
}

export abstract class CanvasLayerExtension extends Extension {
  public abstract renderer: Renderer
  public excludeFromIndividualCellPainting = false
}

