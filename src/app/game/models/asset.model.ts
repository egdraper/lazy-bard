
import { zip } from "rxjs";
import { assetAttributes } from "../db/asset-items";
import { Movement } from "../extensions/asset/movement.ts/base.movement";
import { GSM } from "../game-state-manager.service";
import { Cell, Position, RenderingLayers, Size } from "./map"
import { AssetTile, BackgroundTile, TerrainTile, SpriteAnimation, Tile } from "./sprite-tile.model"

export type Speed = 1 | 2 | 4 | 8 | 16 | 32 | 64

export class BlockEdge {
  north?: boolean
  east?: boolean
  south?: boolean
  west?: boolean
  up?: boolean
  down?: boolean
}
export class AssetBlock {
  id: string
  zIndex: number
  cell: Cell
  obstructed: boolean
  edge: BlockEdge
  ownerAssetId: string
}

export class GridAsset<T = any> {
  id: string; 
  ownedBlockIds: string[]; 
  tile: T;
  attributesId: string;
  attributes: AssetAttributes // not saved
  layer: RenderingLayers
  baseZIndex: number
  anchorCell: Cell
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

  constructor(cell: Cell, assetTypeId: string) {
    super();
    this.anchorCell = cell
    this.attributesId = assetTypeId
  }

}
export class TerrainAsset extends GridAsset{
  public override tile: TerrainTile
}

export class BackgroundAsset extends GridAsset{
  public override tile: BackgroundTile

  constructor(
    cell: Cell,      
    tile: BackgroundTile
  ) {
    super();
    this.anchorCell = cell
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

export class AssetAttributes {
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
