import { RectangleDefinition } from "../../Models/Map/RectangleDefinition";
import { Sizes } from "../../Models/Map/Sizes";
import { ActionEvent, ApplicationStore, signalAction } from "../ApplicationState";
import DragState from './DragState';

export const getDragState = (): DragState | undefined => ApplicationStore?.getState()?.dragState

export const isDragging = (): boolean => !!getDragState()?.isDragging

export const getStageState = (): RectangleDefinition | undefined => getDragState()?.stageState

export const signalDragging = (isDragging: boolean) => signalAction('DRAGGING', { isDragging })

export const signalStagePositionChange = (stageSize: Sizes, stagePosition: Sizes) => signalAction(
    'STAGE_POSITION_CHANGE', { stageState: new RectangleDefinition(stageSize, stagePosition) }
)

export const signalClientPositionChange = (clientSize: Sizes, clientPosition: Sizes) => signalAction(
    'CLIENT_POSITION_CHANGE', { clientState: new RectangleDefinition(clientSize, clientPosition) }
)

export default function dragReducer(state: DragState = { isDragging: false }, action: ActionEvent<DragState>): DragState {
    switch (action?.type) {
        case 'DRAGGING':
            return {
                ...state,
                isDragging: !!action?.payload?.isDragging
            }
        case 'STAGE_POSITION_CHANGE':
            return {
                ...state,
                stageState: action?.payload?.stageState
            }
        case 'CLIENT_POSITION_CHANGE':
            return {
                ...state,
                clientState: action?.payload?.clientState
            }
        default:
            return state
    }
}