import { Asset } from 'src/app/game/models/sprite-tile.model';
import { GSM } from '../../../../game-state-manager.service';
import { RenderingLayers } from '../../../../models/map';
import { Renderer } from '../../../../models/renderer';


export class PlayableAssetRenderer implements Renderer {
  public ctx: CanvasRenderingContext2D = GSM.CanvasController.foregroundCTX
  public renderingLayer: RenderingLayers = RenderingLayers.CharacterLayer

  public onDraw(asset: Asset): void {
    this.ctx.fillStyle = '#424247';
    this.ctx.beginPath();
    this.ctx.ellipse(
      asset.movementOffset.x + GSM.Settings.blockSize / 2,
      asset.movementOffset.y + GSM.Settings.blockSize / 2,
       8, 
       4, 
       0, 
       0, 
       Math.PI * 2
       );   
    this.ctx.fill();
    
    this.ctx.drawImage(
      GSM.ImageController.getImage(asset.tile.imageUrl),
      asset.tile.assetDrawRules.xWalkPos[asset.tile.animation.positionCounter],
      asset.tile.assetDrawRules.yWalkPos[asset.tile.animation.spriteYPosition],
      asset.tile.assetDrawRules.size.x,
      asset.tile.assetDrawRules.size.y,
      asset.movementOffset.x + asset.tile.assetDrawRules.xPosOffset,
      asset.movementOffset.y + asset.tile.assetDrawRules.yPosOffset + asset.movementOffset.z,
      asset.tile.assetDrawRules.drawSize.x,
      asset.tile.assetDrawRules.drawSize.y
    );

  }
}
