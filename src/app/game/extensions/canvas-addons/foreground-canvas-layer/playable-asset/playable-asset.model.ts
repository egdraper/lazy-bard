import { Subscription } from "rxjs"
import { GSM } from "../../../../game-state-manager.service"
import { Asset } from "../../../../models/asset.model"
import { Cell } from "../../../../models/map"
import { ShortestPath } from "./shortest-path"

export class PlayableAsset extends Asset {
  // animation
  public frameXPosition = [0, 26, 52, 26]
  public frameYPosition = 0
  public frameCounter = 0
  public animationFrame = 16
  public animating = true

  // movement
  public moving = false
  public positionX = 0
  public positionY = 0
  
  private onFinished: () => void  
  private currentPath: Cell[] = []
  private redirection: { start: Cell, end: Cell, charactersOnGrid: PlayableAsset[] }
  private nextCell: Cell
  private movementSubscription: Subscription

  public set spriteDirection(value: string) {
    if (value === "down") { this.frameYPosition = 0 }
    if (value === "up") { this.frameYPosition = 108 }
    if (value === "left") { this.frameYPosition = 36 }
    if (value === "right") { this.frameYPosition = 72 }
  }

  constructor() {
    super()
    GSM.EventController.keyDown.subscribe(this.setDirection.bind(this))
  }

  public updateAnimation() {
    if (this.frameCounter < 3) {
      this.frameCounter++
    } else {
      this.frameCounter = 0
    }
  }

  public setDirection(keyEvent: KeyboardEvent): void {
    if (keyEvent.code === 'KeyW') {
      this.spriteDirection = "up"
    }

    if (keyEvent.code === 'KeyA') {
      this.spriteDirection = "left"
    }

    if (keyEvent.code === 'KeyD') {
      this.spriteDirection = "right"
    }

    if (keyEvent.code === 'KeyS') {
      this.spriteDirection = "down"
    }
  }


  public startMovement(startCell: Cell, endCell: Cell, charactersOnGrid: PlayableAsset[], onFinished?: ()=> void): void {
    if (onFinished) { this.onFinished = onFinished }

    if (this.moving) {
      this.redirection = { start: undefined, end: endCell, charactersOnGrid: charactersOnGrid }
      return
    } else {
      this.redirection = undefined
    }

    this.currentPath = ShortestPath.find(startCell, endCell, charactersOnGrid)
    if(this.currentPath.length === 0) { return }
    
    this.moving = true
    this.currentPath.pop() // removes cell the character is standing on
    this.nextCell = this.currentPath.pop()

    this.setSpriteDirection()
    this.animationFrame = 8
    
    this.movementSubscription = GSM.FrameController.frameFire.subscribe(frame => {
      if(this.moving) {
        this.move()
      }
    })
  }

  public endMovement(): void {
    this.currentPath = null
    this.moving = false
    this.animationFrame = 16
    this.movementSubscription.unsubscribe()
  }

  public move() {
    let nextXMove = 0
    let nextYMove = 0
    const speed = GSM.Settings.speed

    if (this.nextCell.x !== this.cell.x) { nextXMove = this.nextCell.x > this.cell.x ? speed : speed * -1 }
    if (this.nextCell.y !== this.cell.y) { nextYMove = this.nextCell.y > this.cell.y ? speed : speed * -1 }

    this.positionX += nextXMove
    this.positionY += nextYMove

    // if (!GameSettings.gm || GameSettings.trackMovement) {
    //   GSM.Canvas.trackAsset(-1 * (nextXMove), -1 * (nextYMove), this)
    // }

    if (this.positionY % (32) === 0 && this.positionX % (32) === 0) {
      this.cell = GSM.GridController.getGridCellByCoordinate(this.positionX, this.positionY, GSM.ElevationController.currentElevationLayerIndex)
      
      // sets screen position for scrolling
      // if(!GameSettings.gm) {
      //   GSM.Canvas.trackAsset(this.nextCell.x - this.prevCell.x, this.nextCell.y - this.prevCell.y, this, true)
      // }
      
      this.nextCell = this.currentPath.length > 0
        ? this.currentPath.pop()
        : null

      // handles screen offset  

      // GSM.Draw.blackOutFogPainter.movementComplete = true
      if (this.redirection) {
        this.endMovement()
        this.startMovement(this.cell, this.redirection.end, this.redirection.charactersOnGrid)
      }

      if (!this.nextCell) {
        this.endMovement()
        if(this.onFinished) { 
          const onFinished = this.onFinished
          this.onFinished = undefined
          onFinished()
        }
      } else {
        this.setSpriteDirection()
      }
    }
  }

  private setSpriteDirection(): void {
    if (this.nextCell.x !== this.cell.x) {
      this.spriteDirection = this.nextCell.x > this.cell.x ? "right" : "left"
    } else if (this.nextCell.y !== this.cell.y) {
      this.spriteDirection = this.nextCell.y > this.cell.y ? "down" : "up"
    }
  }
}



