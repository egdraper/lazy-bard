import { AddOnBase } from '../extensions/addon-base';
import { ElevationLayers, Grid } from '../models/map';

export class AddOnController {
  public addOns: AddOnBase[] = [];

  public registerAddon(layerExtension: AddOnBase) {
    this.addOns.push(layerExtension);
    this.addOns.sort((a, b) => a.zIndex - b.zIndex);
  }

  public removeAddon(layerName: ElevationLayers) {
    delete this.addOns[layerName];
  }
}
