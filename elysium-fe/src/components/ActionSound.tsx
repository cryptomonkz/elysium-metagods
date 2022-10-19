import {ApplicationState} from "./Shared/State/ApplicationState";
import {ACTION_SOUND, ActionSoundState} from "./Shared/State/Sound/SoundState";
import {getSoundState} from "./Shared/State/Sound/SoundService";
import {useSelector} from "react-redux";
import useElysiumSound from "./Shared/Hooks/SoundHook";
import AcceptHighSound from "../assets/Sounds/acceptHigh.wav";
import DenySound from "../assets/Sounds/deny.wav";
import DropSound from "../assets/Sounds/drop.wav";
import MoneySound from "../assets/Sounds/money.wav";
import NotificationSound from "../assets/Sounds/notification.wav";
import {useEffect} from "react";

const ActionSound = () => {
    const soundState = useSelector<ApplicationState, ActionSoundState | undefined>(applicationState => (
        getSoundState(applicationState)?.actionSoundState
    ))

    const playAcceptHighSound = useElysiumSound(AcceptHighSound).playSound
    const playDenySound = useElysiumSound(DenySound).playSound
    const playDropSound = useElysiumSound(DropSound).playSound
    const playMoneySound = useElysiumSound(MoneySound).playSound
    const playNotificationSound = useElysiumSound(NotificationSound).playSound

    useEffect(() => {
        switch (soundState?.actionSound) {
            case ACTION_SOUND.ACCEPT_HIGH:
                playAcceptHighSound()
                break
            case ACTION_SOUND.DENY:
                playDenySound()
                break
            case ACTION_SOUND.DROP:
                playDropSound()
                break
            case ACTION_SOUND.MONEY:
                playMoneySound()
                break
            case ACTION_SOUND.NOTIFICATION:
                playNotificationSound()
                break
        }
    }, [soundState, playAcceptHighSound, playDenySound, playDropSound, playMoneySound, playNotificationSound])

    return <></>
}

export default ActionSound