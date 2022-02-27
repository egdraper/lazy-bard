export class Settings {
  public blockSize = 32
  public commonTextureWidth = 3
  public commonTextureOdds = 250
  public regularAnimatedCharacterFramePosition = [0, 26, 52, 26]
  public speed = 2
}

export class CanvasSpecs {
  public width: number
  public height: number
}

export class GeneralAction<T = unknown> {
  name: string
  data: T
}
