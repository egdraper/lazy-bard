import { Painter } from 'src/app/game/models/painter';
import { GSM } from '../../../../game-state-manager.service';
import { Cell } from '../../../../models/map';

import { MovableAsset } from './movable-asset';

export class MovableAssetPainter extends Painter {
  public paintOrder = 2

  public paint(cell: Cell): void {
    const playableAsset = GSM.AssetController.getAssetByCellId(cell.id) as MovableAsset;
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


    // const cellLayer = GSM.GridController.getLayeredCells(cell) as TerrainCell[]
    // this.ctx.globalAlpha = 0.2;
    // cellLayer.forEach((_cell, index) => {
   
    //   GSM.GridController.getAllNeighbors(_cell, GSM.LayerController.layerAddOns[index].layerName).forEach((_neighborCell: TerrainCell) => {
    //     GSM.GridController.getAllNeighbors(_neighborCell, GSM.LayerController.layerAddOns[index].layerName).forEach((neighborCell: TerrainCell) => {
    //     if(neighborCell.imageTile && neighborCell.imageTile.imageUrl) {
    //     this.ctx.drawImage(
    //       GSM.ImageController.getImage(neighborCell.imageTile.imageUrl),
    //       neighborCell.imageTile.spriteGridPosX * GSM.Settings.blockSize,
    //       neighborCell.imageTile.spriteGridPosY * GSM.Settings.blockSize,
    //       neighborCell.imageTile.tileWidth * GSM.Settings.blockSize,
    //       neighborCell.imageTile.tileHeight * GSM.Settings.blockSize,
    //       neighborCell.posX + neighborCell.imageTile.tileOffsetX,
    //       neighborCell.posY + neighborCell.imageTile.tileOffsetY,
    //       neighborCell.imageTile.tileWidth * (neighborCell.imageTile.sizeAdjustment || GSM.Settings.blockSize),
    //       neighborCell.imageTile.tileHeight * (neighborCell.imageTile.sizeAdjustment || GSM.Settings.blockSize)
    //     )   
    //     }     
    //   })
    // })
    
    // })
    // this.ctx.globalAlpha = 1
  }
}
