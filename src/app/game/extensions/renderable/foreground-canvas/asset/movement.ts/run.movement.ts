import { Asset, Speed } from "src/app/game/models/asset.model"
import { Movement } from "./base.movement"
import { ShortestPath, TravelPath } from "../shortest-path"

export class Running extends Movement {   
  public travelPath: TravelPath = new ShortestPath()
  public override speed: Speed = 4 
  
  constructor(public asset: Asset) {
    super()
  }
  
  public move(event: {assetPosX: number, assetPosY: number, assetPosZ: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number, distanceToFinalCell: number}): {newPosX: number, newPosY: number, newPosZ:number} {
    if(event.distanceToFinalCell === 0) {
      this.asset.spriteTile.animation.changeEveryNthFrame = 16
    } else {
      this.asset.spriteTile.animation.changeEveryNthFrame = 4
    }
    return {newPosX: event.pathTrackPosX, newPosY: event.pathTrackPosY, newPosZ: event.assetPosZ}
  } 
}

///// Every asset can
// Move (x/y/z plane) ======= Working on
// Climb
// Be climbed
// Lift/carry
// Be lifted/carried
// Attack
// Be assigned as players
// Go invisible
// selected


