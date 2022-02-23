import { GSM } from '../../game-state-manager.service';
import { PlayableAsset } from './playable-character';

export class PlayableCharacterManager {
  public addPlayableCharacter(): void {
    GSM.KeyEventController.mouseDown.subscribe((event: MouseEvent) => {
      const cell = GSM.GridController.getGridCellByCoordinate(
        event.offsetX,
        event.offsetY
      );
      const playerAsset = new PlayableAsset();
      playerAsset.cell = cell;
      playerAsset.positionX = cell.posX;
      playerAsset.positionY = cell.posY;
      playerAsset.imageUrl = 'assets/images/character_001.png';
      GSM.AssetController.assets.push(playerAsset);
    });
  }
}
