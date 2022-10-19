import {Color, FontSize, fontSizeToPixels, Spacing} from "../Constants/StylesConstants";
import {Checkbox, CheckboxChangeParams, CheckboxProps} from 'primereact/checkbox';
import styled from "styled-components";
import {useCallback} from "react";
import {playActionSound} from "../State/Sound/SoundService";
import {ACTION_SOUND} from "../State/Sound/SoundState";

const CheckboxWithSound = styled(Checkbox)<{color: string, gradient: string}>`
    .p-checkbox-box {
        background-color: ${Color.BACKGROUND_DARK};
        border-color: ${props => props.color};
        &:hover, &.p-highlight, &.p-highlight:hover {
            border-color: ${props => props.color} !important;
            background: none !important;
        }
        &.p-highlight, &.p-highlight:hover {
            background:  ${props => props.gradient} !important;
        }
        &.p-focus {
            border-color: ${props => props.color} !important;
            box-shadow: none !important;
        }
    }
`

export const CheckboxLabel = styled.label`
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
    margin-left: ${Spacing.FIRST};
`

interface CheckboxWithAdditionalProps extends CheckboxProps {
    color: string, gradient: string
}
const StyledCheckbox = ({onChange, ...props}: CheckboxWithAdditionalProps) => {
    const onChangeWithSound = useCallback((e: CheckboxChangeParams) => {
        !!onChange && onChange(e)
        playActionSound(ACTION_SOUND.DROP)
    }, [onChange])

    return <CheckboxWithSound onChange={onChangeWithSound} {...props}/>
}

export default StyledCheckbox