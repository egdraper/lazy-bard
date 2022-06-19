import { assetType } from '../db/asset-items';
import { SpriteOrientation } from '../extensions/character/direction.ts/direction';
import { Movement } from '../extensions/character/movement.ts/base.movement';
import { AssetTypeViewModel } from './asset.model';
import { SpriteLocation, Cell, Position, RenderingLayers } from './map';


export abstract class Tile {
  id: string;
  imageUrl?: string;
  default?: boolean;
  selected?: boolean;
  layer?: RenderingLayers

  constructor(
    layer: RenderingLayers,
    imageUrl?: string,
    ) {
    this.imageUrl = imageUrl
    this.layer = layer
  }
}

export class BackgroundTile extends Tile {
  drawsWith?: SpriteLocation;
  constructor(imageUrl: string) {
    super(RenderingLayers.BaseLayer, imageUrl)
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

export class ObjectTile extends Tile {
  assetDrawRules: AssetTypeViewModel;
  obstacleObstructionX?: number;
  obstacleObstructionY?: number;

  constructor(layer: RenderingLayers, imageUrl: string, drawRuleName) {
    super(layer, imageUrl)
    this.assetDrawRules = assetType.find(item => item.id === drawRuleName)
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
  public orientation: SpriteOrientation = new SpriteOrientation()
  public positionCounter = 0;
}

export class DrawWhen {
  northNeighbor: boolean;
  northEastNeighbor: boolean;
  eastNeighbor: boolean;
  southEastNeighbor: boolean;
  southNeighbor: boolean;
  southWestNeighbor: boolean;
  westNeighbor: boolean;
  northWestNeighbor: boolean;
}
