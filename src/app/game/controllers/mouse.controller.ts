import { Subject } from 'rxjs';
import { GSM } from '../game-state-manager.service';
import { Cell, MousePosition } from '../models/map';
import { GridAsset } from '../models/sprite-tile.model';
import { getHoveredOverGridAsset } from './utils/selected-sprite-tile';

export class MouseController {
  // Events
  public cellClick = new Subject<Cell>();
  public emptyCellClicked = new Subject<Cell>();
  public cellAtZIndexClicked = new Subject<{ cell: Cell; zIndex: number }>();
  public cellMouseEntered = new Subject<Cell>();

  public mouseDown = new Subject();
  public mouseUp = new Subject();
  public mouseHover = new Subject();
  public mouseClick = new Subject<{ x: number; y: number }>();

  // Hover state
  public hoveringPosX: number = 0;
  public hoveringPosY: number = 0;
  public hoveringCellId: string = '';
  public hoveringCell: Cell = null;
  public hoveringGridAsset: GridAsset;
  public hoveringCellAtZAxisIterator: Cell[] = [];
  public hoveringCellAtZAxis: Cell;
  public hoveringZAxis: number = 0;
  public hoveringZAxisAtMouseDown: number = 0;
  public hoveringCellZAxisAtMouseDown: GridAsset;

  constructor() {
    this.mouseHover.subscribe(this.onMouseHover.bind(this));
    this.cellMouseEntered.subscribe(this.onMouseCellEnter.bind(this));
    this.mouseDown.subscribe(this.onMouseDown.bind(this));
    this.mouseUp.subscribe(this.onCellClick.bind(this));
  }

  private onMouseDown(event: MousePosition): void {
    const gridAsset = this.selectTerrainTile(this.hoveringCell);
    this.hoveringZAxisAtMouseDown = gridAsset?.zIndex || 0;
    this.hoveringCellZAxisAtMouseDown = gridAsset;
    this.cellMouseEntered.next(this.hoveringCell);
  }

  private onCellClick(): void {
    this.hoveringZAxisAtMouseDown = 0;
    const cell = this.hoveringCellZAxisAtMouseDown ? this.hoveringCellZAxisAtMouseDown.cell : this.hoveringCell
    this.cellAtZIndexClicked.next({cell: cell, zIndex: this.hoveringZAxis})
    this.cellAtZIndexClicked.next({cell: cell, zIndex: this.hoveringZAxis})
  }

  private onMouseHover(event: MousePosition): void {
    this.setMouseDetails(event);
  }

  private onMouseCellEnter(cell: Cell): void {
    this.selectTerrainTile(cell);
  }

  private setMouseDetails(event: MousePosition): void {
    this.hoveringPosX = event.posX;
    this.hoveringPosY = event.posY;

    const hoveringCell = GSM.GridController.getCellByPosition(
      this.hoveringPosX,
      this.hoveringPosY
    );

    if (hoveringCell && this.hoveringCellId !== hoveringCell.id) {
      this.hoveringCellId = hoveringCell.id;
      this.hoveringCell = hoveringCell;
      this.cellMouseEntered.next(this.hoveringCell);
    }
  }

  private selectTerrainTile(cell: Cell): GridAsset {
    const gridAsset = getHoveredOverGridAsset(cell);
    if (gridAsset) {
      this.hoveringZAxis = gridAsset.zIndex;
      this.hoveringGridAsset = gridAsset;
      return gridAsset;
    } else {
      this.hoveringGridAsset = null;
      this.hoveringZAxis = 0
      return null;
    }
  }
}
