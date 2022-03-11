import { BaseLayerAddOn } from './extensions/drawable-addons/base-layer/base-layer.addon';
import { MovableItemsAddon } from './extensions/drawable-addons/movable-items/movable-items.addon';
import { TerrainLayerAddOn } from './extensions/drawable-addons/terrain/terrain.addon';


export class Extensions {
    public baseLayerExtension = new BaseLayerAddOn()
    public floorLayerExtension = new MovableItemsAddon()
    public terrainLayerExtension = new TerrainLayerAddOn()

    public async init(): Promise<void> {
      await this.baseLayerExtension.init()
      await this.floorLayerExtension.init()
      await this.terrainLayerExtension.init()
    }
  }


