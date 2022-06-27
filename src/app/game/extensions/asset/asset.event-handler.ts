import { Cell, RenderingLayers } from 'src/app/game/models/map';
import { assetType } from '../../db/asset-items';
import { GSM } from '../../game-state-manager.service';
import { Asset, GridAsset } from '../../models/asset.model';
import {
  AssetTile,
  SpriteAnimation
} from '../../models/sprite-tile.model';
import { Walking } from './movement.ts/walking.movement';

export class AssetEventHandler {
  public selectedPlayableAssets: Asset[] = [];

  constructor() {
    GSM.AssetController.assetClicked.subscribe(this.onAssetClicked.bind(this));
    GSM.MouseController.cellAtZIndexClicked.subscribe(
      this.onCellClicked.bind(this)
    );
  }

  public onAssetClicked(asset: GridAsset) {
    const character = asset;

    if (character.tile.layer !== RenderingLayers.AssetLayer) {
      return;
    }

    if (!GSM.KeyController.keysPressed.has('MetaLeft')) {
      GSM.AssetController.deselectAllAssets();
    }

    if(GSM.ActionController.generalActionFire.value.name === "addObject"){
      return
    }

    character.selected = !character.selected;
    GSM.ActionController.generalActionFire.next({
      name: 'characterSelected',
      data: character,
    });
  }

  public onCellClicked(event: { cell: Cell; zIndex: number }): void {
    if (GSM.ActionController.generalActionFire.value.name === 'addCharacter') {
      GSM.AssetController.deselectAllAssets();
      this.addPlayableCharacter(event.cell, event.zIndex);
      return;
    }

    if (
      GSM.ActionController.generalActionFire.value.name === 'characterSelected'
    ) {
      const selectedCharacter = GSM.AssetController.getSelectedAssets();
      selectedCharacter.forEach((asset: Asset) => {
        asset.movement.start(asset.blocks, event.cell, []);
      });
      return;
    }

    if (GSM.ActionController.generalActionFire.value.name === 'addObject') {
      this.addNonPlayableAsset(event.cell, event.zIndex);
      return;
    }
  }

  // MOCK This will be a database thing
  private addPlayableCharacter(cell: Cell, zIndex: number): void {
    // setup asset
    const playerAsset = new Asset(cell);
    playerAsset.tile = new AssetTile(
      RenderingLayers.AssetLayer,
      'assets/images/character_012.png',
      'standardCreature'
    );
    playerAsset.animation = new SpriteAnimation();
    playerAsset.movement = new Walking(playerAsset);
    playerAsset.animating = true;

    GSM.AssetController.addAsset(
      playerAsset,
      cell,
      zIndex,
      RenderingLayers.AssetLayer
    );
    GSM.ImageController.addImageBySrcUrl(playerAsset.tile.imageUrl);
  }

  // MOCK This will be a database thing
  private addNonPlayableAsset(cell: Cell, zIndex: number): void {
    // setup asset
    const objectAsset = new Asset(cell);
    objectAsset.tile = new AssetTile(
      RenderingLayers.AssetLayer,
      'assets/images/trees/tree1.png',
      'standardXLTree'
    );
    objectAsset.animation = new SpriteAnimation();

    GSM.AssetController.addAsset(
      objectAsset,
      cell,
      zIndex,
      RenderingLayers.AssetLayer
    );
    GSM.ImageController.addImageBySrcUrl(objectAsset.tile.imageUrl);
  }
}
