import styled from "styled-components";
import {FontSize, fontSizeToPixels, GRADIENT} from "../Constants/StylesConstants";

const TokenBalance = styled.div`
    background: ${GRADIENT.GOLDEN_TEXT};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

export default TokenBalance