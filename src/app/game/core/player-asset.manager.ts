import { Asset } from "../models/asset.model"

export class PlayerAssetManager {
  public playerAsset: Asset
  public assignedPlayerAssets: Asset[] = []

  public inventory: Asset[] = []
}