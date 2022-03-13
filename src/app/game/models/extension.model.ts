import { Extensions } from "../extensions.register";
import { Renderer } from "./renderer";

export class Extension {
  public excludeFromSingleImagePainting: boolean = true
  public init(): Promise<void> { return null }
}

export enum CanvasCTX {
  Background = "background",
  Foreground = "foreground",
  Fog = "fog",
  BlackoutFog = "blackoutFog"
}