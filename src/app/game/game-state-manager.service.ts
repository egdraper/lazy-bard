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
import { CellNeighborsController } from './controllers/cell-neighbors.controller';
import { GameData } from './game-data';
import { MouseController } from './controllers/mouse.controller';
@Injectable({
  providedIn: 'root'
})
// Game State Manager
export class GSM {
  // Persisting Core Data
  public static GameData: GameData

  // App Function Controllers
  public static AssetController: AssetController
  public static CanvasController: CanvasController
  public static CanvasModuleController: CanvasModuleController
  public static CellNeighborsController: CellNeighborsController
  public static ElevationController: ElevationController
  public static EventController: EventController
  public static Extensions: Extensions
  public static FrameController: FrameController
  public static GridController: MapController
  public static ImageController: ImagesController
  public static RendererController: RendererController
  public static MouseController: MouseController
  public static Settings: Settings
  public loadingFinished = false
  
  public newGame(
    name: string,
    width: number,
    height: number,
    baseTexture: string = "forest",
  ): void {
    // Order Matters
    GSM.GameData = new GameData()
    GSM.Settings = new Settings()
    GSM.MouseController = new MouseController()
    GSM.CanvasController = new CanvasController()
    GSM.FrameController = new FrameController()
    GSM.EventController = new EventController()
    GSM.CanvasModuleController = new CanvasModuleController()
    GSM.RendererController = new RendererController() 
    GSM.Extensions = new Extensions() 
    GSM.GridController = new MapController()
    GSM.ElevationController = new ElevationController()
    GSM.GridController.createGameMap({x: width, y: height})
    GSM.ImageController = new ImagesController()   
    GSM.GameData.map.baseTexture = baseTexture
    
    //Order Doesn't Matter
    GSM.AssetController = new AssetController()
    GSM.CellNeighborsController = new CellNeighborsController()
    
    this.loadingFinished = true
    
    GSM.CanvasController.setupComplete.subscribe(() => {            
      setTimeout(async ()=> {        
        await GSM.Extensions.init()
      })
    })
  }
}
