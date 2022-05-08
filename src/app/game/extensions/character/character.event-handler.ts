
import { assetItems } from 'src/app/game/db/asset-items';
import { Cell, Position, RenderingLayers } from 'src/app/game/models/map';
import { Asset, AssetTile, GridAsset, SpriteAnimation } from 'src/app/game/models/sprite-tile.model';
import { GSM } from '../../game-state-manager.service';
import { Running } from './movement.ts/run.movement';

export class PlayableAssetEventHandler {
  public selectedPlayableAssets: Asset[] = []

  constructor() {
    GSM.AssetController.assetClicked.subscribe(this.onAssetClicked.bind(this))
    GSM.MouseController.cellAtZIndexClicked.subscribe(this.onCellClicked.bind(this))
  }

  public onAssetClicked(asset: GridAsset) {
    const character = asset

    if(character.tile.layer !== RenderingLayers.CharacterLayer ) { return }

    if(!GSM.KeyController.keysPressed.has("MetaLeft")) {
      GSM.AssetController.deselectAllAssets()
    }

    character.selected = !character.selected
    GSM.ActionController.generalActionFire.next({
      name: "characterSelected",
      data: character
    })
  }

  public onCellClicked(event: {cell: Cell, zIndex: number}): void {
    if(GSM.ActionController.generalActionFire.value.name === "addCharacter") {
      GSM.AssetController.deselectAllAssets()
      this.addPlayableCharacter(event.cell, event.zIndex)
      return
    }

    if(GSM.ActionController.generalActionFire.value.name === "characterSelected") {
      const selectedCharacter = GSM.AssetController.getSelectedAssets()
      selectedCharacter.forEach((asset: Asset) => {
        asset.movement.start(asset.cell, event.cell, [])
      })
    }      
  }

  // MOCK This will be a database thing
  private addPlayableCharacter(cell: Cell, zIndex: number): void {
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
    
    GSM.AssetController.addAsset(playerAsset, cell, zIndex, RenderingLayers.CharacterLayer)
    GSM.ImageController.addImageBySrcUrl(playerAsset.tile.imageUrl)
  }
}
