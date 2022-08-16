import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { SelectorRenderer } from './selector.renderer';

export class SelectorExtension extends CanvasLayerExtension {
  public renderer = new SelectorRenderer();
}
