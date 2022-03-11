import { AddOnExtension } from 'src/app/game/models/extension.model';
import { SelectionIndicatorPainter } from './selection-indicator.painter';

export class SelectionIndicatorExtension implements AddOnExtension {
  public id = "SelectionIndicatorExtension"
  public painter = new SelectionIndicatorPainter()
}
