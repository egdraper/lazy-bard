import { GSM } from "../game-state-manager.service"
import { GeneralAction } from "../models/settings"

export class ElevationController {
  public transition = {}

  constructor() {
    GSM.EventController.generalActionFire.subscribe(this.onElevationChange.bind(this))
  }

  private onElevationChange(event: GeneralAction<any>) {
    if(!GSM.GameData.map) { return }
      
    if(event.name === "addElevationUp") {
         if(GSM.GameData.map.currentElevationLayerIndex === GSM.GameData.map.topMostElevationLayerIndex) {
            GSM.GridController.setupMap(++GSM.GameData.map.topMostElevationLayerIndex)
            GSM.GameData.map.currentElevationLayerIndex = GSM.GameData.map.topMostElevationLayerIndex
            return
          } else {
            GSM.GameData.map.currentElevationLayerIndex++
          }
        }
    
        if(event.name === "addElevationDown") {
          if(GSM.GameData.map.currentElevationLayerIndex === GSM.GameData.map.bottomMostElevationLayerIndex) {
            GSM.GridController.setupMap(--GSM.GameData.map.bottomMostElevationLayerIndex)
            GSM.GameData.map.currentElevationLayerIndex = GSM.GameData.map.bottomMostElevationLayerIndex
            return
          } else {
            GSM.GameData.map.currentElevationLayerIndex--
          }
        }
      }
}
