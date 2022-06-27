import { Asset, AssetInfo, AssetTypeViewModel } from "../models/asset.model";

export const assetType: AssetTypeViewModel[]  = [
  {
    id: 'standardCreature',
    size: { x: 1, y: 1, z: 1 },
    drawSize: {x: 25, y: 36 },
    xMotionTilePos: [0, 26, 52, 26],
    yDirectionTilePos: { down: 0, left: 36, right: 72, up: 108 },
    xPosOffset: -4,
    yPosOffset: -24,
    obstructed: ["1"]
  },
  {
    id: 'standardSmallItem',
    size: { x: 1, y: 1, z:1 },
    drawSize: {x: 16, y: 16 },
    xMotionTilePos: [0, 0, 0, 0 ],
    yDirectionTilePos: { down: 0, left: 0, right: 0, up: 0 },
    xPosOffset: 0,
    yPosOffset: 0,
    obstructed: ["1"]
  },
  {
    id: 'standardXLTree',
    size: { x: 4, y: 4, z: 4 },
    drawSize: {x: 96, y: 96 },
    xMotionTilePos: [0, 0, 0, 0 ],
    yDirectionTilePos: { down: 0, left: 0, right: 0, up: 0 },
    xPosOffset: -31,
    yPosOffset: -88,
    obstructed: ["0000:0110:0110:0000", "0000:0110:0110:0000", "1111:1111:1111:1111", "1111:1111:1111:1111"]
  },
  {
    id: 'standardLTree',
    size: { x: 3, y: 3, z: 3 },
    drawSize: {x: 64, y: 64 },
    xMotionTilePos: [0, 0, 0, 0 ],
    yDirectionTilePos: { down: 0, left: 0, right: 0, up: 0 },
    xPosOffset: -31,
    yPosOffset: -88,
    obstructed: ["000:010:000", "111:111:111", "111:111:111"]
  },
  {
    id: 'standardLogTree',
    size: { x: 3, y: 1, z: 1 },
    drawSize: {x: 64, y: 64 },
    xMotionTilePos: [0, 0, 0, 0 ],
    yDirectionTilePos: { down: 0, left: 0, right: 0, up: 0 },
    xPosOffset: -31,
    yPosOffset: -88,
    obstructed: ["111"]
  },
];


export const assets: AssetInfo[] = [
  {
    id: 1,
    type: "tree",
    name: "Large Tree Green",
    url: "assets/images/trees/tree1.png",
    rule: "standardXLTree"
  },
  {
    id: 2,
    type: "tree",
    name: "Regular Tree Green",
    url: "assets/images/trees/tree2.png",
    rule: "standardLTree"
  },
  {
    id: 2,
    type: "tree",
    name: "Large Tree Green",
    url: "assets/images/trees/tree3.png",
    rule: "standardLTree"
  },
]

