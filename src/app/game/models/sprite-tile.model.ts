import { assetAttributes } from '../db/asset-attributes';
import { SpriteOrientation } from '../core/default-features/orientation/orientation';

import { AssetAttributes } from './asset.model';
import { SpriteLocation, Cell, Position, RenderingLayers } from './map';

export abstract class Tile {
  id: string;
  imageUrl?: string;
  default?: boolean;
  selected?: boolean;
  layer?: RenderingLayers;

  constructor(layer: RenderingLayers, imageUrl?: string) {
    this.imageUrl = imageUrl;
    this.layer = layer;
  }
}

export class BackgroundTile extends Tile {
  drawsWith?: SpriteLocation;
  constructor(imageUrl: string) {
    super(RenderingLayers.BaseLayer, imageUrl);
  }
}

export class TerrainTile extends Tile {
  drawableTile?: DrawableTile;
  drawableTileId?: string;
  drawWhen?: DrawWhen;
  topWith?: SpriteLocation;
  expandWith?: SpriteLocation;
  baseWith?: SpriteLocation;
  drawsWith?: SpriteLocation;
  drawsWithTop?: SpriteLocation;

  constructor() {
    super(RenderingLayers.TerrainLayer);
  }
}

export class AssetTile extends Tile {
  obstacleObstructionX?: number;
  obstacleObstructionY?: number;

  constructor(layer: RenderingLayers, imageUrl: string) {
    super(layer, imageUrl);
  }
}

export class DrawableTile {
  drawingRules: TerrainTile[];
  id: string;
  imageUrl: string;
  assetAttributeId: string;
  name: string;
  offsetX: number;
  offsetY: number;
  staticHeight?: number;
  expandable?: boolean;
  backgroundTerrainId?: string;
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
