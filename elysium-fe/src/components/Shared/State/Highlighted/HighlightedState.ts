import { SelectableArea } from "../../Models/Map/SelectableArea"

export default class HighlightedState {
    public gridEnabled: boolean = false
    public highlightedArea?: SelectableArea

    public constructor(gridEnabled: boolean, highlightedArea?: SelectableArea) {
        this.gridEnabled = gridEnabled
        this.highlightedArea = highlightedArea
    }
}