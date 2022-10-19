import styled from "styled-components";
import {FULL_SIZE, FULL_SIZE_ABSOLUTE_POSITION, NOT_SELECTABLE_AREA} from "../Constants/StylesConstants";

const FullSizeMultimedia = `
    ${FULL_SIZE_ABSOLUTE_POSITION}
    ${FULL_SIZE}
    ${NOT_SELECTABLE_AREA}
`

export const FullSizeImage = styled.img`
    ${FullSizeMultimedia}
`

export const FullSizeVideo = styled.video`
    ${FullSizeMultimedia}
`