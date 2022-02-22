import { Cell, ImageTile } from "./map"

export abstract class Painter {
  public ctx: CanvasRenderingContext2D
  public images?: {[imageId: string]: HTMLImageElement}

  public abstract paint(cell: Cell): void
}