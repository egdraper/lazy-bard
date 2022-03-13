import { DrawableItem } from "../models/map";
import { RockWall } from "./rock-wall-terrain.db";
import { trees } from "./trees.db";

export const drawableItems: DrawableItem[] = [
  {
    id: "Trees-GrassBase",
    name: "Green Trees with Grass Base",
    spriteType: "DrawableNaturalWall",
    imageUrl: "assets/images/tree-transparent-base.png",
    drawingRules: trees
  }, {
    id: "StoneCliff-StoneBase",
    name: "Stone Cliff with Stone Base",
    spriteType: "DrawableNaturalWall",
    imageUrl: "assets/images/RockWallGrassBase.png",
    drawingRules: RockWall
  },
]