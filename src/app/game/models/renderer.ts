import { Asset } from "./asset.model"
import { Extension } from "./extension.model"
import { RenderingLayers } from "./map"
import { BackgroundTile, TerrainTile } from "./sprite-tile.model"

export interface Renderer {
  ctx: CanvasRenderingContext2D
  renderingLayer: RenderingLayers
  beforeDraw?: (asset: Asset, frame?: number, opacity?: number) => void
  onDraw?: (any: Asset, frame?: number, opacity?: number) => void
  afterDraw?: (any: Asset, frame?: number, opacity?: number) => void
}

export interface BackgroundRenderer extends Renderer {
  beforeDraw?: (asset: BackgroundTile, frame?: number, opacity?: number) => void
  onDraw?: (tile: BackgroundTile, frame?: number, opacity?: number ) => void 
  afterDraw?: (any: BackgroundTile, frame?: number, opacity?: number) => void
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
}

