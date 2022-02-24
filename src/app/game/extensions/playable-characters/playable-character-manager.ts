import { GSM } from '../../game-state-manager.service';
import { Cell } from '../../models/map';
import { PlayableAsset } from './playable-character';

export class PlayableCharacterManager {
  public selectedPlayableAssets: PlayableAsset[] = []

  constructor() {
    GSM.AssetController.assetClicked.subscribe(this.onAssetClicked.bind(this))
    GSM.KeyEventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this))
  }

  public onAssetClicked(asset: PlayableAsset) {
    asset.selected = !asset.selected
  }

  public onEmptyCellClicked(cell: Cell): void {
    if(GSM.KeyEventController.keysPressed.has("AltLeft")) {
      this.addPlayableCharacter(cell)
      return
    }
    
    const selectedAssets = GSM.AssetController.getSelectedAssets()
    if(selectedAssets) {
      selectedAssets.forEach((asset: PlayableAsset) => {
        asset.startMovement(asset.cell, cell, GSM.AssetController.assets as PlayableAsset[]  )
      })
    }
  }

  public addPlayableCharacter(cell: Cell): void {
      const playerAsset = new PlayableAsset();
      playerAsset.cell = cell;
      playerAsset.positionX = cell.posX;
      playerAsset.positionY = cell.posY;
      playerAsset.imageUrl = 'assets/images/character_001.png';
      GSM.AssetController.assets.push(playerAsset);

  }
}
