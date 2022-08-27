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
import { PlayerAssetManager } from './core/player-asset.manager';
import { ActionsManager } from './core/actions.manager';

@Injectable({
  providedIn: 'root'
})
// Game State Manager
export class GSM {
  public loadingFinished

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
  public static PlayerAssetManager: PlayerAssetManager
  public static ActionManager: ActionsManager
  
  public newGame(
    name: string,
    width: number,
    height: number,
    baseTexture: string = "forest",
  ): Promise<void> {

    return new Promise(resolve => {
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
      GSM.KeyManager = new KeyManager()
      GSM.AssetManager = new AssetManager()
      GSM.ImageManager = new ImagesManager()   
      GSM.MouseManager = new MouseManager()
      GSM.PlayerAssetManager = new PlayerAssetManager()
      GSM.ActionManager = new ActionsManager()
      
      //Order Doesn't Matter
      GSM.CellNeighborsManager = new CellNeighborsManager()
      GSM.InteractionManager = new InteractionsManager()
      
      GSM.GridManager.createGameMap({x: width, y: height}, baseTexture)
      this.loadingFinished = true

      GSM.CanvasManager.setupComplete.subscribe(() => {            
        setTimeout(async ()=> {        
          await GSM.Extensions.init()
          resolve()
        })
      })

    })
  }
}
