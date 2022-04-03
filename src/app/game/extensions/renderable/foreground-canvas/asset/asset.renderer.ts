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
      playableAsset.assetTile.assetDrawRules.xWalkPos[playableAsset.assetTile.animation.positionCounter],
      playableAsset.assetTile.assetDrawRules.yWalkPos[playableAsset.assetTile.animation.spriteYPosition],
      playableAsset.assetTile.assetDrawRules.size.x,
      playableAsset.assetTile.assetDrawRules.size.y,
      playableAsset.posX + playableAsset.assetTile.assetDrawRules.xPosOffset,
      playableAsset.posY + playableAsset.assetTile.assetDrawRules.yPosOffset + playableAsset.posZ,
      playableAsset.assetTile.assetDrawRules.drawSize.x,
      playableAsset.assetTile.assetDrawRules.drawSize.y
    );
  }
}
