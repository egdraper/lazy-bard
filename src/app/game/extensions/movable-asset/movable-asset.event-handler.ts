import { GSM } from '../../game-state-manager.service';
import { Cell } from '../../models/map';
import { MovableAsset } from './movable-asset';

export class MovableAssetManager {
  public selectedPlayableAssets: MovableAsset[] = []

  constructor() {
    GSM.AssetController.assetClicked.subscribe(this.onAssetClicked.bind(this))
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this))
  }

  public onAssetClicked(asset: MovableAsset) {
    console.log(GSM.EventController.keysPressed)
    if(!GSM.EventController.keysPressed.has("MetaLeft")) {
      GSM.AssetController.deselectAllAssets()
    }

    asset.selected = !asset.selected
    GSM.EventController.generalActionFire.next({
      name: "characterSelected",
      data: null
    })
  }

  public onEmptyCellClicked(cell: Cell): void {
    if(GSM.EventController.generalActionFire.value.name === "addCharacter") {
      this.addPlayableCharacter(cell)
    }

    if(GSM.EventController.generalActionFire.value.name === "characterSelected") {
      const selectedAssets = GSM.AssetController.getSelectedAssets()
      selectedAssets.forEach((asset: MovableAsset) => {
        asset.startMovement(asset.cell, cell, GSM.AssetController.assets as MovableAsset[]  )
      })
    }      
  }

  private addPlayableCharacter(cell: Cell): void {
    const playerAsset = new MovableAsset();
    playerAsset.cell = cell;
    playerAsset.positionX = cell.posX;
    playerAsset.positionY = cell.posY;
    playerAsset.imageUrl = 'assets/images/character_001.png';
    GSM.AssetController.assets.push(playerAsset);
  }
}
