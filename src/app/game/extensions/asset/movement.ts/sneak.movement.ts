import { Position } from "src/app/game/models/map"
import { GSM } from "../../../../game/game-state-manager.service"
import { PlaceableAsset } from "../../../models/asset.model"
import { ShortestPath, TravelPath } from "../shortest-paths/shortest-path"
import { Movement } from "../../../controllers/utils/base.movement"

export class Sneaking extends Movement {   
  public travelPath: TravelPath = new ShortestPath()
  
  constructor(public asset: PlaceableAsset) {
    super(asset.animation, new Position(asset.anchorCell.position.x, asset.anchorCell.position.y, 0))
    this.speed = .25
  }
  
  public move(event: {assetPosX: number, assetPosY: number, assetPosZ: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number, distanceToFinalCell: number}): {newPosX: number, newPosY: number, newPosZ:number} {
    if(event.distanceToFinalCell === 0) {
      this.asset.animation.changeEveryNthFrame = 16
    } else {
      this.asset.animation.changeEveryNthFrame = 32
    }
    return {newPosX: event.pathTrackPosX, newPosY: event.pathTrackPosY, newPosZ: event.assetPosZ}
  } 
}
