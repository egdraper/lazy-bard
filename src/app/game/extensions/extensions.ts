import { BaseLayerAddOn } from './addons/baseLayer/base-layer.addon';
import { CharacterLayerAddon } from './addons/movable-item/movable-item.addon';
import { TerrainLayerAddOn } from './addons/terrain/terrain.addon';


export class Extensions {
    public baseLayerExtension = new BaseLayerAddOn();
    public floorLayerExtension = new CharacterLayerAddon()
    public terrainLayerExtension = new TerrainLayerAddOn()

    public init() {
      this.baseLayerExtension.init()
      this.floorLayerExtension.init()
      this.terrainLayerExtension.init()
    }
  }


