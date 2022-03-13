import { GSM } from "../game-state-manager.service";
import { CanvasCTX, Extension } from "../models/extension.model";

import { ElevationLayers } from "../models/map";
import { CanvasLayerExtension, Renderer } from "../models/renderer";

export abstract class CanvasModule {
    public abstract extensions: Extension[];
    public abstract ctx: CanvasCTX    
    
    private _renderers: Renderer[] = []
    public get renderers() {
      return this._renderers
    }
  
    constructor() {
      GSM.CanvasModuleController.registerAddon(this)
    }
    
    public async init(): Promise<void> {      
      for(const extension of this.extensions) {
        if(extension.init) {
          await extension.init()
        }
      }
      this._renderers = this.extensions.map((extension: CanvasLayerExtension) => extension.renderer).filter(renderer => renderer);
    }
  }
  