import {ApplicationState} from "./Shared/State/ApplicationState";
import SoundState, {BACKGROUND_SOUND} from "./Shared/State/Sound/SoundState";
import {getSoundState, getSoundStateFromState} from "./Shared/State/Sound/SoundService";
import {useSelector} from "react-redux";
import DefaultBackgroundSound from "../assets/Sounds/defaultBackground.mp3";
import TournamentsBackgroundSound from "../assets/Sounds/tournamentsBackground.mp3";
import {useCallback, useEffect, useState} from "react";

const getBackgroundSource = (backgroundSound: BACKGROUND_SOUND) => {
    switch (backgroundSound) {
        case BACKGROUND_SOUND.DEFAULT:
            return DefaultBackgroundSound
        case BACKGROUND_SOUND.TOURNAMENTS:
            return TournamentsBackgroundSound
        default:
            throw new Error("Background sound has not been defined.")
    }
}

const setAudioProperties = (audio: HTMLAudioElement, soundState: SoundState) => {
    audio.loop = true;
    audio.volume = soundState.volume
    audio.muted = !soundState.isEnabled
}

const BackgroundSound = () => {
    const backgroundSound = useSelector<ApplicationState, BACKGROUND_SOUND | undefined>(applicationState => (
        getSoundState(applicationState)?.backgroundSoundState?.backgroundSound
    ))
    const soundState = useSelector<ApplicationState, SoundState>(applicationState => getSoundState(applicationState))
    const [audio, setAudio] = useState<HTMLAudioElement | undefined>();

    const createNewAudio = useCallback((sound: BACKGROUND_SOUND) => {
        const audio = new Audio(getBackgroundSource(sound))
        setAudioProperties(audio, getSoundStateFromState())
        setAudio(previous => {
            !!previous && previous?.pause();
            return audio
        })
    }, [])

    useEffect(() => {
        !!backgroundSound && createNewAudio(backgroundSound)
    }, [backgroundSound, createNewAudio])

    useEffect(() => {
        !!audio && audio.play()
    }, [audio])

    useEffect(() => {
        !!audio && setAudioProperties(audio, soundState)
    }, [audio, soundState])

    return <></>
}

export default BackgroundSound