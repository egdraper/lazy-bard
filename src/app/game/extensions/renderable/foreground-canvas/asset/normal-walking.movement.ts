import { GSM } from "src/app/game/game-state-manager.service"
import { Asset } from "src/app/game/models/asset.model"
import { Movement } from "./base.movement"
import { ShortestPath, TravelPath } from "./shortest-path"

export class NormalWalking extends Movement {   
  public travelPath: TravelPath = new ShortestPath()
  
  constructor(public asset: Asset) {
    super()
  }
  
  public move(event: {assetPosX: number, assetPosY: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number}): {newPosX: number, newPosY: number} {

    
    return {newPosX: event.pathTrackPosX, newPosY: event.pathTrackPosY}
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


