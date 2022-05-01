import { BehaviorSubject, Subject } from "rxjs";
import { Cell } from "../models/map";
import { GeneralAction } from "../models/settings";

export class ActionController {
    public generalActionFire: BehaviorSubject<GeneralAction> = new BehaviorSubject({name: "", data: null})
}