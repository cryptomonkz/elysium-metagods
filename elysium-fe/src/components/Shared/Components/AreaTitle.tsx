import styled from "styled-components";
import {Color, FontFamily, FontSize, fontSizeToPixels} from "../Constants/StylesConstants";

export const AreaTitle = styled.div`
    color: ${Color.FIRST_THEME_LIGHT};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
    font-family: ${FontFamily.HU_THE_GAME};
`