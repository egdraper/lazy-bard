import { DrawableItemViewModel } from "../models/sprite-tile.model"
import { RoadRules } from "./dirt-road.db"
import { RockWall } from "./rock-wall-terrain.db"
import { trees } from "./trees.db"

export const drawableItems: DrawableItemViewModel[] = [
  {
    id: "Trees-GrassBase",
    assetAttributeId: "standardDrawableTree",
    name: "Green Trees with Grass Base",
    imageUrl: "assets/images/tree-transparent-base.png",
    offsetX: 0,
    offsetY: 0,
    drawingRules: trees,
    staticHeight: 2
  }, {
    id: "StoneCliff-StoneBase2",
    assetAttributeId: "standardTerrain",
    expandable: true,
    name: "Stone Cliff with Stone Base",
    imageUrl: "assets/images/StoneGrayWall.png",
    offsetX: 0,
    offsetY: 0,
    drawingRules: RockWall
  }, {
    id: "Road",
    assetAttributeId: "standardRoad",
    name: "Road",
    imageUrl: "assets/images/roads/road1.png",
    offsetX: 0,
    offsetY: 0,
    drawingRules: RoadRules
  },  
]