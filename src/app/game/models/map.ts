import { Renderer } from "./renderer"


export class GameMap {
  public id: string
  public name: string
  public elevations: {[elevationIndx: number]: Grid} = {}
  public baseTexture: string

  public currentElevationLayerIndex: number = 0
  public baseElevationLayerIndex: number = 0
  public topMostElevationLayerIndex: number = 0
  public bottomMostElevationLayerIndex: number = 0
  
  constructor(public size: Size) { }
}

export class Cell {
  id: string
  x: number // X Grid Coordinates
  y: number // Y Grid Coordinates
  posX: number // X Pixel Coordinates
  posY: number // Y Pixel Coordinates 
  obstacle?: boolean 
  spriteTiles?: {[layer: string ]: SpriteTile} = {}
  renderers?: Renderer[]  // not saved
  elevationIndex?: number // not saved
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
  public elevationIndex: number
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
  selectableArea: Size
  obstacleObstructionX?: number
  obstacleObstructionY?: number
  default?: boolean
  selected?: boolean
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