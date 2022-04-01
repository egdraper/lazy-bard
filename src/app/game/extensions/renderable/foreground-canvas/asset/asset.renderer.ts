import { Renderer, RenderOptionsEvent } from '../../../../models/renderer';
import { GSM } from '../../../../game-state-manager.service';
import { RenderingLayers } from '../../../../models/map';


export class PlayableAssetRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.CharacterLayer
  public override excludeFromSingleImagePainting: boolean = true

  public onDraw(event: RenderOptionsEvent): void {
    const playableAsset = GSM.AssetController.getAssetByCellId(event.cell.id)
    
    if (!playableAsset) { return; }

    this.ctx.drawImage(
      GSM.ImageController.getImage(playableAsset.assetTile.imageUrl),
      playableAsset.assetTile.animation.spriteXPosition[playableAsset.assetTile.animation.positionCounter],
      playableAsset.assetTile.animation.spriteYPosition,
      25,
      36,
      playableAsset.posX - 8,
      playableAsset.posY - 56 + playableAsset.posZ,
      50,
      80
    );
  }
}
