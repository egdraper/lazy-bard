import { Subscription } from "rxjs"
import { GSM } from "../../../../game-state-manager.service"
import { Asset } from "../../../../models/asset.model"
import { Cell } from "../../../../models/map"
import { TravelPath } from "./shortest-path"

export abstract class Movement {
  protected abstract asset: Asset  
  protected abstract travelPath: TravelPath

  protected currentPath: Cell[] = []
  protected redirection: { start: Cell, end: Cell, charactersOnGrid: Asset[] }
  protected nextCell: Cell
  protected movementSubscription: Subscription
  protected speed = GSM.Settings.speed
  protected distanceToNextCell = 0

  protected assetCellPosX = 0
  protected assetCellPosY = 0
  
  protected onFinished: () => void
  
    
  public set spriteDirection(value: string) {
    if (value === "down") { this.asset.frameYPosition = 0 }
    if (value === "up") { this.asset.frameYPosition = 108 }
    if (value === "left") { this.asset.frameYPosition = 36 }
    if (value === "right") { this.asset.frameYPosition = 72 }
  }

  constructor() {
    GSM.EventController.keyDown.subscribe(this.setDirection.bind(this))
  }

  public abstract move(event: {assetPosX: number, assetPosY: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number}): {newPosX: number, newPosY: number} 

  public start(startCell: Cell, endCell: Cell, charactersOnGrid: Asset[], onFinished?: ()=> void): void {
    if (onFinished) { this.onFinished = onFinished }

    if (this.asset.moving) {
      this.redirection = { start: undefined, end: endCell, charactersOnGrid: charactersOnGrid }
      return
    } else {
      this.redirection = undefined
    }

    this.currentPath = this.travelPath.find(startCell, endCell, charactersOnGrid)
    if(this.currentPath.length === 0) { return }
    
    this.asset.moving = true
    this.currentPath.pop() // removes cell the character is standing on
    this.nextCell = this.currentPath.pop()

    this.setSpriteDirection()
    this.asset.animationFrame = 2
    this.distanceToNextCell = GSM.Settings.blockSize
    this.assetCellPosX = this.asset.positionX
    this.assetCellPosY = this.asset.positionY

    this.movementSubscription = GSM.FrameController.frameFire.subscribe(frame => {
      if(this.asset.moving) {
        this.trackCell()
        const newPos = this.move({assetPosX: this.asset.positionX, assetPosY: this.asset.positionY, pathTrackPosX: this.assetCellPosX, pathTrackPosY: this.assetCellPosY, speed: this.speed, distanceToNextCell: this.distanceToNextCell})
        this.asset.positionX = newPos.newPosX
        this.asset.positionY = newPos.newPosY
        this.checkForFinishLocation()
      }
    })
  }

  public updateAnimation() {
    if (this.asset.frameCounter < 3) {
      this.asset.frameCounter++
    } else {
      this.asset.frameCounter = 0
    }
  }

  private trackCell(): void {
      let nextXMove = 0
      let nextYMove = 0
  
      if (this.nextCell.x !== this.asset.cell.x) { nextXMove = this.nextCell.x > this.asset.cell.x ? this.speed : this.speed * -1 }
      if (this.nextCell.y !== this.asset.cell.y) { nextYMove = this.nextCell.y > this.asset.cell.y ? this.speed : this.speed * -1 }
  
      this.assetCellPosX += nextXMove
      this.assetCellPosY += nextYMove
    
  }

  protected setDirection(keyEvent: KeyboardEvent): void {
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

  protected end(): void {
    this.currentPath = null
    this.asset.moving = false
    this.asset.animationFrame = 16
    this.movementSubscription.unsubscribe()
  } 

  protected setSpriteDirection(): void {
    if (this.nextCell.x !== this.asset.cell.x) {
      this.spriteDirection = this.nextCell.x > this.asset.cell.x ? "right" : "left"
    } else if (this.nextCell.y !== this.asset.cell.y) {
      this.spriteDirection = this.nextCell.y > this.asset.cell.y ? "down" : "up"
    }
  }

  protected checkForFinishLocation(): void {    
    if (this.assetCellPosX % (32) === 0 && this.assetCellPosY % (32) === 0) {
      this.asset.cell = GSM.GridController.getGridCellByCoordinate(this.asset.positionX, this.asset.positionY, GSM.GameData.map.currentElevationLayerIndex)
      this.nextCell = this.currentPath.length > 0
        ? this.currentPath.pop()
        : null

        if (this.redirection) {
        this.end()
        this.start(this.asset.cell, this.redirection.end, this.redirection.charactersOnGrid)
      }

      if (!this.nextCell) {
        this.end()
        if(this.onFinished) { 
          const onFinished = this.onFinished
          this.onFinished = undefined
          onFinished()
        }
      } else {
        this.distanceToNextCell = GSM.Settings.blockSize
        this.asset.positionX = this.assetCellPosX
        this.asset.positionY = this.assetCellPosY
        this.setSpriteDirection()
      }
    }
  }  
}





