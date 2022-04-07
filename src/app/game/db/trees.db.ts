import { TerrainTile } from "../models/sprite-tile.model";

export const trees: TerrainTile[] = [
  {
    id: "treeClumpTopLeft",
    topWith: {x: 0, y: 0},
    drawWhen: {
      topNeighbor: false,
      topRightNeighbor: null,
      rightNeighbor: true,
      bottomRightNeighbor: null,
      bottomNeighbor: true,
      bottomLeftNeighbor: null,
      leftNeighbor: false,
      topLeftNeighbor: false,
    }
  },
  {
    id: "treeClumpTopCenter",
    topWith: {x: 1, y: 0},
    drawWhen: {
      topNeighbor: false,
      topRightNeighbor: null,
      rightNeighbor: true,
      bottomRightNeighbor: true,
      bottomNeighbor: true,
      bottomLeftNeighbor: true,
      leftNeighbor: true,
      topLeftNeighbor: null,
    }
  }, {
    id: "treeClumpTopRight",
    topWith: {x: 2, y: 0},
    drawWhen: {
      topNeighbor: false,
      topRightNeighbor: false,
      rightNeighbor: false,
      bottomRightNeighbor: null,
      bottomNeighbor: true,
      bottomLeftNeighbor: null,
      leftNeighbor: true,
      topLeftNeighbor: null,
    }
  },
  {
    id: "treeClumpGrowableLeft",
    topWith: {x: 0, y: 1},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: null,
      rightNeighbor: true,
      bottomRightNeighbor: null,
      bottomNeighbor: true,
      bottomLeftNeighbor: null,
      leftNeighbor: false,
      topLeftNeighbor: false, // this one
    }
  }, {
    id: "treeClumpGrowableCenter",
    topWith: {x: 1, y: 1},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: true,
      rightNeighbor: true,
      bottomRightNeighbor: true,
      bottomNeighbor: true,
      bottomLeftNeighbor: true,
      leftNeighbor: true,
      topLeftNeighbor: true,
    }

  }, {
    id: "treeClumpGrowableRight",
    topWith: {x: 2, y: 1},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: false,
      rightNeighbor: false,
      bottomRightNeighbor: null,
      bottomNeighbor: true,
      bottomLeftNeighbor: null,
      leftNeighbor: true,
      topLeftNeighbor: null,
    }
  }, {
    id: "treeClumpTrunkLeft",
    topWith: {x: 2, y: 3},
    expandWith: {x: 2, y: 4},
    baseWith: { x: 2, y: 5},
    drawWhen: {
      topNeighbor: null,
      topRightNeighbor: null,
      rightNeighbor: true,
      bottomRightNeighbor: null,
      bottomNeighbor: false,
      bottomLeftNeighbor: false,
      leftNeighbor: false,
      topLeftNeighbor: false,
    }
  },
  {
    id: "treeClumpTrunkCenter",
    default: true,
    topWith: {x: 3, y: 3},
    expandWith: {x: 3, y: 4},
    baseWith: { x: 3, y: 5},
    drawWhen: {
      topNeighbor: null,
      topRightNeighbor: null,
      rightNeighbor: true,
      bottomRightNeighbor: null,
      bottomNeighbor: false,
      bottomLeftNeighbor: null,
      leftNeighbor: true,
      topLeftNeighbor: null,
    }
  },
  {
    id: "treeClumpTrunkRight",
    topWith: {x: 4, y: 3},
    expandWith: {x: 4, y: 4},
    baseWith: { x: 4, y: 5},
    drawWhen: {
      topNeighbor: null,
      topRightNeighbor: false,
      rightNeighbor: false,
      bottomRightNeighbor: false,
      bottomNeighbor: false,
      bottomLeftNeighbor: null,
      leftNeighbor: true,
      topLeftNeighbor: null,
    }
  },
  {
    id: "treeClumpTrunkLeftAngle",
    topWith: {x: 1, y: 3},
    expandWith: {x: 1, y: 4},
    baseWith: { x: 1, y: 5},
    drawWhen: {
      topNeighbor: null,
      topRightNeighbor: null,
      rightNeighbor: true,
      bottomRightNeighbor: null,
      bottomNeighbor: false,
      bottomLeftNeighbor: false,
      leftNeighbor: false,
      topLeftNeighbor: true,
    }
  },
  {
    id: "treeClumpTrunkRightAngle",
    topWith: {x: 5, y: 3},
    expandWith: {x: 5, y: 4},
    baseWith: { x: 5, y: 5},
    drawWhen: {
      topNeighbor: null,
      topRightNeighbor: true,
      rightNeighbor: false,
      bottomRightNeighbor: false,
      bottomNeighbor: false,
      bottomLeftNeighbor: null,
      leftNeighbor: true,
      topLeftNeighbor: null,
    }
  },
  {
    id: "treeClumpLeftFillerAngle",
    topWith: {x: 6, y: 0},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: true,
      rightNeighbor: true,
      bottomRightNeighbor: false,
      bottomNeighbor: true,
      bottomLeftNeighbor: true,
      leftNeighbor: true,
      topLeftNeighbor: true,

    }
  },
  {
    id: "treeClumpRightFillerAngle",
    topWith: {x: 7, y: 0},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: true,
      rightNeighbor: true,
      bottomRightNeighbor: true,
      bottomNeighbor: true,
      bottomLeftNeighbor: false,
      leftNeighbor: true,
      topLeftNeighbor: true,
    }
  },
  {
    id: "treeClumpLeftFillerAngleUP",
    topWith: {x: 6, y: 1},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: false,
      rightNeighbor: true,
      bottomRightNeighbor: true,
      bottomNeighbor: true,
      bottomLeftNeighbor: true,
      leftNeighbor: true,
      topLeftNeighbor: true,

    }
  },
  {
    id: "treeClumpRightFillerAngleUp",
    topWith: {x: 7, y: 1},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: true,
      rightNeighbor: true,
      bottomRightNeighbor: true,
      bottomNeighbor: true,
      bottomLeftNeighbor: true,
      leftNeighbor: true,
      topLeftNeighbor: false,
    }
  },
  {
    id: "treeClumpRightAngleGapFiller",
    topWith: {x: 6, y: 4},
    expandWith: {x: 6, y: 5},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: true,
      rightNeighbor: false,
      bottomRightNeighbor: false,
      bottomNeighbor: true,
      bottomLeftNeighbor: true,
      leftNeighbor: true,
      topLeftNeighbor: true,
    } 
  },
  {
    id: "treeClumpLeftAngleGapFiller",
    topWith: {x: 7, y: 4},
    expandWith: {x: 7, y: 5},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: true,
      rightNeighbor: true,
      bottomRightNeighbor: true,
      bottomNeighbor: true,
      bottomLeftNeighbor: false,
      leftNeighbor: false,
      topLeftNeighbor: true,
    } 
  },
  {
    id: "treeClumpLeftFillerAngleSingle",
    topWith: {x: 7, y: 4},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: true,
      rightNeighbor: true,
      bottomRightNeighbor: true,
      bottomNeighbor: true,
      bottomLeftNeighbor: true,
      leftNeighbor: false,
      topLeftNeighbor: true,
    } 
  },
  {
    id: "treeClumpRightFillerAngleSingle",
    topWith: {x: 6, y: 4},
    drawWhen: {
      topNeighbor: true,
      topRightNeighbor: true,
      rightNeighbor: false,
      bottomRightNeighbor: true,
      bottomNeighbor: true,
      bottomLeftNeighbor: true,
      leftNeighbor: true,
      topLeftNeighbor: true,
    } 
  }  
]
