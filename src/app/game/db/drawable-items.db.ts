import { DrawableItem } from "../models/map";
import { trees } from "./trees.db";

export const drawableItems: DrawableItem[] = [{
    id: "Trees-GrassBase",
    name: "Green Trees with Grass Base",
    spriteType: "DrawableNaturalWall",
    imageUrl: "assets/images/tree-transparent-base.png",
    drawingRules: trees
  }
]