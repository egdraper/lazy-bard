import { Renderer } from "./renderer"
import { TerrainTile } from "./sprite-tile.model"

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
  location: Location
  obstacle?: boolean
  terrainTiles?: {[layer: string ]: TerrainTile} = {}
  position: Position // not saved
  renderers?: Renderer[]  // not saved
  elevationIndex?: number // not saved
}

export enum NeighborLocation {
  North,
  East,
  South,
  West,
  NorthEast,
  SouthEast,
  SouthWest,
  NorthWest,
  Up,
  UpNorth,
  UpEast,
  UpSouth,
  UpWest,
  UpNorthEast,
  UpSouthEast,
  UpSouthWest,
  UpNorthWest,
  Down,
  DownNorth,
  DownEast,
  DownSouth,
  DownWest,
  DownNorthEast,
  DownSouthEast,
  DownSouthWest,
  DownNorthWest,
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
  x: number
  y: number
  z?: number
}


export abstract class BaseLocation {
  constructor(
    public x: number,
    public y: number,
    public z?: number
  ) {}
}

export class Location extends BaseLocation {}
export class Position extends BaseLocation {}

export class SpriteLocation {
  public x: number
  public y: number
}

export class MousePosition {
  posX: number
  posY: number
}