import { GSM } from '../../game-state-manager.service';
import { Cell } from '../../models/map';
import { MovableAsset } from './movable-asset';

export class MovableAssetManager {
  public selectedPlayableAssets: MovableAsset[] = []

  constructor() {
    GSM.AssetController.assetClicked.subscribe(this.onAssetClicked.bind(this))
    GSM.KeyEventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this))
  }

  public onAssetClicked(asset: MovableAsset) {
    asset.selected = !asset.selected
    GSM.editorController.selectedAction.next({
      name: "characterSelected",
      data: null
    })
  }

  public onEmptyCellClicked(cell: Cell): void {
    if(GSM.editorController.selectedAction.value.name === "addCharacter") {
      this.addPlayableCharacter(cell)
    }

    if(GSM.editorController.selectedAction.value.name === "characterSelected") {
      const selectedAssets = GSM.AssetController.getSelectedAssets()
      selectedAssets.forEach((asset: MovableAsset) => {
        asset.startMovement(asset.cell, cell, GSM.AssetController.assets as MovableAsset[]  )
      })
    }      
  }

  public addPlayableCharacter(cell: Cell): void {
    const playerAsset = new MovableAsset();
    playerAsset.cell = cell;
    playerAsset.positionX = cell.posX;
    playerAsset.positionY = cell.posY;
    playerAsset.imageUrl = 'assets/images/character_001.png';
    GSM.AssetController.assets.push(playerAsset);
  }
}
