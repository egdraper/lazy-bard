import { BackgroundExtension } from "./background/background.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";
import { PlayerCharacterExtension } from "./playable-characters/playable-character.extension";
import { SelectionIndicatorExtension } from "./selection-indicator/selection-indicator.extension";

export class Extensions {
    public backgroundExtension = new BackgroundExtension()
    public gridLineExtension = new GridLineExtension()
    public playableCharacterExtension = new PlayerCharacterExtension()
    public selectionIndicatorExtension = new SelectionIndicatorExtension()
}