import {getGodTournamentStatusText, GodTournamentStatus} from "../Models/Token/TournamentToken";
import Tooltip from '@mui/material/Tooltip';
import {Color} from "../Constants/StylesConstants";
import styled from "styled-components";

const InQuestIcon = styled.i`
    color: ${Color.GREEN_SHINY};
`

const AwaitsQuestIcon = styled.i`
    color: ${Color.YELLOW};
`

const NoQuestIcon = styled.i`
    color: ${Color.BACKGROUND_MINT_PASS};
`

const shouldShowStatus = (status: GodTournamentStatus) => [
    GodTournamentStatus.IN_QUEST, GodTournamentStatus.AWAITS_QUEST, GodTournamentStatus.NO_QUEST
].includes(status)

const getTournamentStatusIcon = (status: GodTournamentStatus) => {
    switch (status) {
        case GodTournamentStatus.IN_QUEST:
            return <InQuestIcon className={'pi pi-check-circle'}/>
        case GodTournamentStatus.AWAITS_QUEST:
            return <AwaitsQuestIcon className={'pi pi-history'}/>
        case GodTournamentStatus.NO_QUEST:
            return <NoQuestIcon className={'pi pi-times-circle'}/>
        default:
            throw new Error("Status icon has not been defined.")
    }
}

export const TournamentStatusWithTooltip = ({status}: { status: GodTournamentStatus }) => {
    return shouldShowStatus(status) ? <Tooltip
        title={getGodTournamentStatusText(status)} arrow>
        {getTournamentStatusIcon(status)}
    </Tooltip> : <></>
}
