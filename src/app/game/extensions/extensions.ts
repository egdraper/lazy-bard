import { BackgroundExtension } from "./background/background.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";
import { MovableAssetExtension } from "./movable-asset/movable-asset.extension";
import { SelectionIndicatorExtension } from "./selection-indicator/selection-indicator.extension";
import { TerrainPainterExtension } from "./terrain-painter/terrain-painter.extension";

export class Extensions {
    public backgroundExtension = new BackgroundExtension()
    public gridLineExtension = new GridLineExtension()
    public playableCharacterExtension = new MovableAssetExtension()
    public selectionIndicatorExtension = new SelectionIndicatorExtension()
    public terrainPainterExtension = new TerrainPainterExtension()
}