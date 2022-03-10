import { Cell, MapAssetImageCell } from "./map"

export abstract class PaintBase {
  public abstract paintOrder: number
  public ctx: CanvasRenderingContext2D
}

export abstract class Painter extends PaintBase {  
  public mapAssets: {[id: string]: MapAssetImageCell} = {}
  public abstract paint(cell: Cell, frame?: number): void
}

