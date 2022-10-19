import styled from "styled-components";
import {BorderRadius, BRIGHTNESS_FILTER, Color, GRADIENT} from "../Constants/StylesConstants";
import {InputSwitch, InputSwitchChangeParams, InputSwitchProps} from 'primereact/inputswitch';
import {useCallback} from "react";
import {playActionSound} from "../State/Sound/SoundService";
import {ACTION_SOUND} from "../State/Sound/SoundState";

const SwitchWithSound = styled(InputSwitch)`
    flex: 1;
    height: 10px;
    width: 2rem;
    
    .p-inputswitch-slider {
        border-radius: ${BorderRadius.SMALL};
        &::before {
            left: -0.25rem;
            width: 0.9rem;
            height: 0.9rem;
            margin-top: -0.6rem;
            border-radius: ${BorderRadius.SMALL};
            border: 2px solid ${Color.FIRST_THEME_LIGHT} !important;
            background: ${GRADIENT.FIRST_THEME} !important;
        }
        &:focus {
            box-shadow: none;
        }
    }
    
    .p-inputswitch-slider:hover, &.p-inputswitch-checked .p-inputswitch-slider  {
        background: none !important;
    }
    
    .p-inputswitch-slider:hover  {
        background-color: ${Color.FIRST_THEME_LIGHT} !important;
    }
    
    &.p-inputswitch-checked .p-inputswitch-slider {
        background-color: ${Color.FIRST_THEME_DARK} !important;
        &:hover {
            ${BRIGHTNESS_FILTER}
        }
    }
`

const StyledInputSwitch = ({onChange, ...props}: InputSwitchProps) => {
    const onChangeWithSound = useCallback((e: InputSwitchChangeParams) => {
        !!onChange && onChange(e)
        playActionSound(ACTION_SOUND.DROP)
    }, [onChange])

    return <SwitchWithSound onChange={onChangeWithSound} {...props}/>
}

export default StyledInputSwitch