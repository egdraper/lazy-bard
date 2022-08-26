import { GSM } from "../../game-state-manager.service";
import { Asset } from "../../models/asset.model";
import { Extension } from "../../models/extension.model";
import { Cell } from "../../models/map";
import { Orientation } from "../../core/default-features/orientation/orientation";
import { InteractionIndicatorRenderer } from "./indicator.renderer";

export class InteractionEvent {
  asset: Asset
  cell: Cell
  playerAsset: Asset
}

export class InteractionExtension extends Extension {
  public gameMasterView: Boolean = false
  public gamePlayerView: Boolean = true

  private interactionIndicatorRenderer = new InteractionIndicatorRenderer()

  public override async init(): Promise<void> {
    GSM.EventManager.assetEnteredCell.subscribe(this.findAdjacentAsset.bind(this))
    GSM.EventManager.playerOrientationChanged.subscribe(this.findAdjacentAsset.bind(this))
    GSM.EventManager.assetFinishingMovement.subscribe(this.findAdjacentAsset.bind(this))
    GSM.ImageManager.addImageBySrcUrl("assets/images/indicators/interaction2.png")
    
    this.registerRenderer([this.interactionIndicatorRenderer])
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
      this.interactionIndicatorRenderer.enabled = false
      GSM.EventManager.objectInteraction.next(null)
      return 
    }

    const assetBeingInteractedWith = assets.pop().asset
    
    this.interactionIndicatorRenderer.indicatorURL = GSM.Settings.indicatorIconUrl
    this.interactionIndicatorRenderer.enabled = true
    this.interactionIndicatorRenderer.asset = GSM.AssetManager.selectedAssets[0]
      
    GSM.EventManager.objectInteraction.next({ 
      asset: assetBeingInteractedWith, 
      playerAsset: event.asset,
      cell: adjacentCell,  
    })
  }
}