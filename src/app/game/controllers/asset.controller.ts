import { Subject } from "rxjs";
import { GSM } from "../game-state-manager.service";
import { Asset } from "../models/asset.model";
import { Cell } from "../models/map";

export class AssetController {
  public assets: Asset[] = []
  public assetClicked = new Subject<Asset>()

  constructor() {
    GSM.KeyEventController.cellClick.subscribe(this.onCellClicked.bind(this))
  }

  public getAssetByCell(cell: Cell): Asset | undefined {
    return this.assets.find(asset => asset.cell.id === cell.id)
  }

  public getSelectedAssets(): Asset[] {
    return this.assets.filter(asset => asset.selected)
  }

  private onCellClicked(cell: Cell): void {
    const asset = this.getAssetByCell(cell)
    if (asset) {
      this.assetClicked.next(asset)
    }
  } 
}