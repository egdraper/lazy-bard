import { GSM } from '../../../../game-state-manager.service';
import { Cell } from '../../../../models/map';
import { MovableAssetManager } from './movable-asset.event-handler';
import { MovableAssetAnimator } from './movable-asset.animator';
import { MovableAssetPainter } from './movable-asset.painter';

export class MovableAssetExtension {
  public painter = new MovableAssetPainter();
  
  constructor() {
    new MovableAssetManager()
    new MovableAssetAnimator()
  }
}
