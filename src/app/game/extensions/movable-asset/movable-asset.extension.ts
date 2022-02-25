import { GSM } from '../../game-state-manager.service';
import { Cell } from '../../models/map';
import { MovableAssetManager } from './movable-asset-manager';
import { MovableAssetAnimator } from './movable-asset.animator';
import { MovableAssetPainter } from './movable-asset.painter';

export class MovableAssetExtension {
  private painter = new MovableAssetPainter();
  
  constructor() {
    new MovableAssetManager()
    new MovableAssetAnimator()
    GSM.PaintController.registerPainter(this.painter);
  }
}
