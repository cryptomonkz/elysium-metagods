import {ApplicationState} from "../../../../Shared/State/ApplicationState";
import SoundState from "../../../../Shared/State/Sound/SoundState";
import {getSoundState, signalSoundChange, signalVolumeChange} from "../../../../Shared/State/Sound/SoundService";
import styled from "styled-components";
import {FLEX_CENTERED_CONTAINER, Spacing} from "../../../../Shared/Constants/StylesConstants";
import {useSelector} from "react-redux";
import StyledSlider from "../../../../Shared/Components/StyledSlider";
import {useCallback, useState} from "react";
import {CancelButton, ThemeButton} from "../../../../Shared/Components/StyledButton";

const VolumeContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    justify-content: flex-start;
`

const VolumeSlider = styled(StyledSlider)`
    margin-left: ${Spacing.FOURTH}
`

const Volume = () => {
    const soundState = useSelector<ApplicationState, SoundState>(applicationState => getSoundState(applicationState))

    const [volumeLevel, setVolumeLevel] = useState(() => soundState.volume)

    const toggleSound = useCallback(() => signalSoundChange(!soundState.isEnabled), [soundState])

    return <VolumeContainer>
        {soundState.isEnabled ? <ThemeButton
            icon={'pi pi-volume-up'} onClick={toggleSound}/> : <CancelButton
            icon={'pi pi-volume-off'} onClick={toggleSound}/>}
        <VolumeSlider
            value={volumeLevel}
            onChange={(changeEvent: any, level: number | number[]) => setVolumeLevel(level as number)}
            onChangeCommitted={(changeEvent: any, level: number | number[]) => signalVolumeChange(level as number)}
            step={0.01} min={0} max={1}/>
    </VolumeContainer>
}

export default Volume