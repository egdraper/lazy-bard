import { BehaviorSubject, Subject } from "rxjs";
import { Asset } from "../models/asset.model";
import { Cell } from "../models/map";
import { GeneralAction } from "../models/settings";

export class EventController {
  public generalActionFire: BehaviorSubject<GeneralAction> = new BehaviorSubject({name: "", data: null})
  public assetEnteredCell = new Subject()
  public assetFinishingMovement = new Subject<Cell>()
  public assetStartingMovement = new Subject()
  public assetClicked = new Subject()
  public assetDeleted = new Subject()
  public assetSelected = new Subject()
  public assetPlayerAdded = new Subject()
  public assetObjectAdded = new Subject()
  public TerrainAdded = new Subject
  public playerOrientationChanged = new Subject()
  public assetOrientationChanged = new Subject()









}