import { Action } from "./base.interaction";
import { RootCanvasModule } from "../modules/root.module";
import { Renderer } from "./renderer";

export abstract class Extension {
  public init(): Promise<void> { return null }
  public abstract gameMasterView: Boolean
  public abstract gamePlayerView: Boolean

  public module: RootCanvasModule

  public registerRenderer(renderers: Renderer[]) {
    this.module.renderers.push(...renderers)
  }
}

export enum CanvasCTX {
  Background = "background",
  Foreground = "foreground",
  Fog = "fog",
  BlackoutFog = "blackoutFog"
}