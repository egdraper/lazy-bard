import { GSM } from '../../../../game-state-manager.service';
import { Cell } from '../../../../models/map';
import { MovableAssetEventHandler } from './movable-asset.event-handler';
import { MovableAssetAnimator } from './movable-asset.animator';
import { MovableAssetPainter } from './movable-asset.painter';
import { AddOnExtension } from 'src/app/game/models/extension.model';

export class MovableAssetExtension implements AddOnExtension{
  public id = "MovableAssetExtension"
  public painter = new MovableAssetPainter();

  init(): void {
    new MovableAssetEventHandler()
    new MovableAssetAnimator()
  }
}
