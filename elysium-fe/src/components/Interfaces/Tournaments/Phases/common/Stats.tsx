import TokenBalance from "../../../../Shared/Components/TokenBalance";
import {Color, FontSize, fontSizeToPixels, FontWeight} from "../../../../Shared/Constants/StylesConstants";
import {HighlightedText} from "../../../../Shared/Components/HighlightedText";
import styled from "styled-components";

const StyledPosition = styled(HighlightedText)`
    color: ${Color.GREEN_DARK};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

export const Points = styled(TokenBalance)`
    font-weight: ${FontWeight.EXTRA_LARGE};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

export const SmallerPoints = styled(Points)`
    font-size: ${fontSizeToPixels(FontSize.ALMOST_MEDIUM)};
`

export const Position = ({ position, ...props }: {position: number}) => {
    return <StyledPosition {...props}>{position}&deg;</StyledPosition>
}