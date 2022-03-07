import { Painter } from "./painter";


export interface Extension {
  id: string
  init?: () => void
}

export interface AddOnExtension extends Extension {
  painter: Painter
}

export enum CanvasCTX {
  Background = "background",
  Foreground = "foreground",
  Fog = "fog",
  BlackoutFog = "blackoutFog"
}