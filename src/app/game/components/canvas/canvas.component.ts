import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core'
import { GSM } from '../../game-state-manager.service'
import { CanvasSpecs } from '../../models/settings'

@Component({
  selector: 'gm-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('backgroundCanvas') backgroundCanvas: ElementRef<HTMLCanvasElement>
  @ViewChild('foregroundCanvas') foregroundCanvas: ElementRef<HTMLCanvasElement>
  @ViewChild('fogCanvas') fogCanvas: ElementRef<HTMLCanvasElement>
  @ViewChild('blackoutCanvas') blackoutCanvas: ElementRef<HTMLCanvasElement>
  @ViewChild('fullImageCanvas') fullImageCanvas: ElementRef<HTMLCanvasElement>

  private hoveringCellId = ""

  // this needs to be put in a public function so we can pass in grid information 
  public ngAfterViewInit(): void {
    this.setupCanvas()
    GSM.CanvasController.setupComplete.next(true)
  }

  @HostListener("document:keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent): void {
    GSM.KeyController.keyDown.next(event)
    GSM.KeyController.keysPressed.add(event.code)
  }

  @HostListener("document:keyup", ["$event"])
  public onKeyUp(event: KeyboardEvent): void {
    GSM.KeyController.keyUp.next(event)
    GSM.KeyController.keysPressed.delete(event.code)
  }

  public onCellClick(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)
    
    GSM.MouseController.mouseClick.next({posX: mousePosX, posY: mousePosY})
  }

  public onMouseDown(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)

    GSM.KeyController.keysPressed.add("mouseDown")
    GSM.MouseController.mouseDown.next({posX: mousePosX, posY: mousePosY})
  }
  
  public onMouseUp(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)

    GSM.MouseController.mouseUp.next({posX: mousePosX, posY: mousePosY})
    GSM.KeyController.keysPressed.delete("mouseDown")
  }

  public onMouseMove(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)
    GSM.MouseController.mouseHover.next({posX: mousePosX, posY: mousePosY})
  }

  private setupCanvas(): void {
    const specs = this.calculateCanvasSpecs()
    // Background

    GSM.CanvasController.backgroundCanvas = this.backgroundCanvas
    GSM.CanvasController.backgroundCTX = this.backgroundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D
    GSM.CanvasController.backgroundCTX.canvas.height = specs.height
    GSM.CanvasController.backgroundCTX.canvas.width = specs.width
    GSM.CanvasController.backgroundCTX.scale(GSM.Settings.scale,GSM.Settings.scale)
    
    // Foreground
    GSM.CanvasController.foregroundCanvas = this.foregroundCanvas
    GSM.CanvasController.foregroundCTX = this.foregroundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D
    GSM.CanvasController.foregroundCTX.canvas.height = specs.height
    GSM.CanvasController.foregroundCTX.canvas.width = specs.width
    GSM.CanvasController.foregroundCTX.scale(GSM.Settings.scale,GSM.Settings.scale)
 
    // Fog
    GSM.CanvasController.fogCanvas = this.fogCanvas
    GSM.CanvasController.fogCTX = this.fogCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D
    GSM.CanvasController.fogCTX.canvas.height = specs.height
    GSM.CanvasController.fogCTX.canvas.width = specs.width
    GSM.CanvasController.fogCTX.scale(GSM.Settings.scale,GSM.Settings.scale)
 
    // Fog Blackout
    GSM.CanvasController.blackoutCanvas = this.blackoutCanvas
    GSM.CanvasController.blackoutCTX = this.blackoutCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D
    GSM.CanvasController.blackoutCTX.canvas.height = specs.height
    GSM.CanvasController.blackoutCTX.canvas.width = specs.width
    GSM.CanvasController.blackoutCTX.scale(GSM.Settings.scale,GSM.Settings.scale)

    // Large Image Canvas
    GSM.CanvasController.fullImageCanvas = this.fullImageCanvas
    GSM.CanvasController.fullImageCTX = this.fullImageCanvas.nativeElement.getContext('2d')
  
 
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
    if(perfectWidth > GSM.GridController.map.size.x * GSM.Settings.blockSize) {
      perfectWidth = GSM.GridController.map.size.x * GSM.Settings.blockSize
      
      // sets the container div's width to match grid size for centering
      if(container) {
        container.style.width = `${perfectWidth.toString()}px`
      }      
    }
    if(perfectHeight > GSM.GridController.map.size.y * GSM.Settings.blockSize) {
      perfectHeight = GSM.GridController.map.size.y * GSM.Settings.blockSize
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
