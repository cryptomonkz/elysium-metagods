import { MapHighlightableArea } from "./MapHighlightableArea"
import { MapSelectableTile } from "./MapSelectableTile"

export class LandResponse {
    public selectableTiles: MapSelectableTile[] = []
    public highlightableAreas: MapHighlightableArea[] = []

    public constructor(selectableTiles: MapSelectableTile[] = [], highlightableAreas: MapHighlightableArea[] = []) {
        this.selectableTiles = selectableTiles
        this.highlightableAreas = highlightableAreas
    }
}