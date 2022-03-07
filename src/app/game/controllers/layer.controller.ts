import { LayerAddOn } from '../extensions/layer-extension';
import { ElevationLayers, Grid } from '../models/map';

export class LayerController {
  public selectedLayer: Grid = null;
  public layerAddOns: LayerAddOn[] = [];

  public registerLayer(layerExtension: LayerAddOn) {
    this.layerAddOns.push(layerExtension);
    this.layerAddOns.sort((a, b) => a.zIndex - b.zIndex);
  }

  public removeLayer(layerName: ElevationLayers) {
    delete this.layerAddOns[layerName];
  }

  public switchLayer(layer: ElevationLayers): void {
    this.selectedLayer = this.layerAddOns[layer];
  }

  public createStaticImageOfLayer(): void {}
}
