import { Sizes } from "../../Models/Map/Sizes";
import { ActionEvent, signalAction } from "../ApplicationState";
import MiniMapPositionState from "./MiniMapPositionState";

export const signalMiniMapPositionChange = (position?: Sizes) => signalAction('MINIMAP_POSITION_CHANGE', { position })

export default function miniMapPositionReducer(state: MiniMapPositionState = {}, action: ActionEvent<MiniMapPositionState>): MiniMapPositionState {
    switch (action?.type) {
        case 'MINIMAP_POSITION_CHANGE':
            return {
                ...state,
                position: action?.payload?.position
            }
        default:
            return state
    }
}