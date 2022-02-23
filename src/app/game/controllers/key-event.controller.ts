import { Subject } from "rxjs";
import { Cell } from "../models/map";

export class KeyEventController {
    public keyDown = new Subject<string>()
    public keyUp = new Subject<string>()

    public mouseDown = new Subject()
    public mouseUp = new Subject()

    public mouseHover = new Subject()

    public cellClick = new Subject<Cell>()
}