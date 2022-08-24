import { GSM } from "../../game-state-manager.service";
import { Asset } from "../../models/asset.model";
import { Extension } from "../../models/extension.model";
import { Cell } from "../../models/map";
import { Orientation } from "../asset/orientation.ts/direction";
import { InteractionIndicatorRenderer } from "./indicator.renderer";

export class InteractionEvent {
  asset: Asset
  cell: Cell
  playerAsset: Asset
}

export class InteractionExtension extends Extension {
  public gameMasterView: Boolean = false
  public gamePlayerView: Boolean = true

  public override async init(): Promise<void> {
    GSM.EventController.assetEnteredCell.subscribe(this.findAdjacentAsset.bind(this))
    GSM.EventController.playerOrientationChanged.subscribe(this.findAdjacentAsset.bind(this))
    GSM.EventController.assetFinishingMovement.subscribe(this.findAdjacentAsset.bind(this))
    GSM.ImageController.addImageBySrcUrl("assets/images/indicators/interaction2.png")
  }

  private findAdjacentAsset(event: any): void {
    let adjacentCell
    
    if(event.asset.orientation.currentOrientation === Orientation.Left) {
      adjacentCell = GSM.GridController.getCellByLocation(event.cell.location.x - 1, event.cell.location.y)
    }
    
    if(event.asset.orientation.currentOrientation === Orientation.Right) {
      adjacentCell = GSM.GridController.getCellByLocation(event.cell.location.x + 1, event.cell.location.y)
    }
    
    if(event.asset.orientation.currentOrientation === Orientation.Up) {
      adjacentCell = GSM.GridController.getCellByLocation(event.cell.location.x, event.cell.location.y - 1)
    }
    
    if(event.asset.orientation.currentOrientation === Orientation.Down) {
      adjacentCell = GSM.GridController.getCellByLocation(event.cell.location.x, event.cell.location.y + 1)
    }

    const assets = GSM.AssetController.getAssetsByCellAtZ(adjacentCell, event.asset.baseZIndex)    
    const indicatorRenderer = GSM.RendererController.getRenderer("InteractionIndicatorRenderer") as InteractionIndicatorRenderer
    
    if(assets.length === 0) {
      indicatorRenderer.enabled = false
      GSM.EventController.objectInteraction.next(null)
      return 
    }

    const assetBeingInteractedWith = assets.pop().asset
    
    indicatorRenderer.indicatorURL = GSM.Settings.indicatorIconUrl
    indicatorRenderer.enabled = true
    indicatorRenderer.asset = GSM.AssetController.selectedAssets[0]
      
    GSM.EventController.objectInteraction.next({ 
      asset: assetBeingInteractedWith, 
      playerAsset: event.asset,
      cell: adjacentCell,  
    })
  }
}