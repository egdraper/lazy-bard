import { Cell, MapAssetImageCell } from "./map"

export abstract class RendererBase {
  public abstract paintOrder: number
  public ctx: CanvasRenderingContext2D
}

export abstract class Renderer extends RendererBase {  
  public mapAssets: {[id: string]: MapAssetImageCell} = {}
  public abstract draw(cell: Cell, frame?: number): void
}

