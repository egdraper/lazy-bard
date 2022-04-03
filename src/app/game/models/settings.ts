import { Speed } from "./asset.model"

export class Settings {
  public blockSize = 16
  public commonTextureWidth = 3
  public commonTextureOdds = 250
  public speed: number = 6
  public scale: number = 2
  public blockToFeet = 5;

  // visuals
  public mouseHoverX: number = 0
  public mouseHoverY: number = 0
  public cellId: string = ""
}

export class CanvasSpecs {
  public width: number
  public height: number
}

export class GeneralAction<T = unknown> {
  name: string
  data: T
}
