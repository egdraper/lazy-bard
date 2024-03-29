import { AfterViewInit, Component, HostListener } from '@angular/core';
import { terrainCleanup } from '../../controllers/utils/terrain-cleanup';
import { drawableItems } from '../../db/drawable-items.db';
import { Running } from '../../extensions/asset/movement.ts/run.movement';
import { Sneaking } from '../../extensions/asset/movement.ts/sneak.movement';
import { Walking } from '../../extensions/asset/movement.ts/walking.movement';
import { GSM } from '../../game-state-manager.service';
import { Asset, GridAsset } from '../../models/asset.model';

@Component({
  selector: 'gm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements AfterViewInit {
  public selected = 'nothing';
  public mouseController;
  public assetController
  public settings

  constructor(public gameStateManager: GSM) {
    setTimeout(() => {
      this.mouseController = GSM.MouseController;
      this.assetController = GSM.AssetController
      this.settings = GSM.Settings
    }, 150);
  }

  public onChange(value): void {
    GSM.Settings.brushSize = value
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.gameStateManager.newGame('firstGame',30,30, 'forest');
      GSM.ActionController.generalActionFire.subscribe((action) => {
        this.selected = action.name;
      });
    });
  }

  @HostListener('document:keyup', ['$event'])
  public keyPress(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      GSM.ActionController.generalActionFire.next({
        name: '',
        data: null,
      });
    }
    if (event.code === 'Delete' || event.code === 'Backspace') {
      GSM.KeyController.deletePressed.next(event)
    }
    if (event.code === 'KeyQ') {
      GSM.ActionController.generalActionFire.next({
        name: 'addCharacter',
        data: null,
      });
    }
    if (event.code === 'KeyB') {
      GSM.ActionController.generalActionFire.next({
        name: 'generateBackground',
        data: null,
      });
    }
    if (event.code === 'KeyO') {
      GSM.ActionController.generalActionFire.next({
        name: 'addObject',
        data: null,
      });
    }
    if (event.code === 'KeyZ') {
      GSM.ActionController.generalActionFire.next({
        name: 'deleteTerrain',
        data: null,
      });
    }
    if (event.code === 'KeyT') {
      GSM.ActionController.generalActionFire.next({
        name: 'generateTerrain',
        data: {
          terrainId: 'Trees-GreenBase',
          backgroundId: 'greenGrass',
        },
      });
    }
    if (event.code === 'KeyE') {
      GSM.ActionController.generalActionFire.next({
        name: 'paintingTerrain',
        data: drawableItems.find((item) => item.id === 'StoneCliff-StoneBase3'),
      });
    }
    if (event.code === 'KeyF') {
      GSM.ActionController.generalActionFire.next({
        name: 'paintingTerrain',
        data: drawableItems.find((item) => item.id === 'Road'),
      });
    }
    if (event.code === 'KeyR') {
      GSM.ActionController.generalActionFire.next({
        name: 'paintingTerrain',
        data: drawableItems.find((item) => item.id === 'StoneCliff-StoneBase2'),
      });
    }
    if (event.code === 'KeyX') {
      GSM.ActionController.generalActionFire.next({
        name: 'selectTool',
        data: null,
      });
    }
    if (event.code === 'KeyP') {
      GSM.RotationController.rotateClockwise();
      terrainCleanup(undefined);
    }
    if (event.code === 'KeyG') {
      this.selected = 'starting Game';
      GSM.ActionController.generalActionFire.next({
        name: 'startGame',
        data: null,
      });

      GSM.RendererController.start();
      GSM.FrameController.start();
    }
    if (event.code === 'KeyH') {
      const asset = GSM.AssetController.getSelectedAssets()[0] as Asset;
      asset.hovering = true;
      GSM.AssetController.changeZAxis('up', asset);
    }
    if (event.code === 'KeyN') {
      const asset = GSM.AssetController.getSelectedAssets()[0] as Asset;
      const topAsset = GSM.AssetController.getTopAssetCoveringCell(
        asset.anchorCell
      );

      if (
        (!topAsset && asset.baseZIndex !== 0) ||
        (topAsset &&
          topAsset.baseZIndex + topAsset.attributes.size.z < asset.baseZIndex)
      ) {
        GSM.AssetController.changeZAxis('down', asset);
      } else {
        asset.hovering = false;
      }
    }
    if (event.code === 'KeyY') {
      const asset = GSM.AssetController.getSelectedAssets()[0];
      GSM.AssetController.changeZAxis('down', asset);
    }
    if (event.code === 'KeyS') {
      GSM.ActionController.generalActionFire.next({
        name: 'assetSelect',
        data: null,
      });
    }
    if (event.code === 'KeyA') {
      GSM.ActionController.generalActionFire.next({
        name: 'characterSelected',
        data: null,
      });
    }
    if (event.code === 'KeyL') {
      GSM.AssetController.selectedAssets.forEach((asset: Asset) => {
        asset.movement = new Running(asset)
      })
    }
    if (event.code === 'KeyK') {
      GSM.AssetController.selectedAssets.forEach((asset: Asset) => {
        asset.movement = new Sneaking(asset)
      })
    }
    if (event.code === 'KeyJ') {
      GSM.AssetController.selectedAssets.forEach((asset: Asset) => {
        asset.movement = new Walking(asset)
      })
    }
  }
}
