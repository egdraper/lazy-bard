import { Subject } from "rxjs"
import { Action } from "../models/base.interaction"
import { Asset } from "../models/asset.model"

export class ActionsManager {
  public enabledActions: Action[] = []
  public storedActions: Action[] = []
  public assetsOfInterest: Asset[] = []

  public enabledActionsChange = new Subject()

  enableAction(action: Action) {
    if(this.enabledActions.find(_action => _action.displayName === action.displayName)) { return }
    this.enabledActions.push(this.storedActions.find(_action => _action.displayName === action.displayName))
    this.enabledActionsChange.next(this.enabledActions)
  }

  registerAction(action: Action) {
    this.storedActions.push(action)
  }

  disableAction(action: Action): void {
    this.enabledActions = this.enabledActions.filter(_action => _action.displayName !== action.displayName)
    this.enabledActionsChange.next(this.enabledActions)
  }

  disableAllActions() {
    this.enabledActions = []
  }

  public addAssetOfInterest(asset: Asset): void {
    if(this.assetsOfInterest.find(_asset => _asset.id === asset.id)) { return }
    this.assetsOfInterest.push(asset)
  }

  public removeAssetOfInterest(asset: Asset): void {
    this.assetsOfInterest = this.assetsOfInterest.filter(_asset => _asset.id !== asset.id)
  }
}