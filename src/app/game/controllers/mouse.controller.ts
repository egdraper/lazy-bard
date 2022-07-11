import { Subject } from 'rxjs';
import { GSM } from '../game-state-manager.service';
import { Cell, MousePosition } from '../models/map';
import { AssetBlock, GridAsset } from '../models/asset.model';
import { getAllAssetsBeingHovered, getAllAssetsBlocksBeingHovered, getTopAssetBeingHovered, getTopAssetBlockBeingHovered } from './utils/selected-sprite-tile';


export class MouseController {
  // Events
  public cellClick = new Subject<Cell>();
  public cellDown = new Subject<Cell>();
  public cellUp = new Subject<Cell>();
  public cellHover = new Subject<Cell>();
  public assetClick = new Subject<GridAsset>();
  public assetDown = new Subject<GridAsset>();
  public assetUp = new Subject<GridAsset>()
  public assetHover = new Subject<GridAsset>();
  public assetBlockClick = new Subject<AssetBlock>();
  public assetBlockDown = new Subject<AssetBlock>();
  public assetBlockUp = new Subject<AssetBlock>()
  public assetBlockHover = new Subject<AssetBlock>();
  public zAxisHover = new Subject<number>();
  public zAxisDown = new Subject<number>();
  public zAxisUp = new Subject<number>();
  public zAxisClick = new Subject<number>();

  public mouseDown = new Subject();
  public mouseUp = new Subject();
  public mouseHover = new Subject();
  public mouseClick = new Subject();

  // Hover state
  public hoveringPosX: number = 0;
  public hoveringPosY: number = 0;
  public hoveringCellId: string = '';
  public hoveringCell: Cell = null;
  public hoveringGridAsset: GridAsset;
  public hoveringGridAssets: GridAsset[]
  public hoveringAssetBlock: AssetBlock
  public hoveringAssetBlocks: AssetBlock[];
  public hoveringCellAtZAxis: Cell;
  public hoveringZAxis: number = 0;
  public hoveringZAxisAtMouseDown: number = 0;

  constructor() {
    this.mouseHover.subscribe(this.onMouseHover.bind(this));
    this.mouseUp.subscribe(this.onMouseUp.bind(this));
    this.mouseClick.subscribe(this.onMouseClick.bind(this));
    this.mouseDown.subscribe(this.onMouseDown.bind(this));
  }

  private onMouseDown(): void {
    this.assetDown.next(this.hoveringGridAsset)
    this.assetBlockDown.next(this.hoveringAssetBlock)
    this.cellDown.next(this.hoveringCell)
    this.zAxisDown.next(this.hoveringAssetBlock ? this.hoveringAssetBlock.zIndex : 0)
  }

  private onMouseUp(): void {
    this.assetUp.next(this.hoveringGridAsset)
    this.assetBlockUp.next(this.hoveringAssetBlock)
    this.cellUp.next(this.hoveringCell)
    this.zAxisUp.next(this.hoveringAssetBlock ? this.hoveringAssetBlock.zIndex : 0)
  }

  private onMouseClick(): void {
    this.assetClick.next(this.hoveringGridAsset)
    this.assetBlockClick.next(this.hoveringAssetBlock)
    this.cellClick.next(this.hoveringCell)
    this.zAxisClick.next(this.hoveringAssetBlock ? this.hoveringAssetBlock.zIndex : 0)
  }

  private onMouseHover(event: MousePosition): void {
    const newHoveringCell = GSM.GridController.getCellByPosition(event.posX, event.posY)
    if(!newHoveringCell) { return }
    if(newHoveringCell.id !== this.hoveringCell?.id) {
      this.hoveringCell = newHoveringCell
      this.cellHover.next(this.hoveringCell)

      const gridAsset = getTopAssetBeingHovered(this.hoveringCell);
      const gridAssets = getAllAssetsBeingHovered(this.hoveringCell)
      const assetBlock = getTopAssetBlockBeingHovered(this.hoveringCell);
      const assetBlocks = getAllAssetsBlocksBeingHovered(this.hoveringCell)
  
      if(assetBlock) {
        this.hoveringZAxis = gridAsset ? gridAsset.baseZIndex : 0
        this.hoveringAssetBlocks = assetBlocks
        this.hoveringGridAsset = gridAsset
        this.hoveringGridAssets = gridAssets
        this.hoveringAssetBlock = assetBlock
        this.assetHover.next(gridAsset)
        this.assetBlockHover.next(assetBlock)
        this.zAxisDown.next(this.hoveringAssetBlock ? this.hoveringAssetBlock.zIndex : 0)
      } else {
        this.hoveringGridAsset = null
        this.hoveringAssetBlock = null
        this.hoveringAssetBlocks = []
        this.hoveringGridAssets = []
        this.hoveringZAxis = 0
        this.assetHover.next(null)
        this.assetBlockHover.next(null)
        this.zAxisDown.next(this.hoveringAssetBlock ? this.hoveringAssetBlock.zIndex : 0)
      }
    }
  }
}
