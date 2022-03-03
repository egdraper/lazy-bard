import { GSM } from "../game-state-manager.service";
import { Extension } from "../models/extension.model";
import { ElevationLayers } from "../models/map";
import { Painter } from "../models/painter";

export abstract class LayerExtension {
    public abstract layer: ElevationLayers;
    public abstract zIndex: number;
    public abstract extensions: Extension[];
  
    protected painters: Painter[] = []  

    constructor() {
      this.setupPainters()
    }
  
    public setupPainters(): void {
      setTimeout(() => {
        GSM.LayerController.registerLayer(this);
        this.painters = this.extensions.map((extension: Extension) => extension.painter);
        this.painters.sort((a, b) => a.paintOrder - b.paintOrder);
      })
    }
  
    public getPainters(): Painter[] {
      return this.painters
    }
  
    public convertLayerToLargeImage() {
  
    };
  }
  