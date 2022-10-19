export const SOUND_STATE_STORAGE = "SOUND_STATE"

export enum BACKGROUND_SOUND {
    DEFAULT = 'DEFAULT',
    TOURNAMENTS = 'TOURNAMENTS'
}

export enum ACTION_SOUND {
    ACCEPT_HIGH = 'ACCEPT_HIGH',
    DENY = 'DENY',
    DROP = 'DROP',
    MONEY = 'MONEY',
    NOTIFICATION = 'NOTIFICATION',
}

export class SoundStateWithTimestamp {
    currentTimestamp: number

    constructor(currentTimestamp: number) {
        this.currentTimestamp = currentTimestamp;
    }
}

export class ActionSoundState extends SoundStateWithTimestamp {
    actionSound: ACTION_SOUND

    constructor(currentTimestamp: number, actionSound: ACTION_SOUND) {
        super(currentTimestamp);
        this.actionSound = actionSound;
    }
}

export class BackgroundSoundState extends SoundStateWithTimestamp {
    backgroundSound: BACKGROUND_SOUND

    constructor(currentTimestamp: number, backgroundSound: BACKGROUND_SOUND) {
        super(currentTimestamp);
        this.backgroundSound = backgroundSound;
    }
}

export default class SoundState {
    public volume: number
    public isEnabled: boolean
    public actionSoundState?: ActionSoundState
    public backgroundSoundState?: BackgroundSoundState

    constructor(volume: number, isEnabled: boolean, actionSoundState: ActionSoundState, backgroundSoundState: BackgroundSoundState) {
        this.volume = volume;
        this.isEnabled = isEnabled;
        this.actionSoundState = actionSoundState;
        this.backgroundSoundState = backgroundSoundState;
    }
}

const getInitialSoundState = (): SoundState => ({isEnabled: true, volume: 0.5})

export const getDefaultSoundState = (): SoundState => {
    const soundStateFromStorage = localStorage.getItem(SOUND_STATE_STORAGE)
    return soundStateFromStorage ? JSON.parse(soundStateFromStorage) : getInitialSoundState()
}

export const saveSoundStateInStorage = (soundState: SoundState) => {
    localStorage.setItem(SOUND_STATE_STORAGE, JSON.stringify({isEnabled: soundState.isEnabled, volume: soundState.volume}))
}