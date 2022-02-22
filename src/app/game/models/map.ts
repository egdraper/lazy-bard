export class GameMap {
  id: string
  name: string
  grid: Grid
}

export class Grid {
  public id: string
  public cells: { [cell: string]: Cell } = {}
  public baseTexture: string
    
  constructor(public size: Size) {}
}

export interface Cell {
  id: string;
  x: number; // X Grid Coordinates
  y: number; // Y Grid Coordinates
  posX: number; // X Pixel Coordinates
  posY: number; // Y Pixel Coordinates 
  tile?: ImageTile
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