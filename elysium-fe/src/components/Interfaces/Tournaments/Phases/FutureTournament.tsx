import {Tournament} from "../../../Shared/Models/Tournament/Tournament";
import HighlightableAreaMessage from "../../../Shared/Components/HighlightableAreaMessage";
import {
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    Spacing
} from "../../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import ElyisiumTimer from "../../../Shared/Components/ElyisiumTimer";

const FutureTournamentContainer = styled(HighlightableAreaMessage)`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
`

const NextTournamentTitle = styled.div`
    font-family: inherit;
`

const NextTournamentName = styled.span`
    color: ${Color.GREEN_DARK};
    font-family: inherit;
    
    span { 
        font-family: inherit;
    }
`

const NextTournamentSubtitle = styled.div`
    font-family: inherit;
    margin-top: ${Spacing.SECOND};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

const FutureTournament = ({tournament, signalEnrollmentStarted}: {
    tournament: Tournament, signalEnrollmentStarted: () => void
}) => {
    return <FutureTournamentContainer>
        <NextTournamentTitle>
            Next: <NextTournamentName>{tournament.getTournamentDisplayedName()}</NextTournamentName>
        </NextTournamentTitle>
        <NextTournamentSubtitle>
            The enrollment phase starts in <ElyisiumTimer expiryDate={tournament.enrollmentStartTime} signalExpiry={signalEnrollmentStarted}/>.
        </NextTournamentSubtitle>
    </FutureTournamentContainer>
}

export default FutureTournament