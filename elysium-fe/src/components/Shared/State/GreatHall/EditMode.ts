import {GenericToken} from "../../Models/Token/GenericToken";
import {getEditMode} from "./GreatHallService";
import {isStakedArea, isUnstakedArea} from "./AreaType";
import {DragArea} from "./DragItem";
import {ItemType} from "./ItemType";
import {Color, GRADIENT} from "../../Constants/StylesConstants";

export enum EditMode {
    STAKE = 'STAKE',
    UNSTAKE = 'UNSTAKE',
    EDIT_PAIRING = 'EDIT_PAIRING',
    EDIT_STAKE_MODE = 'EDIT_STAKE_MODE',
    REDEEM = 'REDEEM'
}

const isDragAllowedForToken = (token: GenericToken, area: DragArea, editMode: EditMode): boolean => {
    switch (editMode) {
        case EditMode.STAKE:
            return isUnstakedArea(area)
        case EditMode.UNSTAKE:
            return isStakedArea(area)
        case EditMode.EDIT_PAIRING:
            return token.type === ItemType.WEAPON && isStakedArea(area)
        case EditMode.EDIT_STAKE_MODE:
            return token.type === ItemType.GOD && isStakedArea(area)
        default:
            return false
    }
}

const isDropAllowedForToken = (token: GenericToken, area: DragArea, editMode: EditMode): boolean => {
    switch (editMode) {
        case EditMode.STAKE:
            return isStakedArea(area)
        case EditMode.UNSTAKE:
            return isUnstakedArea(area)
        case EditMode.EDIT_PAIRING:
        case EditMode.EDIT_STAKE_MODE:
            return isStakedArea(area)
        default:
            return false
    }
}

export const doesEditModeAllowDraggingItem = (token: GenericToken, area: DragArea): boolean => {
    const editMode = getEditMode()
    return !!editMode && isDragAllowedForToken(token, area, editMode)
}

export const doesEditModeAllowDroppingItem = (token: GenericToken, source: DragArea, destination: DragArea): boolean => {
    const editMode = getEditMode()
    return !!editMode && source.area !== destination.area && isDropAllowedForToken(token, destination, editMode)
}

export const doesEditModeRequireConfirmation = (editMode?: EditMode): boolean => {
    if (!editMode) {
        return false
    }
    switch (editMode) {
        case EditMode.REDEEM:
            return false
        default:
            return true
    }
}

export const getEditModeDisplayedName = (editMode: EditMode): string => {
    switch (editMode) {
        case EditMode.STAKE:
            return 'STAKE'
        case EditMode.UNSTAKE:
            return 'UNSTAKE'
        case EditMode.EDIT_PAIRING:
            return 'EDIT PAIRING'
        case EditMode.EDIT_STAKE_MODE:
            return 'EDIT STAKE MODE'
        case EditMode.REDEEM:
            return 'CLAIM YIELD'
        default:
            throw new Error('Edit mode has not been defined')
    }
}

export const getEditModeColor = (editMode: EditMode): string => {
    switch (editMode) {
        case EditMode.UNSTAKE:
            return Color.SECOND_THEME_DARK
        default:
            return Color.FIRST_THEME_LIGHT
    }
}

export const getEditModeGradient = (editMode: EditMode): string => {
    switch (editMode) {
        case EditMode.UNSTAKE:
            return GRADIENT.SECOND_THEME
        default:
            return GRADIENT.FIRST_THEME
    }
}