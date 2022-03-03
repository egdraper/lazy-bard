import { Extension } from 'src/app/game/models/extension.model';
import { SelectionIndicatorPainter } from './selection-indicator.painter';

export class SelectionIndicatorExtension implements Extension {
  public painter = new SelectionIndicatorPainter()
}
