import { GSM } from "../game-state-manager.service";
import { AddOnExtension, CanvasCTX, Extension } from "../models/extension.model";
import { ElevationLayers } from "../models/map";
import { Renderer } from "../models/renderer";

export abstract class AddOnBase implements Extension {
    public abstract id: string
    public abstract visibleName: string
    public abstract zIndex: number;
    public abstract extensions: Extension[];
    public abstract ctx: CanvasCTX    
    public excludeFromSingleImagePainting: boolean = false // excludes this extension from background being rendered as part of a single image 
    public excludeFromIndividualCellPainting: boolean = false // excludes this extension from background being rendered as part of a single image 
    protected renderers: Renderer[] = []
  
    public async init(): Promise<void> {
      GSM.AddonController.registerAddon(this);
      
      for(const extension of this.extensions) {
        if(extension.init) {
          await extension.init()
        }
      }
      this.renderers = this.extensions.map((extension: AddOnExtension) => extension.renderer).filter(renderer => renderer);
    }
      
    public getRenderers(): Renderer[] {
      return this.renderers
    } 
  }
  