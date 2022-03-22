import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { ObjectSelectionIndicatorRenderer } from './objcet-selection-indicator.renderer';
import { ObjectSelectionEventHandler } from './object-selection.event-handler';

export class ObjectSelectionIndicatorExtension extends CanvasLayerExtension {
  public override excludeFromSingleImagePainting: boolean = true
  public renderer = new ObjectSelectionIndicatorRenderer()
  public eventHandler = new ObjectSelectionEventHandler()
}
