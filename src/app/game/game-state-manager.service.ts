import { Injectable } from '@angular/core';
import { CanvasController } from './controllers/canvas.controller';
import { FrameController } from './controllers/timing.controller';
import { Extensions } from './extensions/extensions';
import { Settings } from './models/settings';

@Injectable({
  providedIn: 'root'
})
// Game State Manager
export class GSM {
  public static CanvasController: CanvasController
  public static Settings: Settings
  public static FrameController: FrameController
  public static Extensions: Extensions

  constructor() {

  }

  public newGame(name: string): void {
    GSM.CanvasController = new CanvasController()
    GSM.Settings = new Settings()
    GSM.FrameController = new FrameController()
    GSM.Extensions = new Extensions()


    GSM.FrameController.start()
  }

  public loadGame(name: string): void {
    //TODO
  }
}
