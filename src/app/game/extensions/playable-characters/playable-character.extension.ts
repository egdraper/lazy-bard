import { GSM } from '../../game-state-manager.service';
import { PlayableCharacterManager } from './playable-character-manager';
import { PlayableCharacterAnimator } from './playable-character.animator';
import { PlayerCharacterPainter } from './playable-character.painter';

export class PlayerCharacterExtension {
  private painter = new PlayerCharacterPainter();
  private playableCharacterManager = new PlayableCharacterManager()
  private playableCharacterAnimator = new PlayableCharacterAnimator()

  constructor() {
    this.playableCharacterAnimator.runCharacterAnimation()
    this.playableCharacterManager.addPlayableCharacter()
    GSM.PaintController.registerPainter(this.painter);
  }
}
