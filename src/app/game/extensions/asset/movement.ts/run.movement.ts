import { Movement } from "./base.movement"
import { ShortestPath, TravelPath } from "../shortest-path"
import { GSM } from "src/app/game/game-state-manager.service"
import { Asset } from "../../../models/asset.model"
import { Position } from "src/app/game/models/map"

export class Running extends Movement {   
  public travelPath: TravelPath = new ShortestPath()
  private tempSpeed

  constructor(public asset: Asset) {
    super(asset.animation, new Position(asset.cell.position.x, asset.cell.position.y, 0))
    this.tempSpeed = GSM.Settings.speed
    GSM.Settings.speed = GSM.Settings.speed * 2
  }
  
  public move(event: {assetPosX: number, assetPosY: number, assetPosZ: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number, distanceToFinalCell: number}): {newPosX: number, newPosY: number, newPosZ:number} {
    if(event.distanceToFinalCell === 0) {
      GSM.Settings.speed = this.tempSpeed
      this.asset.animation.changeEveryNthFrame = 16
    } else {
      this.asset.animation.changeEveryNthFrame = Math.abs(GSM.Settings.speed - 20 + 2)
    }
    return {newPosX: event.pathTrackPosX, newPosY: event.pathTrackPosY, newPosZ: event.assetPosZ}
  } 
}
