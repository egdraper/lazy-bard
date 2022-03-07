import { GSM } from "../game-state-manager.service";
import { AddOnExtension, CanvasCTX, Extension } from "../models/extension.model";
import { ElevationLayers } from "../models/map";
import { Painter } from "../models/painter";
import { LayerPainter } from "./add-on-layer-extensions/base-layer/base-layer.painter";
import { LayerImageGenerator } from "./add-on-layer-extensions/layer-image.generator";

export abstract class LayerAddOn implements Extension {
    public abstract id: string
    public abstract visibleName: string
    public abstract layerName: ElevationLayers;
    public abstract zIndex: number;
    public abstract extensions: Extension[];
    public abstract ctx: CanvasCTX
    
    public paintLayerAsSingleImage = false
    public layerPainter: LayerPainter
  
    protected painters: Painter[] = []
  
    public init(): void {
      GSM.LayerController.registerLayer(this);
      
      this.extensions.forEach(extension => {
        if(extension.init) {
          extension.init()
        }
      })
      this.setupPainters()   
    }
    
    public setupPainters(): void {
      this.layerPainter = new LayerPainter()  
      
      this.painters = this.extensions.map((extension: AddOnExtension) => extension.painter).filter(painter => painter);
      this.painters.sort((a, b) => a.paintOrder - b.paintOrder);
      
      this.painters.forEach(painter=> {
        if(this.ctx === CanvasCTX.Background) {
          painter.ctx = GSM.CanvasController.backgroundCTX
          this.layerPainter.ctx = painter.ctx
        }
        if(this.ctx === CanvasCTX.Foreground) {
          painter.ctx = GSM.CanvasController.foregroundCTX
          this.layerPainter.ctx = painter.ctx
        }
        if(this.ctx === CanvasCTX.Fog) {
          painter.ctx = GSM.CanvasController.fogCTX
          this.layerPainter.ctx = painter.ctx
        }
        if(this.ctx === CanvasCTX.BlackoutFog) {
          painter.ctx = GSM.CanvasController.blackoutCTX
          this.layerPainter.ctx = painter.ctx
        }
      })
    }
  
    public getPainters(): Painter[] {
      return this.painters
    }

    public generateLayerImage(): HTMLImageElement {
      const image = LayerImageGenerator.generateLayerImage(this.painters, this.layerName)
      return image
    }
  
  }
  