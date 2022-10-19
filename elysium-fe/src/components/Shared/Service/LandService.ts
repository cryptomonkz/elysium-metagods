import {LandResponse} from "../Models/Map/LandResponse"
import {HighlightableArea, MapHighlightableArea} from "../Models/Map/MapHighlightableArea"
import {Sizes} from "../Models/Map/Sizes"
import {
    DEFAULT_HIGHLIGHTABLE_AREA_FILL_PROPERTIES,
    DEFAULT_HIGHLIGHTABLE_AREA_TEXT_PROPERTIES
} from "../Constants/StylesConstants";
import {TILES_RESPONSE} from "./TilesResponse";

const HIGHLIGHTABLE_AREAS_RESPONSE: MapHighlightableArea[] = [
    {
        area: HighlightableArea.CELESTIALS,
        path: [new Sizes(-470, -500), new Sizes(-130, -500), new Sizes(-130, -80), new Sizes(-470, -80)],
        highlightText: {
            position: {x: -550, y: -400},
            text: 'CELESTIALS',
            properties: DEFAULT_HIGHLIGHTABLE_AREA_TEXT_PROPERTIES
        },
        fillProperties: {
            ...DEFAULT_HIGHLIGHTABLE_AREA_FILL_PROPERTIES,
            fillRadialGradientEndRadius: 160,
            fillRadialGradientStartPoint: {x: -320, y: -250},
            fillRadialGradientEndPoint: {x: -320, y: -250},
        }
    },
    {
        area: HighlightableArea.THE_GREAT_HALL,
        path: [new Sizes(50, -800), new Sizes(450, -800), new Sizes(450, -450), new Sizes(50, -450)],
        highlightText: {
            position: {x: 400, y: -700},
            text: 'THE GREAT HALL',
            properties: DEFAULT_HIGHLIGHTABLE_AREA_TEXT_PROPERTIES
        },
        fillProperties: {
            ...DEFAULT_HIGHLIGHTABLE_AREA_FILL_PROPERTIES,
            fillRadialGradientStartPoint: {x: 250, y: -600},
            fillRadialGradientEndPoint: {x: 250, y: -600},
        }
    },
    {
        area: HighlightableArea.TOURNAMENTS,
        path: [new Sizes(400, -300), new Sizes(750, -300), new Sizes(750, 100), new Sizes(400, 100)],
        highlightText: {
            position: {x: 675, y: -225},
            text: 'TOURNAMENTS',
            properties: DEFAULT_HIGHLIGHTABLE_AREA_TEXT_PROPERTIES
        },
        fillProperties: {
            ...DEFAULT_HIGHLIGHTABLE_AREA_FILL_PROPERTIES,
            fillRadialGradientStartPoint: {x: 575, y: -100},
            fillRadialGradientEndPoint: {x: 575, y: -100},
        }
    },
    {
        area: HighlightableArea.LOOTBOXES,
        path: [new Sizes(2600, 1850), new Sizes(2800, 1850), new Sizes(2800, 2150), new Sizes(2600, 2150)],
        highlightText: {
            position: {x: 2500, y: 2125},
            text: 'LOOTBOXES',
            properties: DEFAULT_HIGHLIGHTABLE_AREA_TEXT_PROPERTIES
        },
        fillProperties: {
            ...DEFAULT_HIGHLIGHTABLE_AREA_FILL_PROPERTIES,
            fillRadialGradientEndRadius: 100,
            fillRadialGradientStartPoint: {x: 2700, y: 2050},
            fillRadialGradientEndPoint: {x: 2700, y: 2050},
        }
    }
]

export const getLandTiles = async (): Promise<LandResponse> => {
    return new LandResponse(TILES_RESPONSE, HIGHLIGHTABLE_AREAS_RESPONSE)
}