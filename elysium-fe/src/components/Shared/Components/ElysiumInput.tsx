import {Color, Spacing} from "../Constants/StylesConstants";
import {InputNumber} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import styled from "styled-components";

const MARGIN_STYLE = `margin: ${Spacing.SECOND};`

const DEFAULT_STYLE = `
    background: none;
    color: ${Color.WHITE};
`

const FOCUS_STYLE = `:focus {
    box-shadow: none !important;
    border-color: ${Color.WHITE} !important;
}`

const HOVER_STYLE = `:hover {
    border-color: ${Color.WHITE} !important;
}`

export const ElysiumNumberInput = styled(InputNumber)`
    ${MARGIN_STYLE}
    .p-inputnumber-input {
        ${DEFAULT_STYLE}
    }
    .p-inputnumber-input${FOCUS_STYLE}
    .p-inputnumber-input${HOVER_STYLE}
`

export const ElysiumTextInput = styled(InputText)`
    ${MARGIN_STYLE}
    ${DEFAULT_STYLE}
    &${FOCUS_STYLE}
    &${HOVER_STYLE}
`