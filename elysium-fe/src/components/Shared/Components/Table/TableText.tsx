import {HighlightedText} from "../HighlightedText";
import {Color, FontSize, fontSizeToPixels} from "../../Constants/StylesConstants";
import styled from "styled-components";

const DetailText = styled.div`
    color: ${Color.BACKGROUND_MINT_PASS};
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
`

export const displayTextWithDetail = (title: string, detail: string) => {
    return <div>
        <HighlightedText>{title}</HighlightedText>
        <DetailText>{detail}</DetailText>
    </div>
}