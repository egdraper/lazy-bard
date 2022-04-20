import { Movement } from '../extensions/renderable/foreground-canvas/asset/movement.ts/base.movement';
import { AssetItemsViewModel, Speed } from './asset.model';
import { Size, Location, SpriteLocation, Cell, Position, Grid, RenderingLayers } from './map';

export class GridAsset<T = any> {
  id: string; // x:0;y:0;z:0;layer:character
  cell: Cell; // not saved
  tile: T;
  zIndex: number;
  selected: boolean;
}
export class Asset extends GridAsset {
  public override tile: AssetTile;
  public movement: Movement;
  public moving = false;
  public animating = false;

  // location
  public cellId?: string;
  public gridId: string;
  public position: Position; // do getter to automatically set zIndex
}

export class TerrainAsset extends GridAsset{
  public override tile: TerrainTile
}

export class BackgroundAsset extends GridAsset{
  public override tile: BackgroundTile
  public override zIndex: number = 0
}

export abstract class Tile {
  id: string;
  imageUrl?: string;
  default?: boolean;
  selected?: boolean;
  layer?: RenderingLayers

  constructor(layer: RenderingLayers) {
    this.layer = layer
  }
}

export class BackgroundTile extends Tile {
  drawsWith?: SpriteLocation;
  constructor() {
    super(RenderingLayers.BaseLayer)
  }
}

export class TerrainTile extends Tile {
  drawableTileId?: string;
  drawWhen?: DrawWhen;
  topWith?: SpriteLocation;
  expandWith?: SpriteLocation;
  baseWith?: SpriteLocation;
  drawsWith?: SpriteLocation;
  drawsWithTop?: SpriteLocation;

  constructor() {
    super(RenderingLayers.TerrainLayer)
  }
}

export class AssetTile extends Tile {
  assetDrawRules: AssetItemsViewModel;
  animation?: SpriteAnimation;
  obstacleObstructionX?: number;
  obstacleObstructionY?: number;

  constructor(layer: RenderingLayers) {
    super(layer)
  }
}

export class DrawableItemViewModel {
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
