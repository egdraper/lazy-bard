import { GSM } from '../../game-state-manager.service';
import { Cell } from '../../models/map';
import { PlayableCharacterManager } from './playable-character-manager';
import { PlayableCharacterAnimator } from './playable-character.animator';
import { PlayerCharacterPainter } from './playable-character.painter';

export class PlayerCharacterExtension {
  private painter = new PlayerCharacterPainter();
  
  constructor() {
    new PlayableCharacterManager()
    new PlayableCharacterAnimator()
    GSM.PaintController.registerPainter(this.painter);
  }

}
