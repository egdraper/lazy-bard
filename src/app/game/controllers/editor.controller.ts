import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { drawableItems } from "../db/drawable-items.db";
import { DrawableItem } from "../models/map";

export class EditorController { 
    public selectedDrawableItem: BehaviorSubject<DrawableItem> = new BehaviorSubject(drawableItems[0])
}