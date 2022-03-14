import { BehaviorSubject, Subject } from "rxjs";
import { GeneralAction } from "../models/settings";

export class EventController {
    public keysPressed: Set<string> = new Set()
    public keyDown = new Subject<KeyboardEvent>()
    public keyUp = new Subject<KeyboardEvent>()

    public mouseDown = new Subject()
    public mouseUp = new Subject()
    public mouseHover = new Subject()
    
    public cellClick = new Subject<string>()
    public emptyCellClicked = new Subject<string>()
    public cellMouseEntered = new Subject<string>()
    public generalActionFire: BehaviorSubject<GeneralAction> = new BehaviorSubject({name: "", data: null})

}