
import { assetItems } from 'src/app/game/db/asset-items';
import { Cell, Position, RenderingLayers } from 'src/app/game/models/map';
import { Asset, AssetTile, GridAsset, SpriteAnimation } from 'src/app/game/models/sprite-tile.model';
import { GSM } from '../../game-state-manager.service';
import { Running } from './movement.ts/run.movement';

export class PlayableAssetEventHandler {
  public selectedPlayableAssets: Asset[] = []

  constructor() {
    GSM.GridAssetController.assetClicked.subscribe(this.onAssetClicked.bind(this))
    GSM.EventController.emptyCellClicked.subscribe(this.onEmptyCellClicked.bind(this))
  }

  public onAssetClicked(asset: GridAsset[]) {
    const character = asset.find(asset => asset.tile.layer === RenderingLayers.CharacterLayer)

    if(!character) { return }

    if(!GSM.EventController.keysPressed.has("MetaLeft")) {
      GSM.GridAssetController.deselectAllAssets()
    }

    character.selected = !character.selected
    GSM.EventController.generalActionFire.next({
      name: "characterSelected",
      data: character
    })
  }

  public onEmptyCellClicked(cell: Cell): void {
    if(GSM.EventController.generalActionFire.value.name === "addCharacter") {
      this.addPlayableCharacter(cell)
      return
    }

    if(GSM.EventController.generalActionFire.value.name === "characterSelected") {
      const selectedAssets = GSM.GridAssetController.getSelectedAssets()
      selectedAssets.forEach((asset: Asset) => {
        asset.movement.start(asset.cell, cell, [])
      })
    }      
  }

  // MOCK This will be a database thing
  private addPlayableCharacter(cell: Cell): void {
    // setup asset
    const playerAsset = new Asset();
    playerAsset.tile = new AssetTile(RenderingLayers.CharacterLayer)
    // playerAsset.tile.assetDrawRules = assetItems.find(item => item.id === "standardSmallItem")
    playerAsset.tile.assetDrawRules = assetItems.find(item => item.id === "standardCreature")
    playerAsset.tile.animation = new SpriteAnimation()
    // playerAsset.movement = new Skip(playerAsset)
    playerAsset.movement = new Running(playerAsset)
    playerAsset.cell = cell
    playerAsset.movementOffset = new Position(cell.position.x, cell.position.y, 0)
    // playerAsset.tile.imageUrl = 'assets/images/item_002.png';
    playerAsset.tile.imageUrl = 'assets/images/character_012.png';
    playerAsset.animating = true
    
    GSM.GridAssetController.addAsset(playerAsset, cell, 0, RenderingLayers.CharacterLayer)
    GSM.ImageController.addImageBySrcUrl(playerAsset.tile.imageUrl)
  }
}
