import { Asset } from "./models/asset.model";
import { GameMap } from "./models/map";

export class GameData {
  // core game instance

  
  // core cache
  public loadedMaps: { [gameMapId: string]: GameMap } = {}
} 