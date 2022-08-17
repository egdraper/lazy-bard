import { CanvasLayerExtension } from 'src/app/game/models/renderer';
import { SelectionIndicatorRenderer } from '../../renderers/selection-indicator.renderer';

export class SelectionIndicatorExtension extends CanvasLayerExtension {
  public renderer = new SelectionIndicatorRenderer()
  public gameMasterView: Boolean = false
  public gamePlayerView: Boolean = true
}
