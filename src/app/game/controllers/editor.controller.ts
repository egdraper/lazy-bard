import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { drawableItems } from "../db/drawable-items.db";
import { Cell, DrawableItem } from "../models/map";

export class SelectedAction {
    name: string
    data: unknown
}

export class EditorController { 
  public selectedAction: BehaviorSubject<SelectedAction> = new BehaviorSubject({name: "", data: null})
}