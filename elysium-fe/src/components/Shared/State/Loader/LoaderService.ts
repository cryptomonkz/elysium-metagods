import { ActionEvent, signalAction } from "../ApplicationState";
import { default as LoaderState } from './LoaderState';

export const signalDataLoading = (loading: boolean) => signalAction('DATA_LOADING', { dataLoading: loading })
export const signalMapLoading = (loading: boolean) => signalAction('MAP_LOADING', { mapLoading: loading })
export const signalMiniMapLoading = (loading: boolean) => signalAction('MINIMAP_LOADING', { miniMapLoading: loading })

export default function loaderReducer(state: LoaderState = { dataLoading: true, mapLoading: true, miniMapLoading: true }, action: ActionEvent<LoaderState>): LoaderState {
    switch (action?.type) {
        case 'DATA_LOADING':
            return {
                ...state,
                dataLoading: !!action?.payload?.dataLoading
            }
        case 'MAP_LOADING':
            return {
                ...state,
                mapLoading: !!action?.payload?.mapLoading
            }
        case 'MINIMAP_LOADING':
            return {
                ...state,
                miniMapLoading: !!action?.payload?.miniMapLoading
            }
        default:
            return state
    }
}