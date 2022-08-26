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
    GSM.CanvasManager.setupComplete.next(true)
  }

  @HostListener("document:keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent): void {
    GSM.KeyManager.keyDown.next(event)
    GSM.KeyManager.keysPressed.add(event.code)
  }

  @HostListener("document:keyup", ["$event"])
  public onKeyUp(event: KeyboardEvent): void {
    GSM.KeyManager.keyUp.next(event)
    GSM.KeyManager.keysPressed.delete(event.code)
  }

  public onCellClick(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)
    
    GSM.MouseManager.mouseClick.next({posX: mousePosX, posY: mousePosY})
  }

  public onMouseDown(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)

    GSM.KeyManager.keysPressed.add("mouseDown")
    GSM.MouseManager.mouseDown.next({posX: mousePosX, posY: mousePosY})
  }
  
  public onMouseUp(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)

    GSM.MouseManager.mouseUp.next({posX: mousePosX, posY: mousePosY})
    GSM.KeyManager.keysPressed.delete("mouseDown")
  }

  public onMouseMove(event: MouseEvent): void {
    const mousePosX = Math.round(Math.abs(event.offsetX) / GSM.Settings.scale)
    const mousePosY = Math.round(Math.abs(event.offsetY) / GSM.Settings.scale)
    GSM.MouseManager.mouseHover.next({posX: mousePosX, posY: mousePosY})
  }

  private setupCanvas(): void {
    const specs = this.calculateCanvasSpecs()
    // Background

    GSM.CanvasManager.backgroundCanvas = this.backgroundCanvas
    GSM.CanvasManager.backgroundCTX = this.backgroundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D
    GSM.CanvasManager.backgroundCTX.canvas.height = specs.height
    GSM.CanvasManager.backgroundCTX.canvas.width = specs.width
    GSM.CanvasManager.backgroundCTX.scale(GSM.Settings.scale,GSM.Settings.scale)
    
    // Foreground
    GSM.CanvasManager.foregroundCanvas = this.foregroundCanvas
    GSM.CanvasManager.foregroundCTX = this.foregroundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D
    GSM.CanvasManager.foregroundCTX.canvas.height = specs.height
    GSM.CanvasManager.foregroundCTX.canvas.width = specs.width
    GSM.CanvasManager.foregroundCTX.scale(GSM.Settings.scale,GSM.Settings.scale)
 
    // Fog
    GSM.CanvasManager.fogCanvas = this.fogCanvas
    GSM.CanvasManager.fogCTX = this.fogCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D
    GSM.CanvasManager.fogCTX.canvas.height = specs.height
    GSM.CanvasManager.fogCTX.canvas.width = specs.width
    GSM.CanvasManager.fogCTX.scale(GSM.Settings.scale,GSM.Settings.scale)
 
    // Fog Blackout
    GSM.CanvasManager.blackoutCanvas = this.blackoutCanvas
    GSM.CanvasManager.blackoutCTX = this.blackoutCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D
    GSM.CanvasManager.blackoutCTX.canvas.height = specs.height
    GSM.CanvasManager.blackoutCTX.canvas.width = specs.width
    GSM.CanvasManager.blackoutCTX.scale(GSM.Settings.scale,GSM.Settings.scale)

    // Large Image Canvas
    GSM.CanvasManager.fullImageCanvas = this.fullImageCanvas
    GSM.CanvasManager.fullImageCTX = this.fullImageCanvas.nativeElement.getContext('2d')
  
 
    GSM.CanvasManager.maxCellCountX = specs.width / GSM.Settings.blockSize
    GSM.CanvasManager.maxCellCountY = specs.height / GSM.Settings.blockSize
    GSM.CanvasManager.canvasSizeX = specs.width
    GSM.CanvasManager.canvasSizeY = specs.height  
  }

  private calculateCanvasSpecs(): CanvasSpecs  {
    let perfectHeight = document.getElementsByClassName("game-view")[0].clientHeight
    let perfectWidth = document.getElementsByClassName("game-view")[0].clientWidth
    let container = document.getElementById("canvas-container")

    
    // sets the width of canvas if grid is less than screen size
    if(perfectWidth > GSM.GridManager.map.size.x * GSM.Settings.blockSize) {
      perfectWidth = GSM.GridManager.map.size.x * GSM.Settings.blockSize
      
      // sets the container div's width to match grid size for centering
      if(container) {
        container.style.width = `${perfectWidth.toString()}px`
      }      
    }
    if(perfectHeight > GSM.GridManager.map.size.y * GSM.Settings.blockSize) {
      perfectHeight = GSM.GridManager.map.size.y * GSM.Settings.blockSize
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
