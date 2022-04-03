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
  x: number // X Grid Coordinates
  y: number // Y Grid Coordinates
  posX: number // X Pixel Coordinates // not saved
  posY: number // Y Pixel Coordinates // not saved
  obstacle?: boolean 
  terrainTiles?: {[layer: string ]: TerrainTile} = {}
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
  x: number
  y: number
  z?: number
}

export class MousePosition {
  posX: number
  posY: number
}