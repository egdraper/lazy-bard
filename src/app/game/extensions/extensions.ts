import { BaseLayerAddOn } from './add-on-layer-extensions/base-layer/base-layer.extension';
import { FloorLayerAddOn } from './add-on-layer-extensions/floor-layer/floor-layer.extension';
import { TerrainLayerAddOn } from './add-on-layer-extensions/terrain-layer/terrain-layer.addon';


export class Extensions {
    public baseLayerExtension = new BaseLayerAddOn();
    public floorLayerExtension = new FloorLayerAddOn()
    public terrainLayerExtension = new TerrainLayerAddOn()

    public init() {
      this.baseLayerExtension.init()
      this.floorLayerExtension.init()
      this.terrainLayerExtension.init()
    }
  }


