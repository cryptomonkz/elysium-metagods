import { HighlightableArea } from "../../Models/Map/MapHighlightableArea"

export default class OpenedInterfaceState {
    public openedHighlightableArea?: HighlightableArea

    public constructor(openedHighlightableArea?: HighlightableArea) {
        this.openedHighlightableArea = openedHighlightableArea
    }
}