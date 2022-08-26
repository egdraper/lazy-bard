import { AfterViewInit, Component, HostListener } from '@angular/core';
import { TerrainCleanup } from '../../core/utils/terrain-cleanup';
import { drawableItems } from '../../db/drawable-items.db';
import { Running } from '../../extension/movement.ts/run.movement';
import { Sneaking } from '../../extension/movement.ts/sneak.movement';
import { Walking } from '../../core/default-features/movement/walking.movement';
import { GSM } from '../../game-state-manager.service';
import { PlaceableAsset } from '../../models/asset.model';

@Component({
  selector: 'gm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements AfterViewInit {
  public selected = 'nothing';
  public mouseController;
  public assetController;
  public interactions = undefined
  public settings

  constructor(public gameStateManager: GSM) {
    setTimeout(() => {
      this.mouseController = GSM.MouseManager
      this.assetController = GSM.AssetManager
      this.settings = GSM.Settings
      GSM.EventManager.objectInteraction.subscribe(event => {
        this.interactions = event
      })
    }, 150);
  }

  public onChange(value): void {
    GSM.Settings.brushSize = value
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.gameStateManager.newGame('firstGame',30,30, 'forest');
      GSM.EventManager.generalActionFire.subscribe((action) => {
        this.selected = action.name;
      });
    });
  }

  @HostListener('document:keyup', ['$event'])
  public keyPress(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      GSM.EventManager.generalActionFire.next({
        name: '',
        data: null,
      });
    }
    if (event.code === 'Delete' || event.code === 'Backspace') {
      GSM.KeyManager.deletePressed.next(event)
    }
    if (event.code === 'KeyQ') {
      GSM.EventManager.generalActionFire.next({
        name: 'addCharacter',
        data: null,
      });
    }
    if (event.code === 'KeyB') {
      GSM.EventManager.generalActionFire.next({
        name: 'generateBackground',
        data: null,
      });
    }
    if (event.code === 'KeyO') {
      GSM.EventManager.generalActionFire.next({
        name: 'addObject',
        data: null,
      });
    }
    if (event.code === 'KeyZ') {
      GSM.EventManager.generalActionFire.next({
        name: 'deleteTerrain',
        data: null,
      });
    }
    if (event.code === 'KeyT') {
      GSM.EventManager.generalActionFire.next({
        name: 'generateTerrain',
        data: {
          terrainId: 'Trees-GreenBase',
          backgroundId: 'greenGrass',
        },
      });
    }
    if (event.code === 'KeyE') {
      GSM.EventManager.generalActionFire.next({
        name: 'paintingTerrain',
        data: drawableItems.find((item) => item.id === 'StoneCliff-StoneBase3'),
      });
    }
    if (event.code === 'KeyF') {
      GSM.EventManager.generalActionFire.next({
        name: 'paintingTerrain',
        data: drawableItems.find((item) => item.id === 'Road'),
      });
    }
    if (event.code === 'KeyR') {
      GSM.EventManager.generalActionFire.next({
        name: 'paintingTerrain',
        data: drawableItems.find((item) => item.id === 'StoneCliff-StoneBase2'),
      });
    }
    if (event.code === 'KeyX') {
      GSM.EventManager.generalActionFire.next({
        name: 'selectTool',
        data: null,
      });
    }
    if (event.code === 'KeyP') {
      GSM.RotationManager.rotateClockwise();
      TerrainCleanup.run(undefined);
    }
    if (event.code === 'KeyG') {
      this.selected = 'starting Game';
      GSM.EventManager.generalActionFire.next({
        name: 'startGame',
        data: null,
      });

      GSM.RendererManager.start();
      GSM.FrameManager.start();
    }
    if (event.code === 'KeyH') {
      const asset = GSM.AssetManager.getSelectedAssets()[0] as PlaceableAsset;
      asset.hovering = true;
      GSM.AssetManager.changeZAxis('up', asset);
    }
    if (event.code === 'KeyN') {
      const asset = GSM.AssetManager.getSelectedAssets()[0] as PlaceableAsset;
      const topAsset = GSM.AssetManager.getTopAssetCoveringCell(
        asset.anchorCell
      );

      if (
        (!topAsset && asset.baseZIndex !== 0) ||
        (topAsset &&
          topAsset.baseZIndex + topAsset.attributes.size.z < asset.baseZIndex)
      ) {
        GSM.AssetManager.changeZAxis('down', asset);
      } else {
        asset.hovering = false;
      }
    }
    if (event.code === 'KeyY') {
      const asset = GSM.AssetManager.getSelectedAssets()[0];
      GSM.AssetManager.changeZAxis('down', asset);
    }
    if (event.code === 'KeyS') {
      GSM.EventManager.generalActionFire.next({
        name: 'assetSelect',
        data: null,
      });
    }
    if (event.code === 'KeyA') {
      GSM.EventManager.generalActionFire.next({
        name: 'characterSelected',
        data: null,
      });
    }
    if (event.code === 'KeyL') {
      GSM.AssetManager.selectedAssets.forEach((asset: PlaceableAsset) => {
        asset.movement = new Running(asset)
      })
    }
    if (event.code === 'KeyK') {
      GSM.AssetManager.selectedAssets.forEach((asset: PlaceableAsset) => {
        asset.movement = new Sneaking(asset)
      })
    }
    if (event.code === 'KeyJ') {
      GSM.AssetManager.selectedAssets.forEach((asset: PlaceableAsset) => {
        asset.movement = new Walking(asset)
      })
    }
  }
}
