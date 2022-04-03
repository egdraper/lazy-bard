import { AssetItemsViewModel, Speed } from './asset.model';
import { Size } from './map';

export abstract class Tile {
  id: string;
  imageUrl?: string;
  offsetX?: number;
  offsetY?: number;
  spriteSize: Size;
  default?: boolean;
  selected?: boolean;
}

export class TerrainTile extends Tile {
  spritePosX: number;
  spritePosY: number;
  drawableTileId?: string;
  drawWhen?: DrawWhen;
}

export class AssetTile extends Tile {
  assetDrawRules: AssetItemsViewModel
  selectableArea: Size;
  animation?: SpriteAnimation;
  obstacleObstructionX?: number;
  obstacleObstructionY?: number;
}

export interface DrawableItemViewModel {
  id: string;
  name: string;
  imageUrl: string;
  spriteType: string;
  drawingRules: TerrainTile[];
}

export class SpriteAnimation {
  public changeEveryNthFrame: Speed = 16;
  public spriteXPosition = ["rightFootForward", "neutral", "leftFootForward", "neutral"];
  public spriteYPosition: string = "down";
  public positionCounter = 0;
}

export class DrawWhen {
  topNeighbor: boolean;
  topRightNeighbor: boolean;
  rightNeighbor: boolean;
  bottomRightNeighbor: boolean;
  bottomNeighbor: boolean;
  bottomLeftNeighbor: boolean;
  leftNeighbor: boolean;
  topLeftNeighbor: boolean;
}
