import { TerrainTile } from "../models/sprite-tile.model";

export const trees: TerrainTile[] = [
  {
    id: "treeClumpTopLeft",
    topWith: {x: 0, y: 0},
    drawWhen: {
      northNeighbor: false,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: null,
      westNeighbor: false,
      northWestNeighbor: false,
    }
  },
  {
    id: "treeClumpTopCenter",
    topWith: {x: 1, y: 0},
    drawWhen: {
      northNeighbor: false,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  }, {
    id: "treeClumpTopRight",
    topWith: {x: 2, y: 0},
    drawWhen: {
      northNeighbor: false,
      northEastNeighbor: false,
      eastNeighbor: false,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: null,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  },
  {
    id: "treeClumpGrowableLeft",
    topWith: {x: 0, y: 1},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: null,
      westNeighbor: false,
      northWestNeighbor: false,
    }
  }, {
    id: "treeClumpGrowableCenter",
    topWith: {x: 1, y: 1},
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

  }, {
    id: "treeClumpGrowableRight",
    topWith: {x: 2, y: 1},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: false,
      eastNeighbor: false,
      southEastNeighbor: null,
      southNeighbor: true,
      southWestNeighbor: null,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  }, {
    id: "treeClumpTrunkLeft",
    topWith: {x: 2, y: 3},
    expandWith: {x: 2, y: 4},
    baseWith: { x: 2, y: 5},
    drawWhen: {
      northNeighbor: null,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: false,
      southWestNeighbor: false,
      westNeighbor: false,
      northWestNeighbor: false,
    }
  },
  {
    id: "treeClumpTrunkCenter",
    default: true,
    topWith: {x: 3, y: 3},
    expandWith: {x: 3, y: 4},
    baseWith: { x: 3, y: 5},
    drawWhen: {
      northNeighbor: null,
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
    id: "treeClumpTrunkRight",
    topWith: {x: 4, y: 3},
    expandWith: {x: 4, y: 4},
    baseWith: { x: 4, y: 5},
    drawWhen: {
      northNeighbor: null,
      northEastNeighbor: false,
      eastNeighbor: false,
      southEastNeighbor: false,
      southNeighbor: false,
      southWestNeighbor: null,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  },
  {
    id: "treeClumpTrunkLeftAngle",
    topWith: {x: 1, y: 3},
    expandWith: {x: 1, y: 4},
    baseWith: { x: 1, y: 5},
    drawWhen: {
      northNeighbor: null,
      northEastNeighbor: null,
      eastNeighbor: true,
      southEastNeighbor: null,
      southNeighbor: false,
      southWestNeighbor: false,
      westNeighbor: false,
      northWestNeighbor: true,
    }
  },
  {
    id: "treeClumpTrunkRightAngle",
    topWith: {x: 5, y: 3},
    expandWith: {x: 5, y: 4},
    baseWith: { x: 5, y: 5},
    drawWhen: {
      northNeighbor: null,
      northEastNeighbor: true,
      eastNeighbor: false,
      southEastNeighbor: false,
      southNeighbor: false,
      southWestNeighbor: null,
      westNeighbor: true,
      northWestNeighbor: null,
    }
  },
  {
    id: "treeClumpLeftFillerAngle",
    topWith: {x: 6, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: true,
      southEastNeighbor: false,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: true,

    }
  },
  {
    id: "treeClumpRightFillerAngle",
    topWith: {x: 7, y: 0},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: true,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: false,
      westNeighbor: true,
      northWestNeighbor: true,
    }
  },
  {
    id: "treeClumpLeftFillerAngleUP",
    topWith: {x: 6, y: 1},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: false,
      eastNeighbor: true,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: true,

    }
  },
  {
    id: "treeClumpRightFillerAngleUp",
    topWith: {x: 7, y: 1},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: true,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: false,
    }
  },
  {
    id: "treeClumpRightAngleGapFiller",
    topWith: {x: 6, y: 4},
    expandWith: {x: 6, y: 5},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: false,
      southEastNeighbor: false,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: true,
    } 
  },
  {
    id: "treeClumpLeftAngleGapFiller",
    topWith: {x: 7, y: 4},
    expandWith: {x: 7, y: 5},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: true,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: false,
      westNeighbor: false,
      northWestNeighbor: true,
    } 
  },
  {
    id: "treeClumpLeftFillerAngleSingle",
    topWith: {x: 7, y: 4},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: true,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: false,
      northWestNeighbor: true,
    } 
  },
  {
    id: "treeClumpRightFillerAngleSingle",
    topWith: {x: 6, y: 4},
    drawWhen: {
      northNeighbor: true,
      northEastNeighbor: true,
      eastNeighbor: false,
      southEastNeighbor: true,
      southNeighbor: true,
      southWestNeighbor: true,
      westNeighbor: true,
      northWestNeighbor: true,
    } 
  }  
]
