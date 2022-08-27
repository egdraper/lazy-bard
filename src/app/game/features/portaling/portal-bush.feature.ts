import { GSM } from "../../game-state-manager.service"
import { Asset } from "../../models/asset.model"
import { Extension } from "../../models/extension.model"
import { Cell } from "../../models/map"

export class PortalingAsset extends Asset {
  public portalDestination: Cell
  public portalDestinationZIndex: number
}

export class PortalBrushFeature extends Extension {
  public gameMasterView: Boolean = true
  public gamePlayerView: Boolean = false
  
  public addingPortal = false
  public portalStartAsset: PortalingAsset

  public override async init(): Promise<void> {
    GSM.MouseManager.assetClick.subscribe(this.onAssetClicked.bind(this))
  }

  public onAssetClicked(asset: PortalingAsset): void {
    if (GSM.EventManager.generalActionFire.value.name !== 'addingPortal') { return }
    
    if(!this.addingPortal) {
      this.addingPortal = true
      this.portalStartAsset = asset
      setTimeout(() => {
        GSM.MouseManager.cellClick.subscribe(this.onCellClicked.bind(this))
      });
    }
  }

  public onCellClicked(cell: Cell): void {
    if (GSM.EventManager.generalActionFire.value.name !== 'addingPortal') { return }
    if(this.addingPortal) {
      this.portalStartAsset.portalDestination = cell
      this.portalStartAsset.portalDestinationZIndex = GSM.MouseManager.hoveringZAxisAtMouseDown
      this.addingPortal = false
    }
  }
}