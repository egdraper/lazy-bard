import { BackgroundExtension } from "./background/background.extension";
import { GridLineExtension } from "./grid-lines/grid-lines.extension";

export class Extensions {
    public backgroundExtension = new BackgroundExtension()
    public gridLineExtension = new GridLineExtension()
}