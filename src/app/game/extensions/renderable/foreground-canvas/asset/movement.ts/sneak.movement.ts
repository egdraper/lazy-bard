import { Asset, Speed } from "src/app/game/models/asset.model"
import { Movement } from "./base.movement"
import { ShortestPath, TravelPath } from "../shortest-path"
import { GSM } from "src/app/game/game-state-manager.service"

export class Sneaking extends Movement {   
  public travelPath: TravelPath = new ShortestPath()
  private tempSpeed

  constructor(public asset: Asset) {
    super()
    this.tempSpeed = GSM.Settings.speed
    GSM.Settings.speed = Math.round(GSM.Settings.speed / 2)
  }
  
  public move(event: {assetPosX: number, assetPosY: number, assetPosZ: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number, distanceToFinalCell: number}): {newPosX: number, newPosY: number, newPosZ:number} {
    if(event.distanceToFinalCell === 0) {
      GSM.Settings.speed = this.tempSpeed
      this.asset.assetTile.animation.changeEveryNthFrame = 16
    } else {
      this.asset.assetTile.animation.changeEveryNthFrame = Math.abs(GSM.Settings.speed - 20 + 2)
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


