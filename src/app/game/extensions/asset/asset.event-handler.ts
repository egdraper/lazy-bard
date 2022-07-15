import { Cell, RenderingLayers } from 'src/app/game/models/map';
import { GSM } from '../../game-state-manager.service';
import { Asset, GridAsset } from '../../models/asset.model';
import { AssetTile, SpriteAnimation } from '../../models/sprite-tile.model';
import { Walking } from './movement.ts/walking.movement';

export class AssetEventHandler {
  public selectedPlayableAssets: Asset[] = [];

  constructor() {
    GSM.MouseController.assetClick.subscribe(this.onAssetClicked.bind(this));
    GSM.MouseController.cellClick.subscribe(this.onCellClicked.bind(this));
  }

  public onAssetClicked(asset: GridAsset) {
    if(!asset) { return }

    if (asset.tile.layer !== RenderingLayers.AssetLayer) {
      return;
    }

    if (!GSM.KeyController.keysPressed.has('MetaLeft')) {
      GSM.AssetController.deselectAllAssets();
    }

    if(GSM.ActionController.generalActionFire.value.name === "addObject"){
      return
    }

    GSM.AssetController.toggleAssetSelection(asset)
    GSM.ActionController.generalActionFire.next({
      name: 'characterSelected',
      data: asset,
    });
  }

  public onCellClicked(): void {
    if (GSM.ActionController.generalActionFire.value.name === 'addCharacter') {
      GSM.AssetController.deselectAllAssets();
      this.addPlayableCharacter(GSM.MouseController.hoveringCell, GSM.MouseController.hoveringZAxis);
      return;
    }

    if (
      GSM.ActionController.generalActionFire.value.name === 'characterSelected'
    ) {
     
      GSM.AssetController.getSelectedAssets().forEach((asset: Asset) => {
        asset.movement.start(asset.anchorCell, GSM.MouseController.hoveringCellAtZAxis, []);
      });
      return;
    }

    if (GSM.ActionController.generalActionFire.value.name === 'addObject') {
      this.addNonPlayableAsset(GSM.MouseController.hoveringCell, GSM.MouseController.hoveringZAxis);
      return;
    }
  }

  // MOCK This will be a database thing
  private addPlayableCharacter(cell: Cell, zIndex: number): void {
    // setup asset
    const playerAsset = new Asset(cell, 'standardCreature');
    playerAsset.tile = new AssetTile(
      RenderingLayers.AssetLayer,
      'assets/images/character_012.png',
      'standardCreature'
    );
    playerAsset.animation = new SpriteAnimation();
    playerAsset.movement = new Walking(playerAsset);
    playerAsset.animating = true;
    playerAsset.layer = RenderingLayers.AssetLayer

    GSM.AssetController.addAsset(
      playerAsset,
      cell,
      zIndex,
    );
    GSM.ImageController.addImageBySrcUrl(playerAsset.tile.imageUrl);
  }

  // MOCK This will be a database thing
  private addNonPlayableAsset(cell: Cell, zIndex: number): void {
    // setup asset
    const objectAsset = new Asset(cell, 'standardXLTree');
    objectAsset.tile = new AssetTile(
      RenderingLayers.AssetLayer,
      'assets/images/trees/tree1.png',
      'standardXLTree'
    );

    objectAsset.animation = new SpriteAnimation();
    objectAsset.layer = RenderingLayers.AssetLayer

    GSM.AssetController.addAsset(
      objectAsset,
      cell,
      zIndex
    );
    GSM.ImageController.addImageBySrcUrl(objectAsset.tile.imageUrl);
  }
}
