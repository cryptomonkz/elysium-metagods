import {Sizes} from "./Sizes"
import {SelectableArea} from "./SelectableArea";

export class TileData {
    public id: string
    public coordinates: Sizes
    public selectableArea: SelectableArea

    constructor(id: string, coordinates: Sizes, selectableArea: SelectableArea) {
        this.id = id
        this.coordinates = coordinates
        this.selectableArea = selectableArea
    }
}