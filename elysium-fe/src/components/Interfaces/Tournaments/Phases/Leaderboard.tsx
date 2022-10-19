import {getLeaderboard} from "../../../Shared/Service/PublicTournamentService";
import {useCallback, useState} from "react";
import {Color, FLEX_CENTERED_CONTAINER, GRADIENT, Spacing} from "../../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import {simplifyAccount} from "../../../Shared/Utils/AccountUtils";
import StyledCheckbox, {CheckboxLabel} from "../../../Shared/Components/StyledCheckbox";
import {Points, Position} from "./common/Stats";
import {RankedGod} from "../../../Shared/Models/Tournament/RankedGod";
import {Tournament} from "../../../Shared/Models/Tournament/Tournament";
import StyledTable from "../../../Shared/Components/Table/StyledTable";
import {displayTextWithDetail} from "../../../Shared/Components/Table/TableText";
import {FairColumn} from "../../../Shared/Components/Table/TableColumn";

const TitleArea = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    justify-content: space-between;
`

const CustomCheckbox = styled(CheckboxLabel)`
    margin: 0 ${Spacing.SECOND_HALF} 0 ${Spacing.FIRST};
`

export const displayPosition = (godOnPosition: RankedGod) => {
    return <Position position={godOnPosition.rank}/>
}

const displayGod = (godOnPosition: RankedGod) => {
    return displayTextWithDetail(godOnPosition.godName, `#${godOnPosition.godId}`)
}

const displayWallet = (godOnPosition: RankedGod) => {
    return displayTextWithDetail('Wallet', simplifyAccount(godOnPosition.walletAddress || ''))
}

const displayPoints = (godOnPosition: RankedGod) => {
    return <Points>{godOnPosition.totalPoints || 0}</Points>
}

const displayReward = (godOnPosition: RankedGod) => {
    return <Points>{godOnPosition.reward || 0}</Points>
}

const Filters = ({filterByMyGods, setFilterByMyGods}:{
    filterByMyGods: boolean, setFilterByMyGods: (filter: boolean) => void,
}) => {
    return <>
        <StyledCheckbox inputId={"myMetagodsFilter"} name={"myMetagodsFilter"} value={"myMetagodsFilter"} icon={""}
                        onChange={(event) => setFilterByMyGods(event.checked)}
                        checked={filterByMyGods}
                        color={Color.SECOND_THEME_DARK} gradient={GRADIENT.SECOND_THEME}/>
        <CustomCheckbox htmlFor={"myMetagodsFilter"}>MY METAGODS</CustomCheckbox>
    </>
}

const Leaderboard = ({account, tournament}: { account: string, tournament: Tournament }) => {
    const [filterByMyGods, setFilterByMyGods] = useState(false)

    const getData = useCallback((page: number, size: number) => {
        const requestOptions = {
            page, size,
            ...(filterByMyGods ? {'walletAddress.equals': account} : {})
        }
        return getLeaderboard(requestOptions)
    }, [filterByMyGods, account])

    const Title = (<TitleArea>
        <div>Leaderboard - {tournament.getTournamentDisplayedName()}</div>
        <div>
            <Filters filterByMyGods={filterByMyGods} setFilterByMyGods={setFilterByMyGods}/>
        </div>
    </TitleArea>)

    return <StyledTable
        title={Title}
        getData={getData}
        emptyMessage={"There are no matching results for this tournament."}>
        <FairColumn header="POSITION" body={displayPosition}/>
        <FairColumn header="GOD" body={displayGod}/>
        <FairColumn header="OWNER" body={displayWallet}/>
        <FairColumn header="POINTS" body={displayPoints}/>
        <FairColumn header="REWARD ($GOD)" body={displayReward}/>
    </StyledTable>
}

export default Leaderboard