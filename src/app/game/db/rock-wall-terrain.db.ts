import { TerrainTile } from "../models/sprite-tile.model"

export const RockWall: TerrainTile[] = [
    {
      id: 'FrontCenter',
      topWith: {x: 1, y: 3},
      expandWith: {x: 1, y: 4},
      baseWith: {x: 1, y: 5},
      drawWhen: {
        northNeighbor: true,
        northEastNeighbor: null,
        eastNeighbor: true,
        southEastNeighbor: false,
        southNeighbor: false,
        southWestNeighbor: false,
        westNeighbor: true,
        northWestNeighbor: null,
      },
    },
    {
      id: 'FrontLeft',
      topWith: {x: 0, y: 3},
      expandWith: {x: 0, y: 4},
      baseWith: {x: 0, y: 5},
      drawWhen: {
        northNeighbor: true,
        northEastNeighbor: null,
        eastNeighbor: true,
        southEastNeighbor: null,
        southNeighbor: false,
        southWestNeighbor: null,
        westNeighbor: false,
        northWestNeighbor: null,
      },
    },
    {
      id: 'FrontRight',
      topWith: {x: 2, y: 3},
      expandWith: {x: 2, y: 4},
      baseWith: {x: 2, y: 5},
      drawWhen: {
        northNeighbor: true,
        northEastNeighbor: false,
        eastNeighbor: false,
        southEastNeighbor: false,
        southNeighbor: false,
        southWestNeighbor: null,
        westNeighbor: true,
        northWestNeighbor: null,
      },
    },
    {
      id: 'MidLeft',
      topWith: {x: 0, y: 2},
      drawWhen: {
        northNeighbor: true,
        northEastNeighbor: null,
        eastNeighbor: true,
        southEastNeighbor: null,
        southNeighbor: true,
        southWestNeighbor: null,
        westNeighbor: false,
        northWestNeighbor: null,
      },
    },
      {
        id: 'MidCenter',
        default: true,
        topWith: {x: 3, y: 13 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: true,
          eastNeighbor: true,
          southEastNeighbor: true,
          southNeighbor: true,
          southWestNeighbor: true,
          westNeighbor: true,
          northWestNeighbor: true,
        },
      },
      {
        id: 'MidRight',
        topWith: {x: 0, y: 1 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: null,
          eastNeighbor: false,
          southEastNeighbor: null,
          southNeighbor: true,
          southWestNeighbor: null,
          westNeighbor: true,
          northWestNeighbor: null,
        },
      },
      {
        id: 'TopLeft',
        topWith: {x: 0, y: 0},
        drawWhen: {
          northNeighbor: false,
          northEastNeighbor: null,
          eastNeighbor: true,
          southEastNeighbor: true,
          southNeighbor: true,
          southWestNeighbor: null,
          westNeighbor: false,
          northWestNeighbor: false,
        },
      },
      {
        id: 'TopCenter',
        topWith: {x: 1, y: 0 },
        drawWhen: {
          northNeighbor: false,
          northEastNeighbor: null,
          eastNeighbor: true,
          southEastNeighbor: null,
          southNeighbor: true,
          southWestNeighbor: null,
          westNeighbor: true,
          northWestNeighbor: null,
        },
      },
      {
        id: 'TopRight',
        topWith: {x: 2, y: 0 },
        drawWhen: {
          northNeighbor: false,
          northEastNeighbor: null,
          eastNeighbor: false,
          southEastNeighbor: null,
          southNeighbor: true,
          southWestNeighbor: null,
          westNeighbor: true,
          northWestNeighbor: null,
        },
      },
      {
        id: 'FontLeftAttach',
        topWith: {x: 3, y: 0},
        expandWith: {x: 3, y: 1},
        baseWith: {x: 3, y: 2 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: null,
          eastNeighbor: true,
          southEastNeighbor: null,
          southNeighbor: false,
          southWestNeighbor: true,
          westNeighbor: true,
          northWestNeighbor: null,
        },
      },
      {
        id: 'FontRightAttach',
        topWith: {x: 4, y: 0},
        expandWith: {x: 4, y: 1},
        baseWith: {x: 4, y: 2 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: null,
          eastNeighbor: true,
          southEastNeighbor: true,
          southNeighbor: false,
          southWestNeighbor: null,
          westNeighbor: true,
          northWestNeighbor: null,
        },
      },
      {
        id: 'FontRightAdjacentAttach',
        topWith: {x: 4, y: 3},
        expandWith: {x: 4, y: 4},
        baseWith: {x: 4, y: 5 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: true,
          eastNeighbor: false,
          southEastNeighbor: null,
          southNeighbor: false,
          southWestNeighbor: null,
          westNeighbor: true,
          northWestNeighbor: null,
        },
      },
      {
        id: 'bottomLeftFillerSquare',
        topWith: {x: 1, y: 2 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: true,
          eastNeighbor: true,
          southEastNeighbor: true,
          southNeighbor: true,
          southWestNeighbor: false,
          westNeighbor: true,
          northWestNeighbor: true,
        },
      },
      {
        id: 'bottomRightFillerSquare',
        topWith: {x: 2, y: 2 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: true,
          eastNeighbor: true,
          southEastNeighbor: false,
          southNeighbor: true,
          southWestNeighbor: true,
          westNeighbor: true,
          northWestNeighbor: true,
        },
      },
      {
        id: 'TopLeftFillerSquare',
        topWith: {x: 1, y: 1},
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: true,
          eastNeighbor: true,
          southEastNeighbor: true,
          southNeighbor: true,
          southWestNeighbor: true,
          westNeighbor: true,
          northWestNeighbor: false,
        },
      },
      {
        id: 'TopRightFillerSquare',
        topWith: {x: 2, y: 1 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: false,
          eastNeighbor: true,
          southEastNeighbor: true,
          southNeighbor: true,
          southWestNeighbor: true,
          westNeighbor: true,
          northWestNeighbor: true,
        },
      },
      {
        id: 'corner',
        topWith: {x: 3, y: 12 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: true,
          eastNeighbor: true,
          southEastNeighbor: false,
          southNeighbor: true,
          southWestNeighbor: true,
          westNeighbor: true,
          northWestNeighbor: false,
        },
      },
      {
        id: 'corner2',
        topWith: {x: 4, y: 12 },
        drawWhen: {
          northNeighbor: true,
          northEastNeighbor: false,
          eastNeighbor: true,
          southEastNeighbor: true,
          southNeighbor: true,
          southWestNeighbor: false,
          westNeighbor: true,
          northWestNeighbor: true,
        },
      },
    ]