import { Cell, ElevationLayers, ImageTile } from "./map"

export abstract class Painter {
  public paintOrder: number
  public ctx: CanvasRenderingContext2D
  public images?: {[imageId: string]: HTMLImageElement}

  public abstract paint(cell: Cell, frame?: number): void
}