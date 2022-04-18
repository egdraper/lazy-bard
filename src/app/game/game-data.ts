import { GameMap } from "./models/map";

export class GameData {
  // core game instance
  public map: GameMap
  
  // core cache
  public images: { [imageUrl: string]: HTMLImageElement } = {};
  public loadedMaps: { [gameMapId: string]: GameMap } = {}
} 