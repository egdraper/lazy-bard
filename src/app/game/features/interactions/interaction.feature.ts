import { GSM } from "../../game-state-manager.service";
import { Asset } from "../../models/asset.model";
import { Extension } from "../../models/extension.model";
import { Cell } from "../../models/map";
import { Orientation } from "../../core/default-features/orientation/orientation";
import { ClimbAction } from "./interactions/climb/climb.action";
import { PickUpAction } from "./interactions/pick-up/pick-up.action";

export class ActionEvent {
  asset: Asset
  cell: Cell
  playerAsset: Asset
}

export class InteractionExtension extends Extension {
  public gameMasterView: Boolean = false
  public gamePlayerView: Boolean = true

  private interactingAssets = []
  private climbAction = new ClimbAction()
  private pickUpAction = new PickUpAction()

  public override async init(): Promise<void> {
    GSM.EventManager.assetEnteredCell.subscribe(this.findAdjacentAsset.bind(this))
    GSM.EventManager.playerOrientationChanged.subscribe(this.findAdjacentAsset.bind(this))
    GSM.EventManager.assetFinishingMovement.subscribe(this.findAdjacentAsset.bind(this))

    GSM.ActionManager.registerAction(this.climbAction)
    GSM.ActionManager.registerAction(this.pickUpAction)
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
      this.interactingAssets.forEach(asset => {
        GSM.ActionManager.removeAssetOfInterest(asset.asset)
      })

      GSM.ActionManager.disableAction(this.climbAction)
      GSM.ActionManager.disableAction(this.pickUpAction)

      this.interactingAssets = []
      return 
    }

    this.interactingAssets = assets
    
    GSM.ActionManager.enableAction(this.climbAction)
    GSM.ActionManager.enableAction(this.pickUpAction)
    
    this.interactingAssets.forEach(asset => {
      GSM.ActionManager.addAssetOfInterest(asset.asset)
    })
  }
}