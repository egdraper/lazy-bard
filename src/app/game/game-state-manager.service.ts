import { Injectable } from '@angular/core';
import { CanvasController } from './controllers/canvas.controller';
import { MapController } from './controllers/map.controller';
import { EventController } from './controllers/event.controller';
import { PaintController } from './controllers/paint.controller';
import { AssetController } from './controllers/asset.controller';
import { FrameController } from './controllers/timing.controller';
import { Extensions } from './extensions/extensions';
import { Grid } from './models/map';
import { Settings } from './models/settings';
import { EditorController } from './controllers/editor.controller';

@Injectable({
  providedIn: 'root'
})
// Game State Manager
export class GSM {
  public static CanvasController: CanvasController
  public static Settings: Settings
  public static FrameController: FrameController
  public static Extensions: Extensions
  public static GridController: MapController
  public static PaintController: PaintController
  public static EventController: EventController
  public static AssetController: AssetController
  public static editorController: EditorController
  
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
    
    GSM.GridController = new MapController()
    GSM.GridController.setupNewMap({width, height})
    GSM.GridController.gameMap.baseTexture = baseTexture
    GSM.GridController.autoGenerateTerrain = autoGenerateTerrain

    GSM.FrameController = new FrameController()
    GSM.FrameController.start()   

    GSM.PaintController = new PaintController()

    GSM.EventController = new EventController()
    GSM.AssetController = new AssetController()
    GSM.editorController = new EditorController()
    
    this.loadingFinished = true
    
    setTimeout(() => {
      GSM.Extensions = new Extensions()
    }, 1000);
  }

  public loadGame(name: string): void {
    //TODO
  }
}
