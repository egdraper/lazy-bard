import { Subscription } from "rxjs"
import { Asset } from "src/app/game/models/sprite-tile.model"
import { GSM } from "../../../game-state-manager.service"
import { Cell, RenderingLayers } from "../../../models/map"
import { TravelPath } from "../shortest-path"

export abstract class Movement {  
  protected abstract asset: Asset  
  protected abstract travelPath: TravelPath
  protected currentPath: Cell[] = []
  protected redirection: { start: Cell, end: Cell, charactersOnGrid: Asset[] }
  protected nextCell: Cell
  protected previousCell: Cell
  protected movementSubscription: Subscription
  protected distanceToNextCell = 0
  protected onFinished: () => void  

  private speed: number = 1
  private cellTrackPosX = 0
  private cellTrackPosY = 0
    
  public set spriteDirection(value: string) {
    if (value === "down") { this.asset.tile.animation.spriteYPosition = "down" }
    if (value === "left") { this.asset.tile.animation.spriteYPosition = "left" }
    if (value === "right") { this.asset.tile.animation.spriteYPosition = "right" }
    if (value === "up") { this.asset.tile.animation.spriteYPosition = "up" }
  }

  constructor() {
    GSM.KeyController.keyDown.subscribe(this.setDirection.bind(this))
  }

  public abstract move(event: {assetPosX: number, assetPosY: number, assetPosZ: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number, distanceToFinalCell: number}): {newPosX: number, newPosY: number, newPosZ: number} 

  public resetTrackingToCell(cell: Cell, rotationDirection: number = 0) {
    this.cellTrackPosX = cell.position.x
    this.cellTrackPosY = cell.position.y

    if(this.asset.tile.animation.spriteYPosition === "down") { 
      this.spriteDirection = "left"; 
      return
    }

    if(this.asset.tile.animation.spriteYPosition === "left") { 
      this.spriteDirection = "up"
      return
    }
   
    if(this.asset.tile.animation.spriteYPosition === "up") {
      this.spriteDirection = "right"
      return
    }
    if(this.asset.tile.animation.spriteYPosition === "right") {
      this.spriteDirection = "down"
      return
    }
  }

  public start(startCell: Cell, endCell: Cell, charactersOnGrid: Asset[], onFinished?: ()=> void): void {
    if (onFinished) { this.onFinished = onFinished }

    if (this.asset.moving) {
      this.redirection = { start: undefined, end: endCell, charactersOnGrid: charactersOnGrid }
      return
    } else {
      this.redirection = undefined
    }

    this.currentPath = this.travelPath.find(startCell, endCell, this.asset)

    if(this.currentPath.length === 0) { return }
    
    this.asset.moving = true
    this.previousCell = this.currentPath.pop() // removes cell the character is standing on
    this.nextCell = this.currentPath.pop()

    this.setSpriteDirection()
    this.asset.tile.animation.changeEveryNthFrame = 16
    this.distanceToNextCell = GSM.Settings.blockSize
    this.cellTrackPosX = this.asset.movementOffset.x
    this.cellTrackPosY = this.asset.movementOffset.y

    /// ADAPTIVE SPEED Adjustment
    // const a = Math.round((GSM.Settings.blockToFeet * GSM.Settings.speed) / 3) // 10 feet per second
    // const e = a / GSM.Settings.blockToFeet // 2 squares per second
    // const b = GSM.Settings.blockSize * e // 32 px per second
    // const c = Math.ceil(64 / b) // every 2 frames

    // if(c === 1) {
    //   this.speed = Math.ceil(b / 64)
    // } else if (c > 1) {
    //   this.speed = 1
    // }
    
    this.movementSubscription = GSM.FrameController.frameFire.subscribe(frame => { 

      if(this.asset.moving && frame) { // % c === 0) {
        this.trackCell()
        const newPos = this.move({assetPosX: this.asset.movementOffset.x, assetPosY: this.asset.movementOffset.y, assetPosZ: this.asset.movementOffset.z, pathTrackPosX: this.cellTrackPosX, pathTrackPosY: this.cellTrackPosY, speed: this.speed, distanceToNextCell: this.distanceToNextCell, distanceToFinalCell: this.currentPath.length})
        this.asset.movementOffset.x = newPos.newPosX
        this.asset.movementOffset.y = newPos.newPosY
        this.asset.movementOffset.z = newPos.newPosZ
        this.distanceToNextCell = this.distanceToNextCell - this.speed
        this.checkForFinishLocation()
      }
    })
  }

  public updateAnimation() {
    if (this.asset.tile.animation.positionCounter < 3) {
      this.asset.tile.animation.positionCounter++
    } else {
      this.asset.tile.animation.positionCounter = 0
    }
  }

  private trackCell(): void {
      let nextXMove = 0
      let nextYMove = 0
  
      if (this.nextCell.location.x !== this.asset.cell.location.x) { nextXMove = this.nextCell.location.x > this.asset.cell.location.x ? this.speed : this.speed * -1 }
      if (this.nextCell.location.y !== this.asset.cell.location.y) { nextYMove = this.nextCell.location.y > this.asset.cell.location.y ? this.speed : this.speed * -1 }
  
      this.cellTrackPosX += nextXMove
      this.cellTrackPosY += nextYMove    
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
    this.asset.tile.animation.changeEveryNthFrame = 16
    this.movementSubscription.unsubscribe()
  } 

  protected setSpriteDirection(): void {
    if (this.nextCell.location.x !== this.asset.cell.location.x) {
      this.spriteDirection = this.nextCell.location.x > this.asset.cell.location.x ? "right" : "left"
    } else if (this.nextCell.location.y !== this.asset.cell.location.y) {
      this.spriteDirection = this.nextCell.location.y > this.asset.cell.location.y ? "down" : "up"
    }
  }

  protected checkForFinishLocation(): void {    
    if (this.cellTrackPosX % (GSM.Settings.blockSize) === 0 && this.cellTrackPosY % (GSM.Settings.blockSize) === 0) {
      const newCell = GSM.GridController.getCellByPosition(this.cellTrackPosX, this.cellTrackPosY)
      
      GSM.AssetController.switchAssetToNewCell(
        this.asset,
        this.previousCell,
        newCell,
        this.asset.zIndex,
        this.asset.zIndex,
        RenderingLayers.CharacterLayer,
        RenderingLayers.CharacterLayer
      )
      
      this.asset.movementOffset.x = this.cellTrackPosX
      this.asset.movementOffset.y = this.cellTrackPosY
      this.previousCell = newCell
      
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
        this.setSpriteDirection()
      }
    }
  }  
}





