import { Asset } from "../models/asset.model";
import { Cell } from "../models/map";

export class AssetController {
  public assets: Asset[] = []

  public getAssetByCell(cell: Cell): Asset | undefined {
    return this.assets.find(asset => asset.cell.id === cell.id)
  }
}