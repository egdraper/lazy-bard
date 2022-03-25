import { GSM } from "../game-state-manager.service"
import { GeneralAction } from "../models/settings"

export class ElevationController {
    public transition = {}

    constructor() {
      GSM.EventController.generalActionFire.subscribe(this.onElevationChange.bind(this))
    }

    private onElevationChange(event: GeneralAction<any>) {
        if(!GSM.GridController.gameMap) { return }
       
        if(event.name === "addElevationUp") {
          if(GSM.GridController.gameMap.currentElevationLayerIndex === GSM.GridController.gameMap.topMostElevationLayerIndex) {
            GSM.GridController.setupMap(++GSM.GridController.gameMap.topMostElevationLayerIndex)
            GSM.GridController.gameMap.currentElevationLayerIndex = GSM.GridController.gameMap.topMostElevationLayerIndex
            return
          } else {
            GSM.GridController.gameMap.currentElevationLayerIndex++
          }
        }
    
        if(event.name === "addElevationDown") {
          if(GSM.GridController.gameMap.currentElevationLayerIndex === GSM.GridController.gameMap.bottomMostElevationLayerIndex) {
            GSM.GridController.setupMap(--GSM.GridController.gameMap.bottomMostElevationLayerIndex)
            GSM.GridController.gameMap.currentElevationLayerIndex = GSM.GridController.gameMap.bottomMostElevationLayerIndex
            return
          } else {
            GSM.GridController.gameMap.currentElevationLayerIndex--
          }
        }
      }
}
