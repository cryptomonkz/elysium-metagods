import moment from "moment";
import {ActionEvent, ApplicationState, ApplicationStore, signalAction} from "../ApplicationState";
import SoundState, {
    ACTION_SOUND,
    ActionSoundState,
    BACKGROUND_SOUND,
    BackgroundSoundState,
    getDefaultSoundState, saveSoundStateInStorage,
} from './SoundState';

export const getSoundState = (applicationState?: ApplicationState): SoundState => applicationState?.soundState || getDefaultSoundState()

export const getSoundStateFromState = (): SoundState => getSoundState(ApplicationStore?.getState())

export const signalSoundChange = (isEnabled: boolean) => signalAction('SOUND_ENABLED_CHANGE', { isEnabled })

export const signalVolumeChange = (volume: number) => signalAction('SOUND_VOLUME_CHANGE', { volume })

export const playActionSound = (actionSound: ACTION_SOUND) => signalAction('SOUND_ACTION', { actionSound })

export const playBackgroundSound = (backgroundSound: BACKGROUND_SOUND) => signalAction('SOUND_BACKGROUND', { backgroundSound })

export default function soundReducer(state: SoundState = getDefaultSoundState(), action: ActionEvent<SoundState | ActionSoundState | BackgroundSoundState>): SoundState {
    switch (action?.type) {
        case 'SOUND_ENABLED_CHANGE':
            const isEnabled = !!(action?.payload as SoundState)?.isEnabled
            const newStatusState = {...state, isEnabled}
            saveSoundStateInStorage(newStatusState)
            return newStatusState
        case 'SOUND_VOLUME_CHANGE':
            const volume = (action?.payload as SoundState)?.volume ?? state.volume
            const newVolumeState = {...state, volume}
            saveSoundStateInStorage(newVolumeState)
            return newVolumeState
        case 'SOUND_ACTION':
            return {
                ...state,
                actionSoundState: {
                    ...state?.actionSoundState,
                    currentTimestamp: moment().unix(),
                    actionSound: (action?.payload as ActionSoundState)?.actionSound
                }
            }
        case 'SOUND_BACKGROUND':
            return {
                ...state,
                backgroundSoundState: {
                    ...state?.backgroundSoundState,
                    currentTimestamp: moment().unix(),
                    backgroundSound: (action?.payload as BackgroundSoundState)?.backgroundSound
                }
            }
        default:
            return state
    }
}