import { DrawableItemViewModel } from "../models/sprite-tile.model"
import { RockWall } from "./rock-wall-terrain.db"
import { trees } from "./trees.db"

export const drawableItems: DrawableItemViewModel[] = [
  {
    id: "Trees-GrassBase",
    name: "Green Trees with Grass Base",
    spriteType: "DrawableNaturalWall",
    imageUrl: "assets/images/tree-transparent-base.png",
    offsetX: 0,
    offsetY: 0,
    variableHeight: 2,
    staticHeight: 2,
    drawingRules: trees
  }, {
    id: "StoneCliff-StoneBase2",
    expandable: true,
    defaultTopBackground: "greenGrass",
    name: "Stone Cliff with Stone Base",
    spriteType: "DrawableNaturalWall",
    imageUrl: "assets/images/RockWallGrassBase.png",
    offsetX: 0,
    offsetY: 0,
    variableHeight: 1,
    drawingRules: RockWall
  },
]