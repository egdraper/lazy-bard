
import { assetItems } from 'src/app/game/db/asset-items';
import { Asset } from 'src/app/game/models/asset.model';
import { AssetTile, SpriteAnimation } from 'src/app/game/models/sprite-tile.model';
import { GSM } from '../../../../game-state-manager.service';
import { Running } from './movement.ts/run.movement';
import { Skip } from './movement.ts/skip.movement';
import { Sneaking } from './movement.ts/sneak.movement';
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
    playerAsset.assetTile = new AssetTile()
    playerAsset.assetTile.assetDrawRules = assetItems.find(item => item.id === "standardSmallItem")
    playerAsset.assetTile.animation = new SpriteAnimation()
    playerAsset.movement = new Skip(playerAsset)
    playerAsset.cell = cell
    playerAsset.posX = cell.posX;
    playerAsset.posY = cell.posY;
    playerAsset.assetTile.imageUrl = 'assets/images/item_002.png';
    playerAsset.animating = true
    
    GSM.GameData.assets.push(playerAsset);
    GSM.ImageController.addImageBySrcUrl(playerAsset.assetTile.imageUrl)
  }
}
