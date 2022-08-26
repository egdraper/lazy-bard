import { Asset } from "src/app/game/models/asset.model";
import { InteractionEvent } from "../interaction.extension";

export abstract class Interaction {
  public abstract displayName: string
  public abstract interact(asset: InteractionEvent): void
}