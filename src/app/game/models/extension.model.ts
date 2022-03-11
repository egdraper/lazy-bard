import { Renderer } from "./renderer";


export interface Extension {
  id: string
  init?: () => Promise<void>
}

export interface AddOnExtension extends Extension {
  renderer: Renderer
}

export enum CanvasCTX {
  Background = "background",
  Foreground = "foreground",
  Fog = "fog",
  BlackoutFog = "blackoutFog"
}