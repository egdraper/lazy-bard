import { GSM } from "../game-state-manager.service"
import { Extension } from "./extension.model"
import { Cell, RenderingLayers, SpriteTile } from "./map"

export abstract class RendererBase {
  public ctx: CanvasRenderingContext2D
}

export abstract class Renderer extends RendererBase {
  public abstract onDraw(cell: Cell, spriteTile: SpriteTile, elevationIndex: number, frame?: number)
  public abstract elevationLayer: RenderingLayers
  public excludeFromSingleImagePainting: boolean = false // excludes this extension from background being rendered as part of a single image 
  public excludeFromIndividualCellPainting: boolean = false // excludes this extension from background being rendered as part of a single image 
  
  public draw(cell: Cell, layer: RenderingLayers, elevationIndex: number, frame?: number): void {
    if(this.elevationLayer !== layer) { return }
    
    const spriteTile = cell.spriteTiles[layer]
    this.onDraw(cell, spriteTile, elevationIndex, frame )
  }
}

export abstract class CanvasLayerExtension extends Extension {
  public abstract renderer: Renderer
  public excludeFromIndividualCellPainting = false
}

