import { CanvasModules } from "../module.register";
import { Renderer } from "./renderer";

export class Extension {
  public init(): Promise<void> { return null }
  public dataBag: unknown = {} 
}

export enum CanvasCTX {
  Background = "background",
  Foreground = "foreground",
  Fog = "fog",
  BlackoutFog = "blackoutFog"
}