import {ZOOM_TIMEOUT} from "../Constants/TimeoutConstants";
import {
    AbsoluteBorderRadius,
    BorderRadius,
    BOX_SHADOW_STYLE,
    BRIGHTNESS_FILTER,
    Color,
    GRADIENT
} from "../Constants/StylesConstants";
import styled from "styled-components";
import {Slider, SliderProps} from "@mui/material";
import {useCallback} from "react";
import {playActionSound} from "../State/Sound/SoundService";
import {ACTION_SOUND} from "../State/Sound/SoundState";

const getTransition = (property: string) => `${property} ${ZOOM_TIMEOUT}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`

const TrackTransition = `
    transition: ${getTransition('left')},
                ${getTransition('width')},
                ${getTransition('bottom')},
                ${getTransition('height')};
`

const ThumbTransition = `
    transition: ${getTransition('box-shadow')},
                ${getTransition('left')},
                ${getTransition('bottom')};
`

const SliderWithSound = styled(Slider)`
    flex: 1;
    
    .MuiSlider-thumb {
        width: 0.9rem;
        height: 0.9rem;
        ${ThumbTransition}
        border-radius: ${BorderRadius.SMALL};
        border: 2px solid ${Color.FIRST_THEME_LIGHT} !important;
        box-shadow: none !important;
        &:hover, &:focus {
            box-shadow: ${BOX_SHADOW_STYLE.THEME_HIGHLIGHT} !important;
        }
    }
    
    .MuiSlider-thumb, .MuiSlider-thumb:hover {
        background: none !important;
        background: ${GRADIENT.FIRST_THEME} !important;
        border-color: ${Color.FIRST_THEME_LIGHT} !important;
    }
    
    .MuiSlider-track, .MuiSlider-rail {
        border-radius: ${AbsoluteBorderRadius.MEDIUM};
    }
    
    .MuiSlider-track {
        ${TrackTransition}
        color: ${Color.FIRST_THEME_DARK};
    }
    
    .MuiSlider-rail {
        opacity: 0.8;
        color: ${Color.WHITE};
    }
    
    &:hover {
        .MuiSlider-rail {
            ${BRIGHTNESS_FILTER}
        }
    }
`

const StyledSlider = ({onChangeCommitted, ...props}: SliderProps) => {
    const onChangeWithSound = useCallback((changeEvent: any, level: number | number[]) => {
        !!onChangeCommitted && onChangeCommitted(changeEvent, level)
        playActionSound(ACTION_SOUND.DROP)
    }, [onChangeCommitted])

    return <SliderWithSound onChangeCommitted={onChangeWithSound} {...props}/>
}

export default StyledSlider