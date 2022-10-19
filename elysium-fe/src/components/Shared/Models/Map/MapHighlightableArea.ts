import {Sizes} from "./Sizes"
import {SelectableAreaText} from "./SelectableAreaText";

export enum HighlightableArea {
    CELESTIALS = 'CELESTIALS',
    TOURNAMENTS = 'TOURNAMENTS',
    THE_GREAT_HALL = 'THE GREAT HALL',
    LOOTBOXES = 'LOOTBOXES',
}

export class MapHighlightableArea {
    public path: Sizes[] = []
    public area: HighlightableArea
    public fillProperties: any = {}
    public highlightText?: SelectableAreaText

    public constructor(area: HighlightableArea, path: Sizes[] = [], fillProperties: any ={}, highlightText?: SelectableAreaText) {
        this.area = area
        this.path = path
        this.highlightText = highlightText
        this.fillProperties = fillProperties
    }
}