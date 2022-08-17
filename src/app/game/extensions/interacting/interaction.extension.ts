import { GSM } from "../../game-state-manager.service";
import { Extension } from "../../models/extension.model";
import { Orientation } from "../asset/orientation.ts/direction";

export class InteractionExtension extends Extension{
  public gameMasterView: Boolean = false
  public gamePlayerView: Boolean = true

  public override async init(): Promise<void> {
    GSM.EventController.assetEnteredCell.subscribe(this.findAdjacentAsset.bind(this))
    GSM.EventController.playerOrientationChanged.subscribe(this.findAdjacentAsset.bind(this))
  }

  private findAdjacentAsset(event: any): void {
    let adjacentCell
    if(event.asset.orientation.currentOrientation === Orientation.Left) {
      adjacentCell = GSM.GridController.getCellByLocation(event.cell.attributes.location.x - 1, event.cell.attributes.location.y)
    }
    if(event.asset.orientation.currentOrientation === Orientation.Right) {
      adjacentCell = GSM.GridController.getCellByLocation(event.cell.attributes.location.x + 1, event.cell.attributes.location.y)
    }
    if(event.asset.orientation.currentOrientation === Orientation.Up) {
      adjacentCell = GSM.GridController.getCellByLocation(event.cell.attributes.location.x, event.cell.attributes.location.y - 1)
    }
    if(event.asset.orientation.currentOrientation === Orientation.Down) {
      adjacentCell = GSM.GridController.getCellByLocation(event.cell.attributes.location.x, event.cell.attributes.location.y + 1)
    }
    const assets = GSM.AssetController.getAssetsByCellAtZ(adjacentCell, event.asset.baseZIndex)

    if(assets.length > 0) {
      
    }
  }
}