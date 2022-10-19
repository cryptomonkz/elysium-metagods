import {removeHighlight} from "../State/Highlighted/HighlightedService"
import {Sizes} from "../Models/Map/Sizes";

export const MAIN_STAGE_INITIAL_POSITION: Sizes = new Sizes(110, -250)
export const DEFAULT_MAIN_STAGE_OFF_SCREEN_VISIBILITY = 1

export const STAGE_WITH_HIGHLIGHT_HANDLERS = { onMouseLeave: removeHighlight }

