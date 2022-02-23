import { GSM } from '../../game-state-manager.service';
import { Cell } from '../../models/map';
import { PlayableAsset } from './playable-character';

export class PlayableCharacterManager {
  public selectedPlayableAssets: PlayableAsset[] = []
  public keysPressed: Set<string> = new Set()

  constructor() {
    GSM.AssetController.assetClicked.subscribe(this.onAssetClicked.bind(this))
    GSM.KeyEventController.cellClick.subscribe(this.onCellClicked.bind(this))
    GSM.KeyEventController.keyDown.subscribe(this.onKeyDown.bind(this))
    GSM.KeyEventController.keyUp.subscribe(this.onKeyUp.bind(this))
  }

  public onAssetClicked(asset: PlayableAsset) {
    asset.selected = !asset.selected
  }

  public onKeyDown(event: KeyboardEvent) {
    this.keysPressed.add(event.key)
  }

  public onKeyUp(event: KeyboardEvent) {
    this.keysPressed.delete(event.key)
  }

  public onCellClicked(cell: Cell): void {
    if(!GSM.AssetController.getAssetByCell(cell)) {
      if(this.keysPressed.has("Control")) {
        this.addPlayableCharacter()
      }      
      return
    }
    
    const selectedAssets = GSM.AssetController.getSelectedAssets()
    selectedAssets.forEach((asset: PlayableAsset) => {
      asset.startMovement(asset.cell, cell, GSM.AssetController.assets as PlayableAsset[]  )
    })
  }

  public addPlayableCharacter(): void {
    GSM.KeyEventController.mouseDown.subscribe((event: MouseEvent) => {
      const cell = GSM.GridController.getGridCellByCoordinate(
        event.offsetX,
        event.offsetY
      );
      const playerAsset = new PlayableAsset();
      playerAsset.cell = cell;
      playerAsset.positionX = cell.posX;
      playerAsset.positionY = cell.posY;
      playerAsset.imageUrl = 'assets/images/character_001.png';
      GSM.AssetController.assets.push(playerAsset);
    });
  }
}
