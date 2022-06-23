import { GSM } from "src/app/game/game-state-manager.service"
import { Cell } from "src/app/game/models/map"

export enum Orientation {
  Down = "down",
  Left = "left",
  Right = "right",
  Up = "up"
}

export class SpriteOrientation {
  public currentOrientation = Orientation.Down

  constructor() {
    GSM.KeyController.keyDown.subscribe(this.setDirectionByKey.bind(this))
  }

  public setOrientation(orientation: Orientation) {
    this.currentOrientation = orientation
  }

  public autoSetOrientation(fromCell: Cell, toCell: Cell): void {
    if (toCell.location.x !== fromCell.location.x) {
      this.currentOrientation = toCell.location.x > fromCell.location.x ? Orientation.Right : Orientation.Left
    } else if (toCell.location.y !== fromCell.location.y) {
      this.currentOrientation = toCell.location.y > fromCell.location.y ? Orientation.Down : Orientation.Up
    }
  }

  protected setDirectionByKey(keyEvent: KeyboardEvent): void {
    if (keyEvent.code === 'KeyW') {
      this.currentOrientation = Orientation.Up
    }

    if (keyEvent.code === 'KeyA') {
      this.currentOrientation = Orientation.Left
    }

    if (keyEvent.code === 'KeyD') {
      this.currentOrientation = Orientation.Right
    }

    if (keyEvent.code === 'KeyS') {
      this.currentOrientation = Orientation.Down
    }
  }

  public adjustAssetForRotation() {
    if(this.currentOrientation === Orientation.Down) { 
      this.currentOrientation = Orientation.Left 
      return
    }
  
    if(this.currentOrientation === Orientation.Left) { 
      this.currentOrientation = Orientation.Up
      return
    }
   
    if(this.currentOrientation === Orientation.Up) {
      this.currentOrientation = Orientation.Right
      return
    }
    if(this.currentOrientation === Orientation.Right) {
      this.currentOrientation = Orientation.Down
      return
    }
  }
}
