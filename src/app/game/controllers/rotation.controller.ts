import { identifierName } from '@angular/compiler';
import { GSM } from '../game-state-manager.service';
import { Asset } from '../models/sprite-tile.model';

export class RotationController {
  public currentRotation = 0;

  public rotateClockwise(): void {
    const map = GSM.GameData.map;

    if (this.currentRotation === 0) {
      let newX = map.size.x - 1;
      let newY = 0;

      for (let y = 0; y < map.size.y; y++) {
        newY = 0;
        for (let x = 0; x < map.size.x; x++) {
          const cell = GSM.GridController.getCellById(`x${x}:y${y}`);          
            cell.location.x = newX;
            cell.location.y = newY;
            cell.position.x = newX * GSM.Settings.blockSize;
            cell.position.y = newY * GSM.Settings.blockSize;

            const assets = GSM.GridAssetController.getAssetsByCell(cell)
            assets.forEach((asset: Asset) => {
              if(asset.movementOffset) {
                asset.movementOffset.x = cell.position.x
                asset.movementOffset.y = cell.position.y
                asset.movement.resetTrackingToCell(cell)
              }
            })
          newY++;
        }
        newX--;
      }
    }


    if (this.currentRotation === 1) {
      let newX = map.size.x - 1;
      let newY = map.size.y - 1;

      for (let y = 0; y < map.size.y; y++) {
        newY = map.size.y - 1;
        for (let x = 0; x < map.size.x; x++) {

          const cell = GSM.GridController.getCellById(`x${x}:y${y}`);

          cell.location.x = newY;
          cell.location.y = newX;
          cell.position.x = newY * GSM.Settings.blockSize;
          cell.position.y = newX * GSM.Settings.blockSize;
         
          const assets = GSM.GridAssetController.getAssetsByCell(cell)
          assets.forEach((asset: Asset) => {
            if(asset.movementOffset) {
              asset.movementOffset.x = cell.position.x
              asset.movementOffset.y = cell.position.y
              asset.movement.resetTrackingToCell(cell, 0)
            }
          })

          newY--;
        }
        newX--;
      }
    }

    if (this.currentRotation === 2) {
      let newX = 0;
      let newY = map.size.y - 1;

      for (let y = 0; y < map.size.y; y++) {
        newY = map.size.y - 1;
        for (let x = 0; x < map.size.x; x++) {

          const cell = GSM.GridController.getCellById(`x${x}:y${y}`);

          cell.location.x = newX;
          cell.location.y = newY;
          cell.position.x = newX * GSM.Settings.blockSize;
          cell.position.y = newY * GSM.Settings.blockSize;

          const assets = GSM.GridAssetController.getAssetsByCell(cell)
          assets.forEach((asset: Asset) => {
            if(asset.movementOffset) {
              asset.movementOffset.x = cell.position.x
              asset.movementOffset.y = cell.position.y
              asset.movement.resetTrackingToCell(cell)
            }

          })

          newY--;
        }
        newX++;
      }
    }


    if (this.currentRotation === 3) {
      let newX = 0;
      let newY = 0;

      for (let y = 0; y < map.size.y; y++) {
        newY = 0
        for (let x = 0; x < map.size.x; x++) {
          const cell = GSM.GridController.getCellById(`x${x}:y${y}`);

          cell.location.x = newY;
          cell.location.y = newX;
          cell.position.x = newY * GSM.Settings.blockSize;
          cell.position.y = newX * GSM.Settings.blockSize;

          const assets = GSM.GridAssetController.getAssetsByCell(cell)
          assets.forEach((asset: Asset) => {
            if(asset.movementOffset) {
              asset.movementOffset.x = cell.position.x
              asset.movementOffset.y = cell.position.y
              asset.movement.resetTrackingToCell(cell)
            }
          })

          newY++;
        }
        newX++;
      }
    }

    if (this.currentRotation === 3) {
      this.currentRotation = 0;
    } else {
      this.currentRotation++;
    }

    GSM.GridAssetController.refreshAssetIterator()
  }

  public rotateCounterClockwise(): void {}
}
