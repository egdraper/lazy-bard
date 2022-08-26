import { PlaceableAsset } from "../../../models/asset.model";
import { Cell } from "../../../models/map";

export abstract class TravelPath {
  public abstract find(start: Cell, end: Cell, asset?: PlaceableAsset ): Cell[] 
} 