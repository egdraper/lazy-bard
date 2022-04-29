import { GSM } from "../game-state-manager.service"
import { Extension } from "./extension.model"
import { Cell, Grid, RenderingLayers } from "./map"
import { BackgroundTile, GridAsset, TerrainTile } from "./sprite-tile.model"

export interface Renderer {
  ctx: CanvasRenderingContext2D
  renderingLayer: RenderingLayers
  beforeDraw?: (asset: GridAsset, frame?: number) => void
  onDraw?: (any: GridAsset, frame?: number) => void
  afterDraw?: (any: GridAsset, frame?: number) => void
}

export interface BackgroundRenderer extends Renderer {
  beforeDraw?: (asset: BackgroundTile, frame?: number) => void
  onDraw?: (tile: BackgroundTile, frame?: number ) => void 
  afterDraw?: (any: BackgroundTile, frame?: number) => void
}

export class RenderOptionsEvent {
  terrainTile?: TerrainTile
  frame?: number
}



// export interface FrameRenderer extends Renderer {
//   onDraw: (frame: Number ) => void
// }

// export interface CellRenderer extends Renderer {
//   onDraw: (cell: Cell, frame?: number) => void
// }

export abstract class CanvasLayerExtension extends Extension {
  public abstract renderer: Renderer
  public excludeFromIndividualCellPainting = false
}

