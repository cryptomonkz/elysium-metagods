import {getAbsolutePosition} from "../Utils/StylesUtils";

export enum FontSize {
    TINY = 5, SMALL = 10, MORE_THAN_SMALL = 11, SMALLER = 13, SMALL_TO_MEDIUM = 15, ALMOST_MEDIUM = 16,
    MEDIUM = 20, MEDIUM_TO_LARGE = 25, LARGE = 30, EXTRA_LARGE = 50, LARGE_TO_HUGE = 65, HUGE = 80
}

export const fontSizeToPixels = (fontSize: FontSize): string => `${fontSize}px`

export enum Spacing {
    TINY = '0.2rem', FIRST = '.25rem', SECOND = '.5rem', SECOND_HALF = '.75rem', ALMOST_THIRD = '.8rem', THIRD = '1rem', THIRD_HALF = '1.25rem', FOURTH = '1.5rem', FIFTH = '3rem'
}

export enum Color {
    WHITE = 'rgb(255, 255, 255, 1)',
    METALLIC = 'rgb(237, 234, 232, 1)',
    BLACK = 'rgb(0, 0, 0, 1)',
    RED = 'rgb(255, 0, 0, 1)',
    SILVER = 'rgb(192, 192, 192, 1)',
    LIGHT_RED = 'rgb(214, 14, 51)',
    YELLOW = 'rgb(197, 152, 59)',
    LIGHT_GOLDEN = 'rgb(246, 228, 142)',
    DARK_GOLDEN = 'rgb(127, 96, 42)',
    GOLDEN_ROD = 'rgb(218, 165, 32)',
    DARK_RED = 'rgb(98, 9, 29)',
    DARK_GREY = 'rgb(169, 169, 169, 1)',
    GREEN_DARK = 'rgba(40, 144, 81, 1)',
    GREEN_SHINY = 'rgba(0, 186, 73, 1)',
    BACKGROUND_DARK = 'rgb(61, 61, 73)',
    BACKGROUND_PROGRESS_BAR = '#001329',
    BACKGROUND_DARKER = 'rgb(97, 101, 112)',
    BACKGROUND_LIGHT = 'rgb(23, 21, 37)',
    BACKGROUND_LIGHTER = 'rgba(32, 30, 47, 1)',
    BACKGROUND_MINT_PASS = 'rgb(191, 189, 194)',
    BACKGROUND_BOX_IMAGE = 'rgb(163, 163, 163)',
    BACKGROUND_BOX_IMAGE_SHADOW = 'rgb(69, 69, 69, 0.75)',
    BACKGROUND_BOX_DETAILS = 'rgb(55, 55, 55, 0.85)',
    BACKGROUND_GREY = 'rgb(64, 69, 73)',
    BACKGROUND_GREY_DARKER = 'rgb(35, 35, 35)',
    FIRST_THEME_LIGHT = 'rgb(54, 178, 83)',
    FIRST_THEME_DARK = 'rgb(57, 142, 120)',
    SECOND_THEME_LIGHT = 'rgb(250, 122, 23)',
    SECOND_THEME_DARK = 'rgb(171, 52, 10)',
    THIRD_THEME_DARK = 'rgb(2, 8, 39)',
    TRANSPARENT_BLACK = 'rgba(0, 0, 0, 0.5)',
    TRANSPARENT_LIGHT_BLACK = 'rgba(0, 0, 0, 0.3)',
    TRANSPARENT_THEME_LIGHT = 'rgba(40, 144, 81, 0.5)',
    TRANSPARENT_THEME_DARK = 'rgba(40, 144, 81, 0.35)',
    TRANSPARENT_GREY = 'rgba(255, 255, 255, 0.4)',
    TRANSPARENT_LIGHT_GREY = 'rgba(255, 255, 255, 0.2)',
    TRANSPARENT_DARKENED_GREY = 'rgba(195, 195, 195, 0.14)',
    TRANSPARENT_WHITE = 'rgba(255, 255, 255, 0.5)',
    TRANSPARENT_RED = 'rgba(255, 0, 0, 0.5)',
    TRANSPARENT = 'rgba(0, 0, 0, 0)',
    PURIFICATION_TRAIT_COLOR = '#08e434',
    CHAOS_TRAIT_COLOR = '#f91034',
    AURORA_TRAIT_COLOR = '#eae364',
    CONJUNCTION_TRAIT_COLOR = '#a69999',
    REFLECTION_TRAIT_COLOR = '#49aede',
    ASTRAL_TRAIT_COLOR = '#fdaaf0',
    AGNO_TRAIT_COLOR = '#a7e2dc',
}

export const GRADIENT = {
    FIRST_THEME: `linear-gradient(to right, ${Color.FIRST_THEME_DARK}, ${Color.FIRST_THEME_LIGHT})`,
    SECOND_THEME: `linear-gradient(to right, ${Color.SECOND_THEME_LIGHT}, ${Color.SECOND_THEME_DARK})`,
    CANCEL: `linear-gradient(to right, ${Color.LIGHT_RED}, ${Color.DARK_RED})`,
    GOLDEN_TEXT: `linear-gradient(45deg, ${Color.LIGHT_GOLDEN}, ${Color.DARK_GOLDEN})`,
    ITEM_GRADIENT: `radial-gradient(farthest-corner, ${Color.BACKGROUND_BOX_IMAGE} 0, ${Color.BACKGROUND_BOX_IMAGE_SHADOW} 100%)`,
}

export const BOX_SHADOW_STYLE = {
    BACKGROUND: `0 0 4px 8px ${Color.BACKGROUND_LIGHT}`,
    LIGHT_BACKGROUND: `0 0 4px 11px ${Color.BACKGROUND_LIGHTER}`,
    THEME_HIGHLIGHT: `0px 0px 0px 2px ${Color.FIRST_THEME_LIGHT}`,
    TOKEN_HIGHLIGHT: `inset 0 0 10px 5px ${Color.TRANSPARENT_WHITE}`,
    DROPPABLE_AREA_HIGHLIGHT: `inset 0 0 10px 10px ${Color.TRANSPARENT_WHITE}`,
    PAIRED_TOKEN_HIGHLIGHT: `0px 0px 5px 2px ${Color.TRANSPARENT_RED}`,
    TOKEN_TRAIT_SHADOW_PREFIX: 'inset 0px 0px 5px 1px',
    MINT_PASS: `inset 0 0 5px 4px ${Color.BACKGROUND_MINT_PASS}`,
    ROULETTE_LEFT: `inset 20px 0 20px 0 ${Color.TRANSPARENT_GREY}`,
    ROULETTE_RIGHT: `inset -20px 0 20px 0 ${Color.TRANSPARENT_GREY}`,
}

export const BOX_SHADOW = {
    BACKGROUND_SHADOW: `box-shadow: ${BOX_SHADOW_STYLE.BACKGROUND}, inset ${BOX_SHADOW_STYLE.BACKGROUND};`,
    LIGHT_BACKGROUND_SHADOW: `box-shadow: ${BOX_SHADOW_STYLE.LIGHT_BACKGROUND}, inset ${BOX_SHADOW_STYLE.LIGHT_BACKGROUND};`,
    INSET_BACKGROUND: `box-shadow: inset ${BOX_SHADOW_STYLE.BACKGROUND};`,
    THEME_HIGHLIGHT: `box-shadow: ${BOX_SHADOW_STYLE.THEME_HIGHLIGHT};`,
    INSET_MINT_PASS_SHADOW: `box-shadow: ${BOX_SHADOW_STYLE.MINT_PASS};`,
    INSET_ROULETTE: `box-shadow: ${BOX_SHADOW_STYLE.ROULETTE_LEFT}, ${BOX_SHADOW_STYLE.ROULETTE_RIGHT};`,
}

export enum FontWeight {
    SMALL = 100, MEDIUM = 300, LARGE = 500, EXTRA_LARGE = 700
}

export enum FontStyle {
    NORMAL = 'normal', BOLD = 'bold', BOLDER = 'bolder'
}

export enum FontFamily {
    INDER = 'Inder', HU_THE_GAME = 'HuTheGame'
}

export enum Z_INDEX {
    RELATIVE_FIRST = '1', RELATIVE_SECOND = '2',
    MAP = '5', OVER_MAP = '10', LOADER = '15', DRAG_PREVIEW = '100'
}

export enum AbsoluteBorderRadius {
    TINY = '3px', SMALL = '10px', MEDIUM = '20px', LARGE = '30px'
}

export enum BorderRadius {
    SMALL = '10%', MEDIUM = '50%', LARGE = '75%'
}

export const BRIGHTNESS_FILTER = 'filter: brightness(0.85);'

export const FLEX_CENTERED_CONTAINER = `
  display: flex;
  align-items: center;
  justify-content: center;
`

export const OverflowYContainer = `
    overflow-y: auto;
    overflow-x: hidden;
`

export const TEXT_WITH_ELLIPSIS = `
    max-width: 100%;
    overflow: hidden;
    text-align: start;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export const ALL_POINTER_EVENTS = 'pointer-events: all;'
export const NO_POINTER_EVENTS = 'pointer-events: none;'
export const NO_USER_SELECT = 'user-select: none;'
export const NOT_SELECTABLE_AREA = `${NO_POINTER_EVENTS}${NO_USER_SELECT}`

export const FULL_WIDTH = 'width: 100%;'
export const FULL_HEIGHT = 'height: 100%;'
export const FULL_SIZE = `${FULL_WIDTH}${FULL_HEIGHT}`
export const FULL_SIZE_ABSOLUTE_POSITION = getAbsolutePosition(0, 0, 0, 0)
export const FULL_SIZE_CENTERED = `
    transform: translate(-50%, -50%);
    ${getAbsolutePosition('50%', undefined, undefined, '50%')}
`
export const DEFAULT_BUTTON_HEIGHT = `
    max-height: ${Spacing.FOURTH} !important;
    min-height: ${Spacing.FOURTH} !important;
`
export const DEFAULT_BUTTON_WIDTH = `
    max-width: ${Spacing.FOURTH} !important;
    min-width: ${Spacing.FOURTH} !important;
`
export const DEFAULT_BUTTON_SIZE = `
    ${DEFAULT_BUTTON_WIDTH}
    ${DEFAULT_BUTTON_HEIGHT}
`
export const DEFAULT_HIGHLIGHT_PROPERTIES = { fill: Color.TRANSPARENT_LIGHT_BLACK }

export const DEFAULT_HIGHLIGHTABLE_AREA_FILL_PROPERTIES = {
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndRadius: 200,
    fillRadialGradientColorStops: [0, Color.TRANSPARENT_THEME_LIGHT, 0.35, Color.TRANSPARENT_THEME_DARK, 1, Color.TRANSPARENT]
}
export const DEFAULT_HIGHLIGHTABLE_AREA_TEXT_PROPERTIES = {
    fontSize: FontSize.LARGE,
    fill: Color.WHITE,
    fontStyle: FontStyle.NORMAL,
    fontFamily: FontFamily.HU_THE_GAME
}

export const MINIMAP_STROKE_WIDTH = 0.7
export const MINIMAP_STROKE_COLOR = Color.WHITE

