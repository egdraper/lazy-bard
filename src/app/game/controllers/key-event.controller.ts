import { Subject } from "rxjs";

export class KeyEventController {
    public keyDown = new Subject<string>()
    public keyUp = new Subject<string>()

    public mouseDown = new Subject()
    public mouseUp = new Subject()

    public mouseHover = new Subject()
}