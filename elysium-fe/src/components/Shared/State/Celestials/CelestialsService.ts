import CelestialsState, {getDefaultCelestialsState} from "./CelestialsState";
import {ActionEvent, ApplicationState, signalAction} from "../ApplicationState";
import {getCelestialsData} from "../../Service/AggregationService";

export const signalCelestialsState = (celestialsState: CelestialsState) => signalAction('SET_CELESTIALS_STATE', celestialsState)

export const refreshCelestialsState = (account: string) => getCelestialsData(account).then(signalCelestialsState)

export const getCelestialsStateFromApplication = (applicationState: ApplicationState): CelestialsState => applicationState?.celestialsState || getDefaultCelestialsState()

export default function celestialsReducer(
    state: CelestialsState = getDefaultCelestialsState(),
    action: ActionEvent<CelestialsState>): CelestialsState {
    switch (action?.type) {
        case 'SET_CELESTIALS_STATE':
            const celestialsState = action.payload as CelestialsState || getDefaultCelestialsState()
            return {...state, ...celestialsState}
        default:
            return state
    }
}