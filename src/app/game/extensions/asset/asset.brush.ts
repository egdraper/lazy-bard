import { Cell, RenderingLayers } from 'src/app/game/models/map';
import { GSM } from '../../game-state-manager.service';
import { Asset } from '../../models/asset.model';
import { AssetTile, SpriteAnimation } from '../../models/sprite-tile.model';
import { Walking } from './movement.ts/walking.movement';

export class AssetBrush {
  public selectedPlayableAssets: Asset[] = [];

  constructor() {
    GSM.MouseController.cellClick.subscribe(this.onCellClicked.bind(this));
  }

  public getCellAtSelectedAssetsZIndex(zIndex: number, cellClicked: Cell) {
    return GSM.GridController.getCellByLocation(cellClicked.location.x, cellClicked.location.y + zIndex)
  }

  public onCellClicked(): void {
    if (GSM.ActionController.generalActionFire.value.name === 'characterSelected') {    
      GSM.AssetController.getSelectedAssets().forEach((asset: Asset) => {
        asset.movement.start(asset.anchorCell, this.getCellAtSelectedAssetsZIndex(asset.baseZIndex, GSM.MouseController.hoveringCell), []);
      });
      return;
    }

    if (GSM.ActionController.generalActionFire.value.name === 'addCharacter') {
      GSM.AssetController.deselectAllAssets();
      if(GSM.MouseController.hoveringGridAsset?.tile?.drawableTileId) {
        this.addPlayableCharacter(GSM.MouseController.hoveringCellAtZAxis, GSM.MouseController.hoveringZAxis);
      } else {
        this.addPlayableCharacter(GSM.MouseController.hoveringCellAtZAxis, 0);
      }
      return;
    }

    if (GSM.ActionController.generalActionFire.value.name === 'addObject') {
      if(GSM.MouseController.hoveringGridAsset?.tile?.drawableTileId) {
        this.addNonPlayableAsset(GSM.MouseController.hoveringCellAtZAxis, GSM.MouseController.hoveringZAxis);
      } else {
        this.addNonPlayableAsset(GSM.MouseController.hoveringCellAtZAxis, 0);
      }
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

    GSM.AssetController.addAsset(playerAsset, cell, zIndex );
    GSM.ImageController.addImageBySrcUrl(playerAsset.tile.imageUrl);
  }

    // MOCK This will be a database thing
    private addNonPlayableAsset(cell: Cell, zIndex: number): void {
      // setup asset
      const objectAsset = new Asset(cell, 'hugeTree');
      objectAsset.tile = new AssetTile(
        RenderingLayers.ObjectLayer,
        'assets/images/sprite_tree.png',
        'hugeTree'
      );
  
      objectAsset.animation = new SpriteAnimation();
      objectAsset.layer = RenderingLayers.ObjectLayer
  
      GSM.AssetController.addAsset(
        objectAsset,
        cell,
        zIndex
      );
      GSM.ImageController.addImageBySrcUrl(objectAsset.tile.imageUrl);
    }
}
