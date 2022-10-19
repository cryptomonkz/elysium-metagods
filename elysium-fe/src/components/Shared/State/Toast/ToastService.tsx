import {ActionEvent, signalAction} from "../ApplicationState";
import ToastState, {ToastMessage} from './ToastState';
import {playActionSound} from "../Sound/SoundService";
import {ACTION_SOUND} from "../Sound/SoundState";

export const showToast = (toastMessage: ToastMessage, actionSound: ACTION_SOUND = ACTION_SOUND.NOTIFICATION) => {
    playActionSound(actionSound)
    signalAction('SHOW_TOAST', { toastMessage })
}

export default function toastReducer(state: ToastState = {}, action: ActionEvent<ToastState>): ToastState {
    switch (action?.type) {
        case 'SHOW_TOAST':
            return {
                ...state,
                toastMessage: action?.payload?.toastMessage
            }
        default:
            return state
    }
}