import { Injectable } from '@angular/core';
import { CanvasController } from './controllers/canvas.controller';
import { GridController } from './controllers/grid.controller';
import { PaintController } from './controllers/paint.controller';
import { FrameController } from './controllers/timing.controller';
import { Extensions } from './extensions/extensions';
import { Grid } from './models/map';
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
  public static GridController: GridController
  public static PaintController: PaintController

  public loadingFinished = false

  constructor() {
  }
  
  public newGame(
    name: string,
    width: number,
    height: number,
    baseTexture: string = "forest",
    autoGenerateTerrain: boolean = false
  ): void {
    GSM.Settings = new Settings()
    GSM.CanvasController = new CanvasController()
    
    GSM.GridController = new GridController()
    GSM.GridController.setupGrid({width, height})
    GSM.GridController.grid.baseTexture = baseTexture
    GSM.GridController.autoGenerateTerrain = autoGenerateTerrain

    GSM.FrameController = new FrameController()
    GSM.FrameController.start()   

    GSM.PaintController = new PaintController() 
    GSM.PaintController.startPainter()
    
    this.loadingFinished = true
    
    setTimeout(() => {
      GSM.Extensions = new Extensions()
    }, 1000);
  }

  public loadGame(name: string): void {
    //TODO
  }
}
