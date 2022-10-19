import GreatHallDataState from "./GreatHallDataState";
import {GenericToken} from "../../Models/Token/GenericToken";
import {ApplicationState} from "../ApplicationState";
import {DragArea, DragItem} from "./DragItem";
import {getTokenSafeRemovalArea} from "./ItemType";
import {buildPairedArea, doesAreaRequirePairedTokenRemoval, getDragArea} from "./AreaType";
import {getDataStateFromState, signalEditChange} from "./GreatHallService";

const getAreaState = (area: string, state?: GreatHallDataState): Map<number, GenericToken> => {
    const currentAreaState = state?.[area] || new Map<number, GenericToken>()
    return currentAreaState as Map<number, GenericToken>
}

const getPairedAreaState = (area: string, state?: GreatHallDataState): GenericToken | undefined => {
    return state?.[area] as GenericToken
}

const removePairedTokenFromArea = (state: GreatHallDataState, area: string): GreatHallDataState => {
    delete state[area]
    return state
}

const addPairedTokenToArea = (state: GreatHallDataState, token: GenericToken, area: string): GreatHallDataState => ({
    ...state, [area]: token
})

const removeTokenFromArea = (state: GreatHallDataState, token: GenericToken, area: string): GreatHallDataState => {
    const areaState = getAreaState(area, state)
    areaState.delete(token.tokenId)
    return {...state, [area]: areaState}
}

const addTokenToArea = (state: GreatHallDataState, token: GenericToken, area: string): GreatHallDataState => {
    const areaState = getAreaState(area, state)
    areaState.set(token.tokenId, token)
    return {...state, [area]: areaState}
}

const unpairToken = (state: GreatHallDataState, token: GenericToken, moveFrom: DragArea, moveTo: DragArea): GreatHallDataState => {
    signalEditChange(token, moveFrom, moveTo, true)
    return addTokenToArea(removePairedTokenFromArea(state, moveFrom.area), token, moveTo.area)
}

const safeRemovePairedToken = (state: GreatHallDataState, moveFrom: string): GreatHallDataState => {
    const pairedToken = getPairedAreaState(moveFrom, state)
    return pairedToken ? unpairToken(state, pairedToken, getDragArea(moveFrom), getDragArea(getTokenSafeRemovalArea(pairedToken.type))) : state
}

const movePairedToken = (state: GreatHallDataState, token: GenericToken, withTokenRemoval: boolean): GreatHallDataState => {
    return !withTokenRemoval ? state : safeRemovePairedToken(state, buildPairedArea(token))
}

const removeFromArea = (state: GreatHallDataState, token: GenericToken, area: DragArea, withTokenRemoval: boolean): GreatHallDataState => {
    if (area.isPairedArea) {
        return removePairedTokenFromArea(state, area.area)
    } else {
        const withPairRemoval = movePairedToken(state, token, withTokenRemoval)
        return removeTokenFromArea(withPairRemoval, token, area.area)
    }
}

const addToArea = (state: GreatHallDataState, token: GenericToken, area: DragArea): GreatHallDataState => {
    if (area.isPairedArea) {
        const withPairRemoval = safeRemovePairedToken(state, area.area)
        return addPairedTokenToArea(withPairRemoval, token, area.area)
    } else {
        return addTokenToArea(state, token, area.area)
    }
}

export const computeStateAfterDrop = (state: GreatHallDataState, item: DragItem, destination: DragArea): GreatHallDataState => {
    signalEditChange(item.token, item.sourceArea, destination, false)
    const withPairedTokenRemoval = doesAreaRequirePairedTokenRemoval(destination.area)
    const afterRemoveFromSource = removeFromArea(state, item.token, item.sourceArea, withPairedTokenRemoval)
    return addToArea(afterRemoveFromSource, item.token, destination)
}

export const getAreaStateFromApplication = (area: string, applicationState?: ApplicationState): GenericToken[] => {
    return Array.from(getAreaState(area, getDataStateFromState(applicationState)).values())
}

export const getPairedAreaStateFromApplication = (area: string, applicationState?: ApplicationState): GenericToken | undefined => {
    return getPairedAreaState(area, getDataStateFromState(applicationState))
}