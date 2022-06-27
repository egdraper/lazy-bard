
import { Movement } from "../extensions/asset/movement.ts/base.movement";
import { Cell, Position, Size } from "./map"
import { AssetTile, BackgroundTile, TerrainTile, SpriteAnimation, Tile } from "./sprite-tile.model"

export type Speed = 1 | 2 | 4 | 8 | 16 | 32 | 64

export class GridAsset<T = any> {
  id: string; // x:0;y:0;z:0;layer:character
  blocks: { zIndex: number, cell: Cell, obstructed: boolean }[]; // not saved
  tile: T;
  zIndex: number;
  selected: boolean;
}

export class Asset<T = Tile> extends GridAsset {
  public override tile: T;
  public movement: Movement;
  public animation?: SpriteAnimation;
  public animating = false;
  public hovering = true;

  // location
  public cellId?: string;
  public gridId: string; 

  constructor(cell: Cell) {
    super();
    this.blocks = cell
  }
}

export class TerrainAsset extends GridAsset{
  public override tile: TerrainTile
}

export class BackgroundAsset extends GridAsset{
  public override tile: BackgroundTile
  public override zIndex: number = 0

  constructor(
    cell: Cell,      
    tile: BackgroundTile
  ) {
    super();
    this.blocks = cell
    this.tile = tile
  }
}

export class WalkStepSpritePos {
  rightFootForward: number
  neutral: number
  leftFootForward: number  
}

export class SpriteDirection {
  down: number
  left: number
  right: number  
  up: number
}

export class AssetTypeViewModel {
  id: string
  size: Size
  drawSize: Size
  xMotionTilePos: number[]
  yDirectionTilePos: SpriteDirection
  xPosOffset: number
  yPosOffset: number
  obstructed: string[]
}

export class AssetInfo {
  id: number
  type: string
  name: string
  url: string
  rule: string
}
