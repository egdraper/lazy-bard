import { Movement } from "../../core/default-features/movement/movement"
import { ShortestPath } from "../../core/default-features/travel-path/shortest-path"
import { GSM } from "src/app/game/game-state-manager.service"
import { PlaceableAsset } from "../../models/asset.model"
import { Position } from "src/app/game/models/map"
import { TravelPath } from "src/app/game/core/default-features/travel-path/travel-path"

export class Skip extends Movement {   
  public travelPath: TravelPath = new ShortestPath()
  
  constructor(public asset: PlaceableAsset) {
    super(asset.animation, new Position(asset.anchorCell.position.x, asset.anchorCell.position.y, 0))
    this.speed = 1
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
