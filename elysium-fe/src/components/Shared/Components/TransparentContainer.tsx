import styled from "styled-components";
import {Color, FLEX_CENTERED_CONTAINER, Spacing} from "../Constants/StylesConstants";

export const TransparentContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    padding: ${Spacing.SECOND} ${Spacing.THIRD};
    background: ${Color.TRANSPARENT};
`