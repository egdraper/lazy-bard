import { GSM } from "../game-state-manager.service";
import { AddOnExtension, CanvasCTX, Extension } from "../models/extension.model";
import { ElevationLayers } from "../models/map";
import { Painter } from "../models/painter";

export abstract class LayerAddOn implements Extension {
    public abstract id: string
    public abstract layer: ElevationLayers;
    public abstract zIndex: number;
    public abstract extensions: Extension[];
    public abstract ctx: CanvasCTX
  
    protected painters: Painter[] = [] 
    protected singeFramePainters: Painter[] = [] 
  
    public init(): void {
      GSM.LayerController.registerLayer(this);
      
      this.extensions.forEach(extension => {
        if(extension.init) {
          extension.init()
        }
        this.setupPainters()       
      })
    }
  
    public setupPainters(): void {
      this.painters = this.extensions.map((extension: AddOnExtension) => extension.painter).filter(painter => painter);
      this.singeFramePainters = this.extensions.map((extension: AddOnExtension) => extension.largeImagePainters).filter(painter => painter)
      this.painters.sort((a, b) => a.paintOrder - b.paintOrder);
      
      this.painters.forEach(painter=> {
        if(this.ctx === CanvasCTX.Background) {
          painter.ctx = GSM.CanvasController.backgroundCTX
        }
        if(this.ctx === CanvasCTX.Foreground) {
          painter.ctx = GSM.CanvasController.foregroundCTX
        }
        if(this.ctx === CanvasCTX.Fog) {
          painter.ctx = GSM.CanvasController.fogCTX
        }
        if(this.ctx === CanvasCTX.BlackoutFog) {
          painter.ctx = GSM.CanvasController.blackoutCTX
        }
      })
    }
  
    public getPainters(): Painter[] {
      return this.painters
    }

    public getLargeImagePainters(): Painter[] {
      return this.singeFramePainters
    }
  
    public convertLayerToLargeImage() {
  
    };
  }
  