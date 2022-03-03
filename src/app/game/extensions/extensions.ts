import { GSM } from '../game-state-manager.service';
import { ElevationLayers } from '../models/map';
import { Painter } from '../models/painter';
import { BaseLayerExtension } from './layer-extensions/base-layer/base-layer.extension';
import { FloorLayerExtension } from './layer-extensions/floor-layer/floor-layer.extension';
import { TerrainLayerExtension } from './layer-extensions/terrain-layer/terrain-layer.extension';


export class Extensions {
    public baseLayerExtension = new BaseLayerExtension();
    public floorLayer = new FloorLayerExtension()
    public terrainLayer = new TerrainLayerExtension()
  }


