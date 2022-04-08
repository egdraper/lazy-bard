import { AssetItemsViewModel, Speed } from './asset.model';
import { Size, Location, SpriteLocation } from './map';

export abstract class Tile {
  id: string;
  imageUrl?: string;
  default?: boolean;
  selected?: boolean;
}

export class TerrainTile extends Tile {
  drawableTileId?: string;
  drawWhen?: DrawWhen;
  topWith?: SpriteLocation;
  expandWith?: SpriteLocation
  baseWith?: SpriteLocation
  hasTerrainOnTop?: boolean
}

export class AssetTile extends Tile {
  assetDrawRules: AssetItemsViewModel;
  animation?: SpriteAnimation;
  obstacleObstructionX?: number;
  obstacleObstructionY?: number;
}

export interface DrawableItemViewModel {
  drawingRules: TerrainTile[];
  id: string;
  imageUrl: string;
  name: string;
  offsetX: number;
  offsetY: number;
  spriteType: string;
  variableHeight: number;
  staticHeight?: number;
  defaultTopBackground?: string;
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
