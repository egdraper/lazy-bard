
import { assetAttributes } from "../db/asset-attributes";
import { SpriteAnimation } from "../extensions/asset/animation/animation";
import { Movement } from "../extensions/asset/movement.ts/base.movement";
import { SpriteOrientation } from "../extensions/asset/orientation.ts/direction";
import { Cell, RenderingLayers, Size } from "./map";
import { BackgroundTile, TerrainTile, Tile } from "./sprite-tile.model";

export type Speed = 1 | 2 | 4 | 8 | 16 | 32 | 64

export class AssetAttributes {
  id: string
  size: Size
  drawSize: Size
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

export class Asset<T = any> {
  id: string; 
  anchorCell: Cell
  tile: T;
  attributesId: string;
  attributes: AssetAttributes // not saved
  layer: RenderingLayers
  baseZIndex: number
  ownedBlockIds: string[]; 
}

export class PlaceableAsset<T = Tile> extends Asset {
  public override tile: T;
  public movement: Movement;
  public animation?: SpriteAnimation;
  public orientation: SpriteOrientation = new SpriteOrientation();
  public animating = false;
  public hovering = true;

  constructor(cell: Cell, assetAttributeId: string) {
    super();
    this.anchorCell = cell
    this.attributes = assetAttributes.find(
      (item) => item.id === assetAttributeId
    );
  }
}

export class TerrainAsset extends Asset{
  public override tile: TerrainTile
}

export class BackgroundAsset extends Asset{
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
