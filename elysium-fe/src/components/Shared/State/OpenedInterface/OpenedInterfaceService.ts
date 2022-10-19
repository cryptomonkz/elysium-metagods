import { HighlightableArea } from "../../Models/Map/MapHighlightableArea";
import { ActionEvent, signalAction } from "../ApplicationState";
import OpenedInterfaceState from "./OpenedInterfaceState";

export const signalOpenHighlightableArea = (openedHighlightableArea?: HighlightableArea) => signalAction(
    'HIGHLIGHTABLE_AREA_CHANGE', { openedHighlightableArea }
)

export const closeHighlightableArea = () => signalOpenHighlightableArea(undefined)

export default function openedInterfaceReducer(state: OpenedInterfaceState = {}, action: ActionEvent<OpenedInterfaceState>): OpenedInterfaceState {
    switch (action?.type) {
        case 'HIGHLIGHTABLE_AREA_CHANGE':
            return {
                ...state,
                openedHighlightableArea: action?.payload?.openedHighlightableArea
            }
        default:
            return state
    }
}