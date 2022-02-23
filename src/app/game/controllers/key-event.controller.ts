import { Subject } from "rxjs";
import { Cell } from "../models/map";

export class KeyEventController {
    public keyDown = new Subject<KeyboardEvent>()
    public keyUp = new Subject<KeyboardEvent>()

    public mouseDown = new Subject()
    public mouseUp = new Subject()

    public mouseHover = new Subject()

    public cellClick = new Subject<Cell>()
}