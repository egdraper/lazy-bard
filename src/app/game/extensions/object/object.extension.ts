import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { ObjectRenderer } from './object.renderer';

export class ObjectExtension extends CanvasLayerExtension {
  public override excludeFromSingleImagePainting: boolean = true
  public renderer = new ObjectRenderer()
}
