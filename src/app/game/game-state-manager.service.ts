import { Injectable } from '@angular/core';
import { CanvasController } from './controllers/canvas.controller';
import { MapController } from './controllers/map.controller';
import { ActionController } from './controllers/event.controller';
import { RendererController } from './controllers/render.controller';
import { FrameController } from './controllers/timing.controller';

import { Settings } from './models/settings';
import { CanvasModuleController } from './controllers/canvas-module.controller';
import { Extensions } from './extensions.register';
import { ImagesController } from './controllers/images.controller';
import { CellNeighborsController } from './controllers/cell-neighbors.controller';
import { GameData } from './game-data';
import { MouseController } from './controllers/mouse.controller';
import { AssetController } from './controllers/asset.controller';
import { RotationController } from './controllers/rotation.controller';
import { KeyController } from './controllers/key.controller';
@Injectable({
  providedIn: 'root'
})
// Game State Manager
export class GSM {
  // Persisting Core Data
  public static GameData: GameData

  // App Function Controllers
  public static CanvasController: CanvasController
  public static CanvasModuleController: CanvasModuleController
  public static CellNeighborsController: CellNeighborsController
  public static ActionController: ActionController
  public static Extensions: Extensions
  public static FrameController: FrameController
  public static GridController: MapController
  public static ImageController: ImagesController
  public static RendererController: RendererController
  public static MouseController: MouseController
  public static KeyController: KeyController
  public static AssetController: AssetController
  public static RotationController: RotationController
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
    GSM.CanvasController = new CanvasController()
    GSM.FrameController = new FrameController()
    GSM.ActionController = new ActionController()
    GSM.CanvasModuleController = new CanvasModuleController()
    GSM.RendererController = new RendererController() 
    GSM.Extensions = new Extensions() 
    GSM.GridController = new MapController()
    GSM.RotationController = new RotationController()
    GSM.GridController.createGameMap({x: width, y: height})
    GSM.ImageController = new ImagesController()   
    GSM.AssetController = new AssetController()
    GSM.GameData.map.baseTexture = baseTexture
    
    //Order Doesn't Matter
    GSM.MouseController = new MouseController()
    GSM.CellNeighborsController = new CellNeighborsController()
    GSM.KeyController = new KeyController()
    
    this.loadingFinished = true
    
    GSM.CanvasController.setupComplete.subscribe(() => {            
      setTimeout(async ()=> {        
        await GSM.Extensions.init()
      })
    })
  }
}
