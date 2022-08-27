import { Orientation } from "../../core/default-features/orientation/orientation"
import { GSM } from "../../game-state-manager.service"
import { Extension } from "../../models/extension.model"
import { EnterAction } from "./enter.action"
import { PortalingAsset } from "./portal-bush.feature"

export class PortalingFeature extends Extension{
  public gameMasterView: Boolean = false
  public gamePlayerView: Boolean = true

  private enterAction = new EnterAction()
  
  public override async init(): Promise<void> {
    GSM.EventManager.assetEnteredCell.subscribe(this.findAdjacentAsset.bind(this))
    GSM.EventManager.playerOrientationChanged.subscribe(this.findAdjacentAsset.bind(this))
    GSM.EventManager.assetFinishingMovement.subscribe(this.findAdjacentAsset.bind(this))

    GSM.ActionManager.registerAction(this.enterAction)
  }

  private findAdjacentAsset(event: any): void {
    let adjacentCell
    
    if(event.asset.orientation.currentOrientation === Orientation.Left) {
      adjacentCell = GSM.GridManager.getCellByLocation(event.cell.location.x - 1, event.cell.location.y)
    }
    
    if(event.asset.orientation.currentOrientation === Orientation.Right) {
      adjacentCell = GSM.GridManager.getCellByLocation(event.cell.location.x + 1, event.cell.location.y)
    }
    
    if(event.asset.orientation.currentOrientation === Orientation.Up) {
      adjacentCell = GSM.GridManager.getCellByLocation(event.cell.location.x, event.cell.location.y - 1)
    }
    
    if(event.asset.orientation.currentOrientation === Orientation.Down) {
      adjacentCell = GSM.GridManager.getCellByLocation(event.cell.location.x, event.cell.location.y + 1)
    }

    const assets = GSM.AssetManager.getAssetsByCellAtZ(adjacentCell, event.asset.baseZIndex) 
    
    if(assets.length === 0) {
      GSM.ActionManager.disableAction(this.enterAction)
      return
    }

    GSM.ActionManager.enableAction(this.enterAction)
 
  }
}