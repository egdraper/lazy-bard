import { GSM } from '../../game-state-manager.service';
import { PlaceableAsset } from '../../models/asset.model';
import { Extension } from '../../models/extension.model';
import { RenderingLayers, Cell } from '../../models/map';
import { AssetTile } from '../../models/sprite-tile.model';
import { SpriteAnimation } from './animation/animation';
import { Walking } from './movement.ts/walking.movement';

export class AssetBrushExtension extends Extension {
  public gameMasterView: boolean = true
  public gamePlayerView: Boolean = false

  public override async init(): Promise<void> {
    GSM.MouseController.cellClick.subscribe(this.onCellClicked.bind(this));
  }

  public onCellClicked(): void {
    if (GSM.EventController.generalActionFire.value.name === 'characterSelected') {    
      GSM.AssetController.getSelectedAssets().forEach((asset: PlaceableAsset) => {
        asset.movement.start(asset.anchorCell, GSM.GridController.getCellAtZAxis(GSM.MouseController.hoveringCell, asset.baseZIndex), []);
      });
      return;
    }

    if (GSM.EventController.generalActionFire.value.name === 'addCharacter') {
      GSM.AssetController.deselectAllAssets();

      const a = GSM.AssetController.getTopAssetCoveringCell(GSM.MouseController.hoveringCell, [RenderingLayers.AssetLayer, RenderingLayers.ObjectLayer])
      if(a) {
        const zIndex = a.baseZIndex + a?.attributes.size.x
        this.addPlayableCharacter(a.anchorCell, zIndex);
      } else {
        this.addPlayableCharacter(GSM.MouseController.hoveringCell, 0);
      }
      return;
    }

    if (GSM.EventController.generalActionFire.value.name === 'addObject') {
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
    const playerAsset = new PlaceableAsset(cell, 'standardCreature');
    playerAsset.tile = new AssetTile(
      RenderingLayers.AssetLayer,
      'assets/images/character_012.png'
    );

    playerAsset.animation = new SpriteAnimation("standardCreature");
    playerAsset.movement = new Walking(playerAsset);
    playerAsset.animating = true;
    playerAsset.layer = RenderingLayers.AssetLayer

    GSM.AssetController.addAsset(playerAsset, cell, zIndex );
    GSM.ImageController.addImageBySrcUrl(playerAsset.tile.imageUrl);
  }

    // MOCK This will be a database thing
  private addNonPlayableAsset(cell: Cell, zIndex: number): void {
    GSM.RendererController.renderAsAssets()
    // setup asset
    const newObjectAsset = new PlaceableAsset(cell, "standardSmallItemNonObstacle");
    newObjectAsset.tile = new AssetTile(
      RenderingLayers.ObjectLayer,
      'assets/images/pots/pot3.png',
    );
  
    newObjectAsset.animation = new SpriteAnimation("noAnimation");
    newObjectAsset.layer = RenderingLayers.ObjectLayer
  
    GSM.AssetController.addAsset(newObjectAsset, cell, zIndex);
    GSM.ImageController.addImageBySrcUrl(newObjectAsset.tile.imageUrl);
 
    setTimeout(() => {
      GSM.RendererController.renderAsSingleImage()
    }, 60);
  }
}
