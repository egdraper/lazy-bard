import { Movement } from "./base.movement"
import { ShortestPath, TravelPath } from "../shortest-path"
import { GSM } from "src/app/game/game-state-manager.service"
import { Asset } from "../../../models/asset.model"
import { Position } from "src/app/game/models/map"

export class Skip extends Movement {   
  public travelPath: TravelPath = new ShortestPath()
  
  constructor(public asset: Asset) {
    super(asset.animation, new Position(asset.blocks.position.x, asset.blocks.position.y, 0))
  }

  public move(event: {assetPosX: number, assetPosY: number, assetPosZ: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number, distanceToFinalCell: number}): {newPosX: number, newPosY: number, newPosZ:number} {
    this.asset.animation.changeEveryNthFrame = 8
    if(event.distanceToNextCell > (GSM.Settings.blockSize / 2)) {
      event.assetPosZ -= 1
    }
    if(event.distanceToNextCell <= (GSM.Settings.blockSize / 2) && event.distanceToFinalCell < GSM.Settings.blockSize) {
      event.assetPosZ += 1
    }

    if(event.distanceToFinalCell === 0) {
      this.asset.animation.changeEveryNthFrame = 16
    }
    
    return {newPosX: event.pathTrackPosX, newPosY: event.pathTrackPosY, newPosZ: event.assetPosZ}
  }   
}
