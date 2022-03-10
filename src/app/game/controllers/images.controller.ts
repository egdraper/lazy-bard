import { LayerPainter } from '../extensions/base-layer.painter';
import { ImageGenerator } from '../extensions/image.generator';
import { LayerAddOn } from '../extensions/layer-extension';
import { GSM } from '../game-state-manager.service';
import { CanvasCTX } from '../models/extension.model';
import { Painter } from '../models/painter';

export class ImagesController {
  public images: { [imageUrl: string]: HTMLImageElement } = {};

  public getImage(url: string): HTMLImageElement {
    return this.images[url];
  }

  public addImageBySrcUrl(url: string): void {
    if (this.images[url]) {
      return;
    }

    const newImage = new Image();
    newImage.src = url;
    this.images[url] = newImage;
  }

  public removeImage(url: string): void {
    delete this.images[url];
  }
}
