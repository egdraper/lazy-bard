import { GSM } from '../../game-state-manager.service';
import { SelectionIndicatorPainter } from './selection-indicator.painter';

export class SelectionIndicatorExtension {
  constructor() {
    GSM.PaintController.registerPainter(new SelectionIndicatorPainter());
  }
}
