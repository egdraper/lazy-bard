export class GameMap {
  id: string
  grids: {[layer: string]: Grid} = {}
  name: string
  baseTexture: string
  
  constructor(public size: Size) { }
}

export enum Neighbor {
  top,
  topRight,
  right,
  bottomRight,
}

export enum ElevationLayers {
  baseLayer = "baseLayer",
  terrainLayer = "terrainLayer",
  structureLayer = "structureLayer",
  partitionLayer = "partitionLayer",
  ceilingObjectLayer = "ceilingObjectLayer",
  floorObjectLayer = "floorObjectLayer",
  suspendedObjectLayer = "suspendedObjectLayer",
  wallObjectLayer = "wallObjectLayer",
  gatewayLayer = "gatewayLayer"
}

export class Grid {
  id: string
  cells: { [cell: string]: Cell } = {}
}

export interface Cell {
  id: string;
  x: number; // X Grid Coordinates
  y: number; // Y Grid Coordinates
  posX: number; // X Pixel Coordinates
  posY: number; // Y Pixel Coordinates 
  tile?: ImageTile,
  obstacle?: boolean,
  destination?: boolean,
  neighbors?: Cell[];
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