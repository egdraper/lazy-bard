import { Cell } from "src/app/game/models/map"

export enum Orientation {
  Down = "down",
  Left = "left",
  Right = "right",
  Up = "up"
}

export class SpriteOrientation {
  public currentOrientation = Orientation.Down

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
