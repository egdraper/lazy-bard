import { Injectable } from '@angular/core';
import { CanvasManager } from './core/canvas.manager';
import { MapManager } from './core/map.manager';
import { EventManager } from './core/event.manager';
import { RendererManager } from './core/render.manager';
import { FrameManager } from './core/timing.manager';

import { Settings } from './models/settings';
import { CanvasModuleManager } from './core/canvas-module.manager';
import { CanvasModules } from './module.register';
import { ImagesManager } from './core/images.manager';
import { CellNeighborsManager } from './core/cell-neighbors.manager';
import { GameData } from './game-data';
import { MouseManager } from './core/mouse.manager';
import { AssetManager } from './core/asset.manager';
import { RotationManager } from './core/rotation.manager';
import { KeyManager } from './core/key.manager';
import { InteractionsManager } from './core/interactions.manager';

@Injectable({
  providedIn: 'root'
})
// Game State Manager
export class GSM {
  // Persisting Core Data
  public static GameData: GameData

  // App Function Managers
  public static CanvasManager: CanvasManager
  public static CanvasModuleManager: CanvasModuleManager
  public static CellNeighborsManager: CellNeighborsManager
  public static EventManager: EventManager
  public static Extensions: CanvasModules
  public static FrameManager: FrameManager
  public static GridManager: MapManager
  public static ImageManager: ImagesManager
  public static RendererManager: RendererManager
  public static MouseManager: MouseManager
  public static KeyManager: KeyManager
  public static AssetManager: AssetManager
  public static RotationManager: RotationManager
  public static InteractionManager: InteractionsManager
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
    GSM.CanvasManager = new CanvasManager()
    GSM.FrameManager = new FrameManager()
    GSM.EventManager = new EventManager()
    GSM.CanvasModuleManager = new CanvasModuleManager()
    GSM.RendererManager = new RendererManager() 
    GSM.Extensions = new CanvasModules() 
    GSM.GridManager = new MapManager()
    GSM.RotationManager = new RotationManager()
    GSM.GridManager.createGameMap({x: width, y: height})
    GSM.ImageManager = new ImagesManager()   
    GSM.KeyManager = new KeyManager()
    GSM.MouseManager = new MouseManager()
    GSM.AssetManager = new AssetManager()
    GSM.GridManager.map.baseTexture = baseTexture
    
    //Order Doesn't Matter
    GSM.CellNeighborsManager = new CellNeighborsManager()
    GSM.InteractionManager = new InteractionsManager()
    
    this.loadingFinished = true
    
    GSM.CanvasManager.setupComplete.subscribe(() => {            
      setTimeout(async ()=> {        
        await GSM.Extensions.init()
      })
    })
  }
}
