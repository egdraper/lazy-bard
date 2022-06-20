import { assetType } from 'src/app/game/db/asset-items';
import { Cell, RenderingLayers } from 'src/app/game/models/map';
import { Asset, GridAsset } from '../../models/asset.model';
import { GSM } from '../../game-state-manager.service';
import { Running } from './movement.ts/run.movement';
import {
  MotionObjectTile,
  ObjectTile,
  SpriteAnimation,
} from '../../models/sprite-tile.model';
import { Walking } from './movement.ts/walking.movement';
import { of } from 'rxjs';

export class PlayableAssetEventHandler {
  public selectedPlayableAssets: Asset[] = [];

  constructor() {
    GSM.AssetController.assetClicked.subscribe(this.onAssetClicked.bind(this));
    GSM.MouseController.cellAtZIndexClicked.subscribe(
      this.onCellClicked.bind(this)
    );
  }

  public onAssetClicked(asset: GridAsset) {
    const character = asset;

    if (character.tile.layer !== RenderingLayers.CharacterLayer) {
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
        asset.movement.start(asset.cell, event.cell, []);
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
    playerAsset.tile = new MotionObjectTile(
      RenderingLayers.CharacterLayer,
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
      RenderingLayers.CharacterLayer
    );
    GSM.ImageController.addImageBySrcUrl(playerAsset.tile.imageUrl);
  }

  // MOCK This will be a database thing
  private addNonPlayableAsset(cell: Cell, zIndex: number): void {
    // setup asset
    const objectAsset = new Asset(cell);
    objectAsset.tile = new ObjectTile(
      RenderingLayers.ObjectLayer,
      'assets/images/pots/pot2.png'
    );

    GSM.AssetController.addAsset(
      objectAsset,
      cell,
      zIndex,
      RenderingLayers.CharacterLayer
    );
    GSM.ImageController.addImageBySrcUrl(objectAsset.tile.imageUrl);
  }
}
