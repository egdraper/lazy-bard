import { Subject } from "rxjs"

export class KeyManager {
  public keysPressed: Set<string> = new Set()
  public keyDown = new Subject<KeyboardEvent>()
  public keyUp = new Subject<KeyboardEvent>()
  public deletePressed = new Subject<KeyboardEvent>()
}