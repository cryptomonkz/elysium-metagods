import {GenericToken} from "../../Models/Token/GenericToken";
import {PreviewItem} from "../../Models/Drag/PreviewItem";

export class DragArea {
    public area: string
    public isPairedArea: boolean

    constructor(area: string, isPairedToken: boolean) {
        this.area = area;
        this.isPairedArea = isPairedToken;
    }
}

export class DragItem extends PreviewItem {
    public sourceArea: DragArea

    constructor(token: GenericToken, sourceArea: DragArea) {
        super(token);
        this.sourceArea = sourceArea;
    }
}