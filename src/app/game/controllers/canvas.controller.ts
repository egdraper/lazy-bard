import { ElementRef } from "@angular/core";
import { Subject } from "rxjs";

export class CanvasController {
  public setupComplete = new Subject()
  public canvasSizeX = 969
  public canvasSizeY = 969
  public maxCellCountX = 0
  public maxCellCountY = 0
  
  public backgroundCanvas: ElementRef<HTMLCanvasElement>;
  public backgroundCTX: CanvasRenderingContext2D;

  public foregroundCanvas: ElementRef<HTMLCanvasElement>;
  public foregroundCTX: CanvasRenderingContext2D;
    
  public fogCanvas: ElementRef<HTMLCanvasElement>;
  public fogCTX: CanvasRenderingContext2D;
  
  public blackoutCanvas: ElementRef<HTMLCanvasElement>;
  public blackoutCTX: CanvasRenderingContext2D;

  public fullImageCanvas: ElementRef<HTMLCanvasElement>;
  public fullImageCTX: CanvasRenderingContext2D;
}
