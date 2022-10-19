import {FLEX_CENTERED_CONTAINER, FULL_SIZE} from "../Constants/StylesConstants";
import {ReactNode} from "react";
import styled from "styled-components";

const CenteredDiv = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    ${FULL_SIZE}
`

export const CenteredContainer = ({children}:{children: ReactNode}) => <CenteredDiv>
    {children}
</CenteredDiv>