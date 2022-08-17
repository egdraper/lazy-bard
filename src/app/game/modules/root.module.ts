import { GSM } from "../game-state-manager.service"
import { CanvasCTX, Extension } from "../models/extension.model"
import { CanvasLayerExtension, Renderer } from "../models/renderer"

export abstract class RootCanvasModule {
    public abstract extensions: Extension[]
    public abstract ctx: CanvasCTX 
    public abstract canvasName: string    
    public abstract renderers: Renderer[]
    

    constructor() {
      GSM.CanvasModuleController.registerModule(this)
    }
    
    public async init(): Promise<void> {      
      for(const extension of this.extensions) {
        if(extension.init) {
          await extension.init()
        }
      }
    }
  }
  