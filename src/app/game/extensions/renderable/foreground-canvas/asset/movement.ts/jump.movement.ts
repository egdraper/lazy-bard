import { GSM } from "src/app/game/game-state-manager.service"
import { Asset } from "src/app/game/models/asset.model"
import { Movement } from "./base.movement"
import { ShortestPath, TravelPath } from "../shortest-path"

export class Jump extends Movement {   
  public travelPath: TravelPath = new ShortestPath()
  
  constructor(public asset: Asset) {
    super()
  }

  
  public move(event: {assetPosX: number, assetPosY: number, assetPosZ: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number, distanceToFinalCell: number}): {newPosX: number, newPosY: number, newPosZ:number} {
    this.asset.spriteTile.animation.changeEveryNthFrame = 8
    this.asset.spriteTile.animation.spriteXPosition = [26, 26, 26, 26]
    this.speed = 2
    console.log(event.distanceToFinalCell+1)
    if(event.distanceToFinalCell+1 > 2) {
      event.assetPosZ -= 3
    }
    if(event.distanceToFinalCell+1 <= 2) {
      event.assetPosZ += 3
    }

    if(event.distanceToFinalCell === 0) {
      this.asset.spriteTile.animation.changeEveryNthFrame = 16
      this.asset.spriteTile.animation.spriteXPosition = [0, 26, 52, 26]
      this.speed = 2
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


