import { Injectable } from '@angular/core';
import { CanvasController } from './controllers/canvas.controller';
import { MapController } from './controllers/map.controller';
import { EventController } from './controllers/event.controller';
import { PaintController } from './controllers/paint.controller';
import { AssetController } from './controllers/asset.controller';
import { FrameController } from './controllers/timing.controller';

import { Settings } from './models/settings';
import { LayerController } from './controllers/layer.controller';
import { Extensions } from './extensions/extensions';
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
  public static LayerController: LayerController
  public loadingFinished = false
  constructor() {
  }
  
  public newGame(
    name: string,
    width: number,
    height: number,
    baseTexture: string = "forest",
  ): void {
    // Order Matters
    GSM.Settings = new Settings()
    GSM.CanvasController = new CanvasController()
    GSM.FrameController = new FrameController()
    GSM.EventController = new EventController()
    GSM.LayerController = new LayerController()
    GSM.PaintController = new PaintController()    
    GSM.Extensions = new Extensions() 
    GSM.GridController = new MapController()
    GSM.GridController.createGameMap({width, height})
    GSM.GridController.gameMap.baseTexture = baseTexture
    
    //Order Doesn't Matter
    GSM.AssetController = new AssetController()
    
    this.loadingFinished = true
    
    GSM.CanvasController.setupComplete.subscribe(() => {            
      setTimeout(()=> {
        GSM.Extensions.init()
        GSM.GridController.setupMap()
        GSM.FrameController.start()  
      })
    })
  }
  
  public onCanvasSetupComplete(): void {
  }

  public loadGame(name: string): void {
    //TODO
  }
}
