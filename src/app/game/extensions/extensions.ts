import { BackgroundExtension } from "./background/background.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";
import { PlayerCharacterExtension } from "./playable-characters/playable-character.extension";

export class Extensions {
    public backgroundExtension = new BackgroundExtension()
    public gridLineExtension = new GridLineExtension()
    public playableCharacterExtension = new PlayerCharacterExtension()
}