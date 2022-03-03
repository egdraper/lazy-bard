import { GSM } from '../../../../game-state-manager.service';
import { Cell, ElevationLayers } from '../../../../models/map';
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

  public onEmptyCellClicked(cellId: string): void {
    if(GSM.EventController.generalActionFire.value.name === "addCharacter") {
      this.addPlayableCharacter(cellId)
    }

    if(GSM.EventController.generalActionFire.value.name === "characterSelected") {
      const selectedAssets = GSM.AssetController.getSelectedAssets()
      const cell = GSM.GridController.getCellAtLayer(cellId, ElevationLayers.FloorObjectLayer)
      selectedAssets.forEach((asset: MovableAsset) => {
        asset.startMovement(asset.cell, cell, GSM.AssetController.assets as MovableAsset[]  )
      })
    }      
  }

  private addPlayableCharacter(cellId: string): void {
    const playerAsset = new MovableAsset();
    const cell = GSM.GridController.getCellAtLayer(cellId, ElevationLayers.FloorObjectLayer)
    playerAsset.cell = cell
    playerAsset.positionX = cell.posX;
    playerAsset.positionY = cell.posY;
    playerAsset.imageUrl = 'assets/images/character_001.png';
    GSM.AssetController.assets.push(playerAsset);
  }
}
