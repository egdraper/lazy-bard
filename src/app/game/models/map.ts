import { Painter } from "./painter"

export class GameMap {
  id: string
  grids: {[layer: string]: Grid} = {}
  name: string
  baseTexture: string
  
  constructor(public size: Size) { }
}

export enum NeighborLocation {
  Top,
  Right,
  Bottom,
  Left,
  TopRight,
  BottomRight,
  BottomLeft,
  TopLeft
}

export enum ElevationLayers {
  BaseLayer = "baseLayer",
  TerrainLayer = "terrainLayer",
  StructureLayer = "structureLayer",
  PartitionLayer = "partitionLayer",
  CeilingObjectLayer = "ceilingObjectLayer",
  FloorObjectLayer = "floorObjectLayer",
  SuspendedObjectLayer = "suspendedObjectLayer",
  WallObjectLayer = "wallObjectLayer",
  GatewayLayer = "gatewayLayer"
}

export class Grid {
  id: string
  cells: { [cell: string]: Cell } = {}
}

export class TerrainLayerGrid extends Grid {
  override cells: { [cell: string]: TerrainCell } = {}
}

export class Cell {
  id: string
  x: number // X Grid Coordinates
  y: number // Y Grid Coordinates
  posX: number // X Pixel Coordinates
  posY: number // Y Pixel Coordinates 
  obstacle?: boolean 
  painters: Painter[]
  
  tile?: ImageTile
}

export class TerrainCell extends Cell {
  imageTile: SpriteTile
  drawableTileId?: string
}

export class ImageTile {
  tilePosX: number
  tilePosY: number
  imageUrl: string
}

export class Size {
  width: number
  height: number
}

export class GridImages {
  imageUrl: string
  painterId: string
}

export class SpriteTile {
  id: string
  spriteGridPosX: number
  spriteGridPosY: number
  imageUrl?: string
  tileHeight: number
  tileWidth: number
  tileOffsetX: number
  tileOffsetY: number
  sizeAdjustment?: number
  visionBlocking?: boolean
  obstacle: boolean
  obstacleObstructionX?: number
  obstacleObstructionY?: number
  default?: boolean
  allowForPassThrough?: boolean
  addon?: string
  drawWhen?: {
    topNeighbor: boolean,
    topRightNeighbor: boolean,
    rightNeighbor: boolean,
    bottomRightNeighbor: boolean
    bottomNeighbor:boolean,
    bottomLeftNeighbor: boolean,
    leftNeighbor: boolean,
    topLeftNeighbor: boolean,
  }
}

export interface DrawableItem {
  id: string
  name: string
  imageUrl: string
  spriteType: string
  drawingRules: SpriteTile[]
}