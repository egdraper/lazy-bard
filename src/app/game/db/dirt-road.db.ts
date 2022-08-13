import { TerrainTile } from "../models/sprite-tile.model";

export const RoadRules: TerrainTile[] = [
  {
    id: "dirtRoadCenter",
    default: true,
    baseWith: {x: 0, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: true,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: true,
    }
  },
  {
    id: "DirtRoadTopLeft",
    baseWith: {x: 7, y: 0},
    drawWhen: {
      northNeighbor: false,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: null,
      westNeighbor: false,
      northWestNeighbor: false,
    }
  },
  {
    id: "DirtRoadTopRight",
    baseWith: {x: 11, y: 0},
    drawWhen: {
      northNeighbor: false,
      northEastNeighbor: false,
      eastNeighbor: false,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  },
  {
    id: "DirtRoadBottomRight",
    baseWith: {x: 14, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: null,
      eastNeighbor: false,
      southEastNeighbor: null,
      southNeighbor: false,
      southWestNeighbor: null,
      westNeighbor: true,
      northWestNeighbor: true,
    }
  },
  {
    id: "DirtRoadBottomLeft",
    baseWith: {x: 13, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: false,
      southWestNeighbor: null,
      westNeighbor: false,
      northWestNeighbor: null,
    }
  },
  {
    id: "DirtRoadTopCenter",
    baseWith: {x: 3, y: 0},
    drawWhen: {
      northNeighbor: false,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: null,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  },
  {
    id: "DirtRoadBottomCenter",
    baseWith: {x: 12, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: false,
      southWestNeighbor: null,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  },
  {
    id: "DirtRoadRightCenter",
    baseWith: {x: 10, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: null,
      eastNeighbor: false,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: null,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  },
  {
    id: "DirtRoadLeftCenter",
    baseWith: {x: 5, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: null,
      westNeighbor: false,
      northWestNeighbor: null,
    }
  },
  {
    id: "DirtRoadLeftCornerAngleTop",
    baseWith: {x: 1, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: false,
    }
  },
  {
    id: "DirtRoadLeftCornerAngleTop",
    baseWith: {x: 2, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: false,
      eastNeighbor: true,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: null,
      westNeighbor: true,
      northWestNeighbor: true,
    }
  },
  {
    id: "DirtRoadLeftCornerAngleTop",
    baseWith: {x: 4, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: false,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  },
  {
    id: "DirtRoadLeftCornerAngleTop",
    baseWith: {x: 8, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: true,
      southEastNeighbor: false,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  },
]