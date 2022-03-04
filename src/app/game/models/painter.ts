import { Cell, ElevationLayers, ImageTile } from "./map"

export abstract class PaintBase {
  public abstract paintOrder: number
  public ctx: CanvasRenderingContext2D
}

export abstract class Painter extends PaintBase {  
  public abstract paint(cell: Cell, frame?: number): void
}

export abstract class ImagePainter extends Painter {
  public abstract images?: {[imageId: string]: HTMLImageElement}
}

export abstract class FramePainter extends PaintBase {
  public images?: {[imageId: string]: HTMLImageElement}

  public abstract paint(frame?: number): void
}