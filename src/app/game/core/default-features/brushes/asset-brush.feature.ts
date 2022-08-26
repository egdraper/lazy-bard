import { GSM } from '../../../game-state-manager.service';
import { PlaceableAsset } from '../../../models/asset.model';
import { Extension } from '../../../models/extension.model';
import { RenderingLayers, Cell } from '../../../models/map';
import { AssetTile } from '../../../models/sprite-tile.model';
import { AssetMovementAnimation } from '../animation/asset-movement-animation';
import { Walking } from '../movement/walking.movement';

export class AssetBrushFeature extends Extension {
  public gameMasterView: boolean = true
  public gamePlayerView: Boolean = false

  public override async init(): Promise<void> {
    GSM.MouseManager.cellClick.subscribe(this.onCellClicked.bind(this));
  }

  public onCellClicked(): void {
    if (GSM.EventManager.generalActionFire.value.name === 'characterSelected') {    
      GSM.AssetManager.getSelectedAssets().forEach((asset: PlaceableAsset) => {
        asset.movement.start(asset.anchorCell, GSM.GridManager.getCellAtZAxis(GSM.MouseManager.hoveringCell, asset.baseZIndex), []);
      });
      return;
    }

    if (GSM.EventManager.generalActionFire.value.name === 'addCharacter') {
      GSM.AssetManager.deselectAllAssets();

      const a = GSM.AssetManager.getTopAssetCoveringCell(GSM.MouseManager.hoveringCell, [RenderingLayers.AssetLayer, RenderingLayers.ObjectLayer])
      if(a) {
        const zIndex = a.baseZIndex + a?.attributes.size.x
        this.addPlayableCharacter(a.anchorCell, zIndex);
      } else {
        this.addPlayableCharacter(GSM.MouseManager.hoveringCell, 0);
      }
      return;
    }

    if (GSM.EventManager.generalActionFire.value.name === 'addObject') {
      if(GSM.MouseManager.hoveringGridAsset?.tile?.drawableTileId) {
        this.addNonPlayableAsset(GSM.MouseManager.hoveringCellAtZAxis, GSM.MouseManager.hoveringZAxis);
      } else {
        this.addNonPlayableAsset(GSM.MouseManager.hoveringCellAtZAxis, 0);
      }
      return;
    }
  }

  // MOCK This will be a database thing
  private addPlayableCharacter(cell: Cell, zIndex: number): void {
    // setup asset
    const playerAsset = new PlaceableAsset(cell, 'standardCreature');
    playerAsset.tile = new AssetTile(
      RenderingLayers.AssetLayer,
      'assets/images/character_012.png'
    );

    playerAsset.animation = new AssetMovementAnimation("standardCreature");
    playerAsset.movement = new Walking(playerAsset);
    playerAsset.animating = true;
    playerAsset.layer = RenderingLayers.AssetLayer

    GSM.AssetManager.addAsset(playerAsset, cell, zIndex );
    GSM.ImageManager.addImageBySrcUrl(playerAsset.tile.imageUrl);
  }

    // MOCK This will be a database thing
  private addNonPlayableAsset(cell: Cell, zIndex: number): void {
    GSM.RendererManager.renderAsAssets()
    // setup asset
    const newObjectAsset = new PlaceableAsset(cell, "standardSmallItem");
    newObjectAsset.tile = new AssetTile(
      RenderingLayers.ObjectLayer,
      'assets/images/pots/pot3.png',
    );
  
    newObjectAsset.animation = new AssetMovementAnimation("noAnimation");
    newObjectAsset.layer = RenderingLayers.ObjectLayer
  
    GSM.AssetManager.addAsset(newObjectAsset, cell, zIndex);
    GSM.ImageManager.addImageBySrcUrl(newObjectAsset.tile.imageUrl);
 
    setTimeout(() => {
      GSM.RendererManager.renderAsSingleImage()
    }, 60);
  }
}
