import { Subject } from "rxjs";

export class FrameManager {
  public frameFire = new Subject<number>()
  private frame = 1

  public start(): any {
    this.frameFire.next(this.frame)   
    
    this.frame >= 64 ? this.frame = 1 : this.frame += 1
    requestAnimationFrame(this.start.bind(this))
  }
}