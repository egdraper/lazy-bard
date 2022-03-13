import { GSM } from "../game-state-manager.service"
import { Extension } from "./extension.model"
import { Cell, ElevationLayers, SpriteTile } from "./map"

export abstract class RendererBase {
  public ctx: CanvasRenderingContext2D
}

export abstract class Renderer extends RendererBase {
  public abstract onDraw(cell: Cell, spriteTile: SpriteTile, frame?: number)
  public abstract elevationLayer: ElevationLayers
  public excludeFromSingleImagePainting: boolean = false // excludes this extension from background being rendered as part of a single image 
  public excludeFromIndividualCellPainting: boolean = false // excludes this extension from background being rendered as part of a single image 
  
  public draw(cell: Cell, layer: ElevationLayers, frame?: number): void {
    if(this.elevationLayer !== layer) { return }
    
    const spriteTile = cell.spriteTiles[layer]
    this.onDraw(cell, spriteTile, frame )
  }
}

export abstract class CanvasLayerExtension extends Extension {
  public abstract renderer: Renderer
  public excludeFromIndividualCellPainting = false
}

