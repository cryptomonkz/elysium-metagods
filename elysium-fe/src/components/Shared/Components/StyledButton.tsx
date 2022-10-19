import {BRIGHTNESS_FILTER, FontSize, fontSizeToPixels, GRADIENT} from "../Constants/StylesConstants";
import {device} from "../Constants/MediaQueries";
import styled from "styled-components";
import {Button, ButtonProps} from "primereact/button";
import {useCallback} from "react";
import {ACTION_SOUND} from "../State/Sound/SoundState";
import {playActionSound} from "../State/Sound/SoundService";

const ButtonWithSound = styled(Button)<{gradient: string}>`
    border: none !important;
    background: ${props => props.gradient};
    
    &:hover, &:focus, &:active, &:enabled:hover, &:enabled:active {
        box-shadow: none;
        background: ${props => props.gradient};
    }
    
    &:hover, &:enabled:hover {
        ${BRIGHTNESS_FILTER}
    }
    
    .p-button-label {
        font-size: ${fontSizeToPixels(FontSize.SMALL)};
    
        @media ${device.tablet} {
            font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
        }
    }
`

interface ButtonWithAdditionalProps extends ButtonProps {
        gradient: string, sound: ACTION_SOUND
}

const StyledButton = ({onClick, sound, ...props}: ButtonWithAdditionalProps) => {
        const onClickWithSound = useCallback((event: any) => {
                !!onClick && onClick(event)
                playActionSound(sound)
        }, [sound, onClick])

        return <ButtonWithSound onClick={onClickWithSound} {...props}/>
}

export const ThemeButton = ({ ...props }) => <StyledButton gradient={GRADIENT.FIRST_THEME}
                                                           sound={ACTION_SOUND.DROP} {...props}/>
export const CancelButton = ({ ...props }) => <StyledButton gradient={GRADIENT.CANCEL}
                                                            sound={ACTION_SOUND.DENY} {...props}/>