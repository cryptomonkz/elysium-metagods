import {
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FontWeight,
    Spacing
} from "../Constants/StylesConstants";
import {device} from "../Constants/MediaQueries";
import styled from "styled-components";
import TokenBalance from "./TokenBalance";

export type StatsEntry = {
    title: string, amount: number, icon: string
}

const StatsForGroupContainer = styled.div`
    margin: ${Spacing.SECOND} 0;
    ${FLEX_CENTERED_CONTAINER}
    justify-content: flex-start;
`

const GroupIcon = styled.img`
    width: 20px;
    height: 20px;
    object-fit: contain;
    object-position: center;
    margin-right: ${Spacing.THIRD};
    
    @media ${device.tablet} {
        width: 35px;
        height: 35px;
    }
`

const GroupText = styled.div<{$withTextConstraint: boolean}>`
    ${props => props.$withTextConstraint ? 'max-width: 100px;' : ''}
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
    color: ${Color.WHITE};
    
    @media ${device.tablet} { 
        ${props => props.$withTextConstraint ? 'max-width: 200px;' : ''}
        font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
    }
`

const GroupValue = styled(TokenBalance)`
    margin-left: auto;
    padding-left: ${Spacing.SECOND};
    font-weight: ${FontWeight.EXTRA_LARGE};
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
    
    @media ${device.tablet} {
        font-size: ${fontSizeToPixels(FontSize.MEDIUM_TO_LARGE)};
    }
`

const StatsGroup = ({entry, withTextConstraint = false}: {
    entry: StatsEntry, withTextConstraint?: boolean
}) => <StatsForGroupContainer>
    <GroupIcon src={entry.icon} alt={"GroupIcon"}/>
    <GroupText $withTextConstraint={withTextConstraint}>
        {entry.title}
    </GroupText>
    <GroupValue>
        {entry.amount}
    </GroupValue>
</StatsForGroupContainer>

const StatsContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

const StatsPanel = ({entries = [], withTextConstraint = false, ...props}: {
    entries?: StatsEntry[], withTextConstraint?: boolean
}) => <StatsContainer {...props}>
    {entries.map(entry => <StatsGroup key={entry.title} entry={entry} withTextConstraint={withTextConstraint}/>)}
</StatsContainer>

export default StatsPanel