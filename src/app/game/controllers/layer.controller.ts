import { LayerExtension } from '../extensions/layer-extension';
import { ElevationLayers, Grid } from '../models/map';

export class LayerController {
  public selectedLayer: Grid = null;
  public layers: LayerExtension[] = [];

  public registerLayer(layerExtension: LayerExtension) {
    this.layers.push(layerExtension);
    this.layers.sort((a, b) => a.zIndex - b.zIndex);
  }

  public removeLayer(layerName: ElevationLayers) {
    delete this.layers[layerName];
  }

  public switchLayer(layer: ElevationLayers): void {
    this.selectedLayer = this.layers[layer];
  }

  public createStaticImageOfLayer(): void {}
}
