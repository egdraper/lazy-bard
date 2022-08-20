import { Subscription } from "rxjs"
import { ActionEvents, PlaceableAsset } from "../../models/asset.model"
import { GSM } from "../../game-state-manager.service"
import { Cell, Position, RenderingLayers } from "../../models/map"
import { TravelPath } from "../../extensions/asset/shortest-paths/shortest-path"
import { SpriteAnimation } from "../../extensions/asset/animation/animation"

export abstract class Movement {
  protected abstract asset: PlaceableAsset
  public movementOffset: Position
  public moving = false
  public speed: number = 1
  
  protected abstract travelPath: TravelPath
  
  protected currentPath: Cell[] = []
  protected redirection: { start: Cell, end: Cell, charactersOnGrid: PlaceableAsset[] }
  protected nextCell: Cell
  protected previousCell: Cell
  protected movementSubscription: Subscription
  protected distanceToNextCell = 0
  
  private onFinished: () => void    
  private cellTrackPosX = 0
  private cellTrackPosY = 0

  public abstract move(event: {assetPosX: number, assetPosY: number, assetPosZ: number, pathTrackPosX: number, pathTrackPosY: number, speed: number, distanceToNextCell: number, distanceToFinalCell: number}): {newPosX: number, newPosY: number, newPosZ: number} 

  constructor(
    private animation: SpriteAnimation,
    private startPos: Position) {
    this.movementOffset = startPos
  }

  public resetTrackingToCell(cell: Cell) {
    this.cellTrackPosX = cell.position.x
    this.cellTrackPosY = cell.position.y
  }

  public start(startCell: Cell, endCell: Cell, charactersOnGrid: PlaceableAsset[], onFinished?: ()=> void): void {
    this.onFinished = onFinished
    
    if (this.moving) {
      this.redirection = { start: undefined, end: endCell, charactersOnGrid: charactersOnGrid }
      return
    } else {
      this.redirection = undefined
    }
    
    this.setCurrentPath(startCell, endCell)
    this.setStartingMotionCells()
    this.setTracking()
    if(!this.isNextCellPassable()) { 
      this.endMovement() 
      return
    }

    this.moving = true
    
    this.subscribeToFrameTimer()
    this.prepareNextMovement()
  }

  public updateAnimation() {
    if (this.animation.positionCounter < 3) {
      this.animation.positionCounter++
    } else {
      this.animation.positionCounter = 0
    }
  }

  private trackCell(): void {
    let nextXMove = 0
    let nextYMove = 0
  
    if (this.nextCell.location.x !== this.asset.anchorCell.location.x) { nextXMove = this.nextCell.location.x > this.asset.anchorCell.location.x ? this.speed : this.speed * -1 }
    if (this.nextCell.location.y !== this.asset.anchorCell.location.y) { nextYMove = this.nextCell.location.y > this.asset.anchorCell.location.y ? this.speed : this.speed * -1 }
  
    this.cellTrackPosX += nextXMove
    this.cellTrackPosY += nextYMove    
  }


  protected checkForFinishLocation(): void {    
    if (this.cellTrackPosX % (GSM.Settings.blockSize) === 0 && this.cellTrackPosY % (GSM.Settings.blockSize) === 0) {
      const newCell = GSM.GridController.getCellByPosition(this.cellTrackPosX, this.cellTrackPosY)
      
      GSM.AssetController.switchAssetToNewCell(
        this.asset,
        newCell,
        this.asset.baseZIndex
      )
      
      this.movementOffset.x = this.cellTrackPosX
      this.movementOffset.y = this.cellTrackPosY
      this.previousCell = newCell
      
      this.nextCell = this.currentPath.length > 0
        ? this.currentPath.pop()
        : null

      if (this.redirection) {
        this.endMovement()
        this.start(this.asset.anchorCell, this.redirection.end, this.redirection.charactersOnGrid)
      }

      if (!this.nextCell || !this.isNextCellPassable()) {
        GSM.EventController.assetFinishingMovement.next({asset: this.asset, cell: this.previousCell})
        this.endMovement()
       } else {
        this.prepareNextMovement()
      }
    }
  }  
  
  protected prepareNextMovement(): void {
    this.distanceToNextCell = GSM.Settings.blockSize
    this.asset.orientation.autoSetOrientation(this.asset.anchorCell, this.nextCell)
    GSM.EventController.assetEnteredCell.next({asset: this.asset, cell: this.nextCell})

  }

  protected setCurrentPath(startCell: Cell, endCell: Cell): void {
    this.currentPath = this.travelPath.find(startCell, endCell, this.asset)    
    if(this.currentPath.length < 2) { return }
  }

  protected setTracking(): void {
    this.distanceToNextCell = GSM.Settings.blockSize
    this.cellTrackPosX = this.movementOffset.x
    this.cellTrackPosY = this.movementOffset.y
  }

  protected setStartingMotionCells(): void {
    this.previousCell = this.currentPath.pop()
    this.nextCell = this.currentPath.pop()  
  }

  protected subscribeToFrameTimer(): void {
    this.movementSubscription = GSM.FrameController.frameFire.subscribe(frame => { 
      if(this.moving && frame) { // % c === 0) {
        this.trackCell()
        const newPos = this.move({assetPosX: this.movementOffset.x, assetPosY: this.movementOffset.y, assetPosZ: this.movementOffset.z, pathTrackPosX: this.cellTrackPosX, pathTrackPosY: this.cellTrackPosY, speed: this.speed, distanceToNextCell: this.distanceToNextCell, distanceToFinalCell: this.currentPath.length})
        this.movementOffset.x = newPos.newPosX
        this.movementOffset.y = newPos.newPosY
        this.movementOffset.z = newPos.newPosZ
        this.distanceToNextCell = this.distanceToNextCell - this.speed
        this.checkForFinishLocation()
      }
    })
  }

  protected endMovement(): void {
    this.currentPath = null
    this.moving = false

    if(this.movementSubscription) {
      this.movementSubscription.unsubscribe()
    }
    
    if(this.onFinished) { 
      const onFinished = this.onFinished
      this.onFinished = undefined
      onFinished()
    }
  } 

  private isNextCellPassable(): boolean {
    let nextTerrainAsset
    let previousTerrainAsset
    if(this.nextCell) {
      nextTerrainAsset = GSM.AssetController.getAsset(this.nextCell, this.asset.baseZIndex - 1, RenderingLayers.TerrainLayer)
      previousTerrainAsset = GSM.AssetController.getAsset(this.previousCell, this.asset.baseZIndex - 1, RenderingLayers.TerrainLayer)
    } else {
      return false
    }

    return this.asset.hovering || nextTerrainAsset?.tile?.drawableTileId === previousTerrainAsset?.tile?.drawableTileId
  }
}



    
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



