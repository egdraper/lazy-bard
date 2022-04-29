import { AssetItemsViewModel } from "../models/asset.model";

export const assetItems: AssetItemsViewModel[]  = [
  {
    id: 'standardCreature',
    size: { x: 25, y: 36 },
    drawSize: {x: 25, y: 36 },
    xWalkPos: [0, 26, 52, 26],
    yWalkPos: { down: 0, left: 36, right: 72, up: 108 },
    xPosOffset: -4,
    yPosOffset: -24,
  },
  {
    id: 'standardSmallItem',
    size: { x: 16, y: 16 },
    drawSize: {x: 16, y: 16 },
    xWalkPos: [0, 0, 0, 0 ],
    yWalkPos: { down: 0, left: 0, right: 0, up: 0 },
    xPosOffset: 0,
    yPosOffset: 0,
  },
];
