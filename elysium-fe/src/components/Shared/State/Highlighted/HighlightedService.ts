import {SelectableArea} from '../../Models/Map/SelectableArea';
import {ActionEvent, signalAction} from "../ApplicationState";
import HighlightedState from './HighlightedState';
import {isDragging} from "../Drag/DragService";

export const enableGrid = (gridEnabled: boolean) => signalAction('HIGHLIGHT_ENABLED', { gridEnabled })

const sendHighlightSignal = (highlightedArea?: SelectableArea) => signalAction('HIGHLIGHT_ACTION', { highlightedArea })

export const signalHighlight = (highlightedArea?: SelectableArea) => !isDragging() && sendHighlightSignal(highlightedArea)

export const removeHighlight = () => sendHighlightSignal(undefined)

export default function highlightedReducer(state: HighlightedState = { gridEnabled: false }, action: ActionEvent<HighlightedState>): HighlightedState {
    switch (action?.type) {
        case 'HIGHLIGHT_ACTION':
            return {
                ...state,
                highlightedArea: action?.payload?.highlightedArea
            }
        case 'HIGHLIGHT_ENABLED':
            return {
                ...state,
                gridEnabled: !!action?.payload?.gridEnabled
            }
        default:
            return state
    }
}