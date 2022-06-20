import { BackgroundAsset, GridAsset } from "./asset.model"

export class GameMap {
  public id: string
  public name: string
  public baseTexture: string
  public grid: {[cellId: string]: Cell } = {}
  // public assets?: {[cellId: string]: {[zIndex:number]: {[layer: string ]: GridAsset}}} = {}  
  // public backgroundTiles?: {[cellId: string]:  BackgroundTile} = {}  

  constructor(public size: Size) { }
}



export class Cell {
  public id: string // x0:y0
  public obstructions: {[z: string]: boolean} // id format "x0:y0:z0"
  public location: Location // {x: 0, y: 0}
  public position: Position // not saved

  public assets?: {[zIndex:number]: {[layer: string ]: GridAsset}}  
  public backgroundAsset?: BackgroundAsset  
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