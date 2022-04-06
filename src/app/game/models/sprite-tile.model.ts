import { AssetItemsViewModel, Speed } from './asset.model';
import { Size, Location, SpriteLocation } from './map';

export abstract class Tile {
  id: string;
  imageUrl?: string;
  offsetX?: number;
  offsetY?: number;
  default?: boolean;
  selected?: boolean;
}

export class TerrainTile extends Tile {
  drawableTileId?: string;
  height?: number;
  spriteX?: number;
  spriteY?: number;
  drawWhen?: DrawWhen;
  topWith?: SpriteLocation;
  expandWith?: SpriteLocation
  baseWith?: SpriteLocation
}

export class AssetTile extends Tile {
  assetDrawRules: AssetItemsViewModel;
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
  expandable?: boolean;
}

export class SpriteAnimation {
  public changeEveryNthFrame: number = 16;
  public spriteXPosition = [
    'rightFootForward',
    'neutral',
    'leftFootForward',
    'neutral',
  ];
  public spriteYPosition: string = 'down';
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
