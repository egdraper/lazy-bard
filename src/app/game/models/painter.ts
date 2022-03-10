import { Cell, TerrainCell } from "./map"

export abstract class PaintBase {
  public abstract paintOrder: number
  public ctx: CanvasRenderingContext2D
}

export abstract class Painter extends PaintBase {  
  public drawGrid: {[id: string]: TerrainCell}
  public abstract paint(cell: Cell, frame?: number): void
}

