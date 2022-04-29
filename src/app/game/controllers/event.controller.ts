import { BehaviorSubject, Subject } from "rxjs";
import { Cell } from "../models/map";
import { GeneralAction } from "../models/settings";

export class EventController {
    public keysPressed: Set<string> = new Set()
    public keyDown = new Subject<KeyboardEvent>()
    public keyUp = new Subject<KeyboardEvent>()

    public mouseDown = new Subject()
    public mouseUp = new Subject()
    public mouseHover = new Subject()
    
    public mouseClick = new Subject<{x: number, y: number}>()
    public cellClick = new Subject<Cell>()
    public emptyCellClicked = new Subject<Cell>()
    public cellMouseEntered = new Subject<Cell>()
    public generalActionFire: BehaviorSubject<GeneralAction> = new BehaviorSubject({name: "", data: null})
}