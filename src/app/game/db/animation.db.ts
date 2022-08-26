import { AssetAnimationTile } from "../core/default-features/animation/asset-movement-animation";

export const assetTileAnimation: AssetAnimationTile[] = [
  {
    id: "noAnimation", 
    xMotionTilePos: [0, 0, 0, 0 ],
    yDirectionTilePos: { down: 0, left: 0, right: 0, up: 0 },
  },
  {
    id: "standardCreature",
    xMotionTilePos: [0, 26, 52, 26],
    yDirectionTilePos: { down: 0, left: 36, right: 72, up: 108 },
  },
  {
    id: "standardLargeCreature",
    xMotionTilePos: [0, 32, 64, 32],
    yDirectionTilePos: { down: 0, left: 50, right: 100, up: 150 },
  }
]