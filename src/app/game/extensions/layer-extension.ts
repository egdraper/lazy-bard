import { GSM } from "../game-state-manager.service";
import { AddOnExtension, CanvasCTX, Extension } from "../models/extension.model";
import { ElevationLayers } from "../models/map";
import { Painter } from "../models/painter";
import { LayerPainter } from "./base-layer.painter";
import { ImageGenerator } from "./image.generator";

export abstract class LayerAddOn implements Extension {
    public abstract id: string
    public abstract visibleName: string
    public abstract layerName: ElevationLayers;
    public abstract zIndex: number;
    public abstract extensions: Extension[];
    public abstract ctx: CanvasCTX    
    public excludeFromSingleImagePainting: boolean = false // excludes this extension from background being rendered as part of a single image 
    protected painters: Painter[] = []
  
    public init(): void {
      GSM.LayerController.registerLayer(this);
      
      this.extensions.forEach(extension => {
        if(extension.init) {
          extension.init()
        }
      })
      this.painters = this.extensions.map((extension: AddOnExtension) => extension.painter).filter(painter => painter);
    }
      
    public getPainters(): Painter[] {
      return this.painters
    } 
  }
  