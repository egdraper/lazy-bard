import { GridAsset } from "./models/asset.model";
import { GameMap } from "./models/map";

export class GameData {
  // core game instance
  public map: GameMap
  public assets: GridAsset[]
  
  // core cache
  public loadedMaps: { [gameMapId: string]: GameMap } = {}
} 