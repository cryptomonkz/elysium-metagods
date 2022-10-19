import {FontFamily, FontSize, fontSizeToPixels} from "../Constants/StylesConstants";
import {ReactNode} from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
    font-family: ${FontFamily.HU_THE_GAME};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM_TO_LARGE)};
`

const HighlightableAreaMessage = ({children}: {children: ReactNode}) => <MessageContainer>{children}</MessageContainer>

export default HighlightableAreaMessage