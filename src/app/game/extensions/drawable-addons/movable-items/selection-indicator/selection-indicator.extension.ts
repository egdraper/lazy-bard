import { AddOnExtension } from 'src/app/game/models/extension.model';
import { SelectionIndicatorRenderer } from './selection-indicator.renderer';

export class SelectionIndicatorExtension implements AddOnExtension {
  public id = "SelectionIndicatorExtension"
  public renderer = new SelectionIndicatorRenderer()
}
