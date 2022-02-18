export interface Painter {
  ctx: CanvasRenderingContext2D
  paint(): () => void
}