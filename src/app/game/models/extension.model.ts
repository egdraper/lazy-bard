import { CanvasModules } from "../module.register";
import { Renderer } from "./renderer";

export abstract class Extension {
  public init(): Promise<void> { return null }
  public abstract gameMasterView: Boolean
  public abstract gamePlayerView: Boolean
}

export enum CanvasCTX {
  Background = "background",
  Foreground = "foreground",
  Fog = "fog",
  BlackoutFog = "blackoutFog"
}