import { Asset } from "src/app/game/models/asset.model";
import { ActionEvent } from "../features/interactions/interaction.feature";

export abstract class Action {
  public abstract displayName: string
  public abstract execute(asset: ActionEvent): void
}