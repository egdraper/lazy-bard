import { AssetTypeViewModel } from "../models/asset.model";

export const assetType: AssetTypeViewModel[]  = [
  {
    id: 'standardCreature',
    size: { x: 25, y: 36 },
    drawSize: {x: 25, y: 36 },
    xMotionTilePos: [0, 26, 52, 26],
    yDirectionTilePos: { down: 0, left: 36, right: 72, up: 108 },
    xPosOffset: -4,
    yPosOffset: -24,
    obstructed: {
      0: {x: 1, y: 1},
    }
  },
  {
    id: 'standardSmallItem',
    size: { x: 16, y: 16 },
    drawSize: {x: 16, y: 16 },
    xMotionTilePos: [0, 0, 0, 0 ],
    yDirectionTilePos: { down: 0, left: 0, right: 0, up: 0 },
    xPosOffset: 0,
    yPosOffset: 0,
    obstructed: {
      0: {x: 1, y: 1},
    }
  },
  {
    id: 'standardXLTree',
    size: { x: 96, y: 96 },
    drawSize: {x: 96, y: 96 },
    xMotionTilePos: [0, 0, 0, 0 ],
    yDirectionTilePos: { down: 0, left: 0, right: 0, up: 0 },
    xPosOffset: -31,
    yPosOffset: -88,
    obstructed: {
      0: {x: 2, y: 2},
      1: {x: 2, y: 2},
      2: {x: 4, y: 4, offsetX: -2, offsetY: 2},
      3: {x: 4, y: 4, offsetX: -2, offsetY: 2},
    }
  },
];
