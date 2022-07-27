import { BehaviorSubject } from "rxjs";
import { GeneralAction } from "../models/settings";

export class ActionController {
  public generalActionFire: BehaviorSubject<GeneralAction> = new BehaviorSubject({name: "", data: null})
}