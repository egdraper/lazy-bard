import { BackgroundAsset, Asset } from "./asset.model"

export class GameMap {
  public id: string
  public name: string
  public grid: {[cellId: string]: Cell } = {}
  // public backgroundTiles?: {[cellId: string]:  BackgroundTile} = {}  

  constructor(public size: Size) { }
}



export class Cell {
  public id: string // x0:y0
  public location: Location // {x: 0, y: 0}
  public position: Position // not saved
  public iterationOrder: number
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
  ObjectLayer = "objectLayer",
  AssetLayer = "assetLayer",
  OverlayLayer = "overlayLayer"
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

export enum MapRotationIndex {
  northUp = 0,
  westUp = 1,
  southUp = 2,
  eastUp = 3
}