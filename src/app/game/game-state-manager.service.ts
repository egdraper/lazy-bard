import { Injectable } from '@angular/core';
import { CanvasController } from './controllers/canvas.controller';
import { MapController } from './controllers/map.controller';
import { EventController } from './controllers/event.controller';
import { RendererController } from './controllers/render.controller';
import { AssetController } from './controllers/asset.controller';
import { FrameController } from './controllers/timing.controller';

import { Settings } from './models/settings';
import { CanvasModuleController } from './controllers/canvas-module.controller';
import { Extensions } from './extensions.register';
import { ImagesController } from './controllers/images.controller';
import { ElevationController } from './controllers/elevation.controller';
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
  public static ElevationController: ElevationController
  public static RendererController: RendererController
  public static EventController: EventController
  public static AssetController: AssetController
  public static CanvasModuleController: CanvasModuleController
  public static ImageController: ImagesController
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
    GSM.CanvasModuleController = new CanvasModuleController()
    GSM.RendererController = new RendererController() 
    GSM.Extensions = new Extensions() 
    GSM.GridController = new MapController()
    GSM.ElevationController = new ElevationController()
    GSM.GridController.createGameMap({width, height})
    GSM.ImageController = new ImagesController()   
    GSM.GridController.gameMap.baseTexture = baseTexture
    
    //Order Doesn't Matter
    GSM.AssetController = new AssetController()
    
    this.loadingFinished = true
    
    GSM.CanvasController.setupComplete.subscribe(() => {            
      setTimeout(async ()=> {

        
        // sets up extension and their renderers
        await GSM.Extensions.init()
      })
    })
  }
  
  public onCanvasSetupComplete(): void {
  }

  public loadGame(name: string): void {
    //TODO
  }
}
