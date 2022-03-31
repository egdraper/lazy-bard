import { Asset, SpriteAnimation } from 'src/app/game/models/asset.model';
import { SpriteTile } from 'src/app/game/models/map';
import { GSM } from '../../../../game-state-manager.service';
import { Jump } from './movement.ts/jump.movement';
import { Running } from './movement.ts/run.movement';
import { Skip } from './movement.ts/skip.movement';
import { Walking } from './movement.ts/walking.movement';

export class PlayableAssetEventHandler {
  public selectedPlayableAssets: Asset[] = []

  constructor() {
    GSM.AssetController.assetClicked.subscribe(this.onAssetClicked.bind(this))
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this))
  }

  public onAssetClicked(asset: Asset) {
    if(!GSM.EventController.keysPressed.has("MetaLeft")) {
      GSM.AssetController.deselectAllAssets()
    }

    asset.selected = !asset.selected
    GSM.EventController.generalActionFire.next({
      name: "characterSelected",
      data: asset
    })
  }

  public onEmptyCellClicked(cellId: string): void {
    if(GSM.EventController.generalActionFire.value.name === "addCharacter") {
      this.addPlayableCharacter(cellId)
    }

    if(GSM.EventController.generalActionFire.value.name === "characterSelected") {
      const selectedAssets = GSM.AssetController.getSelectedAssets()
      const cell = GSM.GridController.getCellAtLayer(cellId, GSM.GameData.map.currentElevationLayerIndex)
      selectedAssets.forEach((asset: Asset) => {
        asset.movement.start(asset.cell, cell, GSM.GameData.assets as Asset[]  )
      })
    }      
  }

  // MOCK This will be a database thing
  private addPlayableCharacter(cellId: string): void {
    const cell = GSM.GridController.getCellAtLayer(cellId, GSM.GameData.map.currentElevationLayerIndex)
    
    // setup asset
    const playerAsset = new Asset();
    playerAsset.spriteTile = new SpriteTile()
    playerAsset.spriteTile.animation = new SpriteAnimation()
    playerAsset.movement = new Skip(playerAsset)
    playerAsset.cell = cell
    playerAsset.posX = cell.posX;
    playerAsset.posY = cell.posY;
    playerAsset.spriteTile.imageUrl = 'assets/images/character_001.png';
    
    GSM.GameData.assets.push(playerAsset);
    GSM.ImageController.addImageBySrcUrl(playerAsset.spriteTile.imageUrl)
  }
}
