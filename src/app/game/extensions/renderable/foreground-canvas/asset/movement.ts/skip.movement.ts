import { Asset } from "src/app/game/models/asset.model"
import { Movement } from "./base.movement"
import { ShortestPath, TravelPath } from "../shortest-path"
import { GSM } from "src/app/game/game-state-manager.service"

export class Skip extends Movement {   
  public travelPath: TravelPath = new ShortestPath()
  
  constructor(public asset: Asset) {
    super()
  }

  
  public move(event: {assetPosX: number, assetPosY: number, assetPosZ: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number, distanceToFinalCell: number}): {newPosX: number, newPosY: number, newPosZ:number} {
    this.asset.assetTile.animation.changeEveryNthFrame = 8
    // this.asset.frameXPosition = [0, 52, 0, 26]
    this.speed = 1
    console.log(this.asset.cell.y)
    if(event.distanceToNextCell > (GSM.Settings.blockSize / 2)) {
      event.assetPosZ -= 1
    }
    if(event.distanceToNextCell <= (GSM.Settings.blockSize / 2) && event.distanceToFinalCell < GSM.Settings.blockSize) {
      event.assetPosZ += 1
    }

    if(event.distanceToFinalCell === 0) {
      this.asset.assetTile.animation.changeEveryNthFrame = 16
      // this.asset.frameXPosition = [0, 26, 52, 26]
      this.speed = 1
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


