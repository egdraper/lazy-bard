import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { GSM } from '../../game-state-manager.service';
import { RenderingLayers } from '../../models/map';
import { CanvasSpecs } from '../../models/settings';

@Component({
  selector: 'gm-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('backgroundCanvas') backgroundCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('foregroundCanvas') foregroundCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('fogCanvas') fogCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('blackoutCanvas') blackoutCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('fullImageCanvas') fullImageCanvas: ElementRef<HTMLCanvasElement>;

  private hoveringCellId = ""

  // this needs to be put in a public function so we can pass in grid information 
  public ngAfterViewInit(): void {
    this.setupCanvas()
    GSM.CanvasController.setupComplete.next(true)
  }

  @HostListener("document:keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent): void {
    GSM.EventController.keyDown.next(event)
    GSM.EventController.keysPressed.add(event.code)
    // if (GSM.Assets.selectedGameComponent) {
    //   GSM.Assets.selectedGameComponent.setDirection(event)
    // }

    // switch (event.key) {
    //   case "Meta":
    //   case "Control":
    //     GSM.Map.hoveringCell = this.hoveringCell
    //     GSM.GameEvent.keyPressDetails.ctrlPressed = true
    //     break;
    //   case "Shift":
    //     GSM.GameEvent.keyPressDetails.shiftPressed = true
    //     break;
    //   case "ArrowRight":
    //     GSM.GameEvent.keyPressDetails.arrowRightPressed = true
    //     break;
    //   case "ArrowLeft":
    //     GSM.GameEvent.keyPressDetails.arrowLeftPressed = true
    //     break;
    //   case "ArrowUp":
    //     GSM.GameEvent.keyPressDetails.arrowUpPressed = true
    //     break;
    //   case "ArrowDown":
    //     GSM.GameEvent.keyPressDetails.arrowDownPressed = true
    //     break;
    //   case "e":
    //     // this.placingPortal = true
    //     break;
    //   default:
    //     break;
    // }

    // GSM.GameEvent.update()
  }

  @HostListener("document:keyup", ["$event"])
  public onKeyUp(event: KeyboardEvent): void {
    GSM.EventController.keyUp.next(event)
    GSM.EventController.keysPressed.delete(event.code)

    // switch (event.key) {
    //   case "Delete":
    //     GSM.Assets.removeGameComponent()
    //     break
    //   case "Meta":
    //   case "Control":
    //     GSM.GameEvent.keyPressDetails.ctrlPressed = false
    //     GSM.Map.hoveringCell = undefined
    //     break;
    //   case "Shift":
    //     GSM.GameEvent.keyPressDetails.shiftPressed = false
    //     break;
    //   case "ArrowRight":
    //     GSM.GameEvent.keyPressDetails.arrowRightPressed = false
    //     break;
    //   case "ArrowLeft":
    //     GSM.GameEvent.keyPressDetails.arrowLeftPressed = false
    //     break;
    //   case "ArrowUp":
    //     GSM.GameEvent.keyPressDetails.arrowUpPressed = false
    //     break;
    //   case "ArrowDown":
    //     GSM.GameEvent.keyPressDetails.arrowDownPressed = false
    //     break;
    //   case "e":
    //     // this.placingPortal = false
    //     break;
    //   case "q":
    //     GSM.Editor.togglePlayMode()
    //     break;
    //   default:
    //     break;
    // }
    // GSM.GameEvent.update()
  }

  public onCellClick(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)
    
    const cell = GSM.GridController.getGridCellByCoordinate(mousePosX, mousePosY, GSM.GameData.map.currentElevationLayerIndex)
    
    GSM.EventController.cellClick.next(cell.id)
    GSM.EventController.mouseClick.next({x: mousePosX, y: mousePosY})
    
    const occupiedCell = GSM.AssetController.getAssetByCellId(cell.id)
    if(!occupiedCell) {
      GSM.EventController.emptyCellClicked.next(cell.id)
    }
  }

  public onMouseDown(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)

    GSM.EventController.mouseDown.next({posX: mousePosX, posY: mousePosY})
    GSM.EventController.keysPressed.add("mouseDown")
    // GSM.GameEvent.update()
  }
  
  public onMouseUp(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)
    GSM.EventController.keysPressed.delete("mouseDown")
    // GSM.GameEvent.keyPressDetails.mouseDown = false
    // GSM.GameEvent.update()
  }

  public onMouseMove(event: MouseEvent): void {
    // if (!GSM.Map.activeMap) { return }

    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale) // + (-1 * GSM.Canvas.canvasViewPortOffsetX * GameSettings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale) // + (-1 * GSM.Canvas.canvasViewPortOffsetY * GameSettings.scale)
    GSM.Settings.mouseHoverX = mousePosX
    GSM.Settings.mouseHoverY = mousePosY
    
    const hoveringCell = GSM.GridController.getGridCellByCoordinate(mousePosX, mousePosY, GSM.GameData.map.currentElevationLayerIndex)
    if(this.hoveringCellId !== hoveringCell.id) {
      GSM.EventController.cellMouseEntered.next(hoveringCell.id)
      this.hoveringCellId = hoveringCell.id
    }
    // // Game Marker (required here because mouseDetails depends on this check being called beforehand)
    // GSM.GameMarker.checkForHover()
    // GSM.GameMarker.mouseX = mousePosX
    // GSM.GameMarker.mouseY = mousePosY

    // // For Drawing
    // GSM.Map.hoveringCell = this.hoveringCell

    // // For Event Handlers
    // GSM.GameEvent.mouseDetails.cellId = this.hoveringCell.id
    // GSM.GameEvent.mouseDetails.hoveringPlayer = GSM.Assets.getAssetFromCell(this.hoveringCell, GSM.Map.activeMap.id)
    // GSM.GameEvent.mouseDetails.hoveringBackground = this.hoveringCell.backgroundTile
    // GSM.GameEvent.mouseDetails.hoveringTerrain = this.hoveringCell.imageTile
    // GSM.GameEvent.mouseDetails.hoveringObject = undefined
    // GSM.GameEvent.mouseDetails.markerIcon = GSM.GameMarker.getHoveringIcon()
    // GSM.GameEvent.mouseDetails.mouseX = mousePosX
    // GSM.GameEvent.mouseDetails.mouseY = mousePosY
    // GSM.GameEvent.mouseDetails.mouseMove.next({mousePosX: mousePosX, mousePosY: mousePosY, cell: this.hoveringCell})
    // GSM.GameEvent.update()
  }

  private setupCanvas(): void {
    const specs = this.calculateCanvasSpecs()
    // Background

    GSM.CanvasController.backgroundCanvas = this.backgroundCanvas
    GSM.CanvasController.backgroundCTX = this.backgroundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    GSM.CanvasController.backgroundCTX.canvas.height = specs.height
    GSM.CanvasController.backgroundCTX.canvas.width = specs.width
    GSM.CanvasController.backgroundCTX.scale(GSM.Settings.scale,GSM.Settings.scale)
    
    // Foreground
    GSM.CanvasController.foregroundCanvas = this.foregroundCanvas
    GSM.CanvasController.foregroundCTX = this.foregroundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    GSM.CanvasController.foregroundCTX.canvas.height = specs.height
    GSM.CanvasController.foregroundCTX.canvas.width = specs.width
    GSM.CanvasController.foregroundCTX.scale(GSM.Settings.scale,GSM.Settings.scale)
 
    // Fog
    GSM.CanvasController.fogCanvas = this.fogCanvas
    GSM.CanvasController.fogCTX = this.fogCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    GSM.CanvasController.fogCTX.canvas.height = specs.height
    GSM.CanvasController.fogCTX.canvas.width = specs.width
    GSM.CanvasController.fogCTX.scale(GSM.Settings.scale,GSM.Settings.scale)
 
    // Fog Blackout
    GSM.CanvasController.blackoutCanvas = this.blackoutCanvas
    GSM.CanvasController.blackoutCTX = this.blackoutCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    GSM.CanvasController.blackoutCTX.canvas.height = specs.height
    GSM.CanvasController.blackoutCTX.canvas.width = specs.width
    GSM.CanvasController.blackoutCTX.scale(GSM.Settings.scale,GSM.Settings.scale)

    // Large Image Canvas
    GSM.CanvasController.fullImageCanvas = this.fullImageCanvas
    GSM.CanvasController.fullImageCTX = this.fullImageCanvas.nativeElement.getContext('2d');
  
 
    GSM.CanvasController.maxCellCountX = specs.width / GSM.Settings.blockSize
    GSM.CanvasController.maxCellCountY = specs.height / GSM.Settings.blockSize
    GSM.CanvasController.canvasSizeX = specs.width
    GSM.CanvasController.canvasSizeY = specs.height  
  }

  private calculateCanvasSpecs(): CanvasSpecs  {
    let perfectHeight = document.getElementsByClassName("game-view")[0].clientHeight
    let perfectWidth = document.getElementsByClassName("game-view")[0].clientWidth
    let container = document.getElementById("canvas-container")

    
    // sets the width of canvas if grid is less than screen size
    if(perfectWidth > GSM.GameData.map.size.x * GSM.Settings.blockSize) {
      perfectWidth = GSM.GameData.map.size.x * GSM.Settings.blockSize
      
      // sets the container div's width to match grid size for centering
      if(container) {
        container.style.width = `${perfectWidth.toString()}px`
      }      
    }
    if(perfectHeight > GSM.GameData.map.size.y * GSM.Settings.blockSize) {
      perfectHeight = GSM.GameData.map.size.y * GSM.Settings.blockSize
    }
    
    // sets the canvas width to line up with the grid's edges if grid is larger than canvas
    while (perfectHeight % GSM.Settings.blockSize !== 0) {
      perfectHeight--
    }
    while (perfectWidth % GSM.Settings.blockSize !== 0) {
      perfectWidth--
    }

    return { width: perfectWidth * GSM.Settings.scale, height: perfectHeight * GSM.Settings.scale }
  }
  
}
