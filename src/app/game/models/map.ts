import { Renderer } from "./renderer"


export class GameMap {
  public id: string
  public name: string
  public elevations: Grid[] = []
  public baseTexture: string
  
  constructor(public size: Size) { }
}

export class Cell {
  id: string
  x: number // X Grid Coordinates
  y: number // Y Grid Coordinates
  posX: number // X Pixel Coordinates
  posY: number // Y Pixel Coordinates 
  elevationIndex?: number
  obstacle?: boolean 
  renderers?: Renderer[]  
  spriteTiles?: {[layer: string ]: SpriteTile} = {}
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

export enum RenderingLayers {
  BaseLayer = "baseLayer",
  TerrainLayer = "terrainLayer",
  CharacterLayer = "characterLayer",
  // StructureLayer = "structureLayer",
  // PartitionLayer = "partitionLayer",
  // CeilingObjectLayer = "ceilingObjectLayer",
  // FloorObjectLayer = "floorObjectLayer",
  // SuspendedObjectLayer = "suspendedObjectLayer",
  // WallObjectLayer = "wallObjectLayer",
  // GatewayLayer = "gatewayLayer"
}

export class Grid {
  public id: string
  public cells: { [cell: string]: Cell } = {}
}

export class Size {
  width: number
  height: number
}

export class SpriteTile {
  id: string
  drawableTileId?: string
  spriteGridPosX: number
  spriteGridPosY: number
  imageUrl?: string
  tileHeight?: number
  tileWidth?: number
  tileOffsetX?: number
  tileOffsetY?: number
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