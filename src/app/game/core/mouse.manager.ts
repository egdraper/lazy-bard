import { Subject } from 'rxjs';
import { GSM } from '../game-state-manager.service';
import { Cell, MousePosition } from '../models/map';
import { AssetBlock, Asset } from '../models/asset.model';

export class MouseManager {
  // Events
  public cellUp = new Subject<Cell>();
  public cellClick = new Subject<Cell>();
  public cellDown = new Subject<Cell>();
  public cellHover = new Subject<Cell>();
  public assetClick = new Subject<Asset>();
  public assetDown = new Subject<Asset>();
  public assetUp = new Subject<Asset>()
  public assetHover = new Subject<Asset>();
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
  public hoveringGridAsset: Asset;
  public hoveringGridAssets: Asset[]
  public hoveringAssetBlock: AssetBlock
  public hoveringAssetBlocks: AssetBlock[];
  public hoveringAssetBlockFront: AssetBlock
  public hoveringCellAtZAxis: Cell;
  public hoveringZAxis: number = 0;
  public hoveringZAxisAtMouseDown: number = 0;
  public hoveringCellAtZAxisOnMouseDown: Cell;

  constructor() {
    this.mouseHover.subscribe(this.onMouseHover.bind(this));
    this.mouseUp.subscribe(this.onMouseUp.bind(this));
    this.mouseClick.subscribe(this.onMouseClick.bind(this));
    this.mouseDown.subscribe(this.onMouseDown.bind(this));
  }

  private onMouseDown(): void {
    this.hoveringZAxisAtMouseDown = this.hoveringZAxis
    this.assetDown.next(this.hoveringGridAsset)
    this.assetBlockDown.next(this.hoveringAssetBlock)
    this.cellDown.next(this.hoveringCell)
    this.zAxisDown.next(this.hoveringAssetBlock ? this.hoveringAssetBlock.zIndex : 0)
    GSM.GridManager.getCellByLocation(this.hoveringCell.location.x, this.hoveringCell.location.y)
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
    const newHoveringCell = GSM.GridManager.getCellByPosition(event.posX, event.posY)

    this.hoveringPosX = event.posX
    this.hoveringPosY = event.posY
    if(!newHoveringCell) { return }
    if(newHoveringCell.id !== this.hoveringCell?.id) {
      this.hoveringCell = newHoveringCell
      this.hoveringCellAtZAxisOnMouseDown = GSM.GridManager.getCellAtZAxis(this.hoveringCell, this.hoveringZAxisAtMouseDown)
      
      const gridAsset = GSM.AssetManager.getTopAssetCoveringCell(this.hoveringCell);
      const gridAssets = GSM.AssetManager.getAllAssetsCoveringCell(this.hoveringCell)
      const assetBlock = GSM.AssetManager.getTopAssetBlockCoveringCell(this.hoveringCell);
      const assetBlocks = GSM.AssetManager.getAllAssetBlocksCoveringCell(this.hoveringCell)
      const frontFaceBlock = GSM.AssetManager.getFrontBlockCoveringCell(this.hoveringCell);

      if(assetBlock) {        
        this.hoveringCellAtZAxis = assetBlock.cell
        this.hoveringZAxis = gridAsset.attributes.size.z > 0 ? assetBlock.zIndex + 1 : assetBlock.zIndex
        this.hoveringAssetBlocks = assetBlocks
        this.hoveringGridAsset = gridAsset
        this.hoveringGridAssets = gridAssets
        this.hoveringAssetBlock = assetBlock
        this.assetHover.next(gridAsset)
        this.assetBlockHover.next(assetBlock)
        this.zAxisDown.next(this.hoveringAssetBlock ? this.hoveringAssetBlock.zIndex + 1 : 0)
      } else {
        this.hoveringCellAtZAxis = newHoveringCell
        this.hoveringGridAsset = null
        this.hoveringAssetBlock = null
        this.hoveringAssetBlocks = []
        this.hoveringGridAssets = []
        this.hoveringAssetBlockFront = undefined
        this.hoveringZAxis = 0
        this.assetHover.next(null)
        this.assetBlockHover.next(null)
        this.zAxisDown.next(this.hoveringAssetBlock ? this.hoveringAssetBlock.zIndex : 0)
      }

      if(frontFaceBlock.length > 0 && frontFaceBlock.length > assetBlocks.length) {
        this.hoveringAssetBlocks = frontFaceBlock
        this.hoveringAssetBlockFront = frontFaceBlock[frontFaceBlock.length - 1]
        this.hoveringAssetBlock = frontFaceBlock[frontFaceBlock.length - 1]
        this.hoveringCellAtZAxis = frontFaceBlock[frontFaceBlock.length - 1].cell
        this.hoveringGridAsset = GSM.AssetManager.getAssetById(this.hoveringAssetBlockFront.ownerAssetId)
        this.hoveringGridAssets = frontFaceBlock.map(asset => GSM.AssetManager.getAssetById(asset.ownerAssetId))
        this.hoveringZAxis = this.hoveringAssetBlockFront.zIndex
        this.assetHover.next(this.hoveringGridAsset)
        this.assetBlockHover.next(frontFaceBlock[frontFaceBlock.length - 1])
        this.zAxisDown.next(this.hoveringAssetBlock ? this.hoveringAssetBlock.zIndex + 1 : 0)
      }

      this.cellHover.next(this.hoveringCell)
    }
  }
}
