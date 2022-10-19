import useSound from "use-sound";
import {useSelector} from "react-redux";
import {ApplicationState} from "../State/ApplicationState";
import {getSoundState} from "../State/Sound/SoundService";
import SoundState from "../State/Sound/SoundState";

const useElysiumSound = (soundSource: string) => {
    const soundState = useSelector<ApplicationState, SoundState>(applicationState => getSoundState(applicationState))
    const [play] = useSound(soundSource, { volume: soundState.volume, soundEnabled: soundState.isEnabled })

    return { playSound: play }
}

export default useElysiumSound