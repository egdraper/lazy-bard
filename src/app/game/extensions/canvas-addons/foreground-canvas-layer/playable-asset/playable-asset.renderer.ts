import { Renderer } from '../../../../models/renderer';
import { GSM } from '../../../../game-state-manager.service';
import { Cell, ElevationLayers } from '../../../../models/map';

import { PlayableAsset } from './playable-asset.model';

export class PlayableAssetRenderer extends Renderer {
  public elevationLayer: ElevationLayers = ElevationLayers.CharacterLayer
  public override excludeFromSingleImagePainting: boolean = true

  public onDraw(cell: Cell): void {
    const playableAsset = GSM.AssetController.getAssetByCellId(cell.id) as PlayableAsset;
    
    if (!playableAsset) { return; }

    this.ctx.drawImage(
      GSM.ImageController.getImage(playableAsset.imageUrl),
      playableAsset.frameXPosition[playableAsset.frameCounter],
      playableAsset.frameYPosition,
      25,
      36,
      playableAsset.positionX - 8,
      playableAsset.positionY - 58,
      50,
      80
    );
  }
}