import { GSM } from "../game-state-manager.service"
import { Extension } from "./extension.model"
import { Cell, RenderingLayers } from "./map"
import { TerrainTile } from "./sprite-tile.model"

export abstract class RendererBase {
  public ctx: CanvasRenderingContext2D
}

export class RenderOptionsEvent {
  cell?: Cell
  terrainTile?: TerrainTile
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
    renderOption.terrainTile = renderOption.cell.terrainTiles[this.renderingLayer]
    this.onDraw(renderOption)
  }
}

export abstract class CanvasLayerExtension extends Extension {
  public abstract renderer: Renderer
  public excludeFromIndividualCellPainting = false
}

