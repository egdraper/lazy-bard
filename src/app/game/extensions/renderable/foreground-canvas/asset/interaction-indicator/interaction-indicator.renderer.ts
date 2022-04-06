import { GSM } from "src/app/game/game-state-manager.service";
import { Asset } from "src/app/game/models/asset.model";
import { RenderingLayers } from "src/app/game/models/map";
import { Renderer, RenderOptionsEvent } from "src/app/game/models/renderer";


export class SelectionIndicatorRenderer extends Renderer {
  public renderingLayer: RenderingLayers = RenderingLayers.CharacterLayer
  public override excludeFromSingleImagePainting: boolean = true
  
  public onDraw(event: RenderOptionsEvent): void {
    // const hoveringCell = GSM.MouseController.hoveringCell

    // GSM.CellNeighborsController.getAllImmediateNeighbors(hoveringCell, GSM.GridController.)
    
    // const asset = GSM.AssetController.getSelectedAssets().find(asset => asset.cell.id === cellId)
    // if(!asset) { return } 
    
    // this.ctx.beginPath()
    // this.ctx.rect(this.posX, this.posY, this.width, this.height)    
    // this.ctx.lineWidth = 2;
    // this.ctx.strokeStyle = "rgba(255, 0 , 0, .5)"
    // this.ctx.stroke()
  }


}