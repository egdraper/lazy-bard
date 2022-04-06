import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { SelectionIndicatorRenderer } from './interaction-indicator.renderer';

export class SelectionIndicatorExtension extends CanvasLayerExtension {
  public override excludeFromSingleImagePainting: boolean = true
  public renderer = new SelectionIndicatorRenderer()
}
