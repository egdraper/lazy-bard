import { GSM } from "../../game-state-manager.service";
import { GeneralAction } from "../../models/settings";
import { BaseTerrainGenerator } from "./base-terrain.generator";

class TerrainGenerateInfo {
  terrainId: string
  backgroundId: string
}

export class TerrainGeneratorExtension {
  constructor() {
    GSM.EventController.generalActionFire.subscribe(this.onGenerateTerrain.bind(this))
  }

  public onGenerateTerrain(generateInfo: GeneralAction<TerrainGenerateInfo>): void {
    
    const generator = new BaseTerrainGenerator()
    generator.autoPopulateForegroundTerrain(generateInfo.data.terrainId)
  }
}