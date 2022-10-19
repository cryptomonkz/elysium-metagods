import {TournamentToken} from "../../../Shared/Models/Token/TournamentToken";
import {TitleWithSeparator} from "../../../Shared/Components/Section";
import {SeparatorType, VerticalDivider} from "../../../Shared/Components/Separator";
import {
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FontWeight,
    Spacing
} from "../../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import {ReactNode} from "react";
import {Position, SmallerPoints} from "./common/Stats";
import {StakeModeIconWithTooltip, StakeModeImageSize} from "../../../Shared/Components/StakeModeIcon";
import {PairedToken} from "../../../Shared/Components/Drag/Token";
import CurrentQuests from "./common/CurrentQuests";
import {ComplexCell} from "../../../Shared/Components/Grid/Grid";

const DetailsContainer = styled(ComplexCell)`
    overflow-y: auto;
    overflow-x: hidden;
`

const GodStats = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
    margin: ${Spacing.SECOND} 0;
`

const StatWithDetailContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
`

const StatTitle = styled.div`
    text-align: center;
    color: ${Color.BACKGROUND_MINT_PASS};
    margin-bottom: ${Spacing.FIRST};
`

const StatDetail = styled.div`
    text-align: center;
    font-weight: ${FontWeight.EXTRA_LARGE};
    ${FLEX_CENTERED_CONTAINER}
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const SmallerPosition = styled(Position)`
    font-size: ${fontSizeToPixels(FontSize.ALMOST_MEDIUM)};
`

const WeaponContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
`

const WeaponQuestBonus = styled.div`
    margin-top: ${Spacing.FIRST};
    font-size: ${fontSizeToPixels(FontSize.SMALL)};
`

const AlignedDivider = styled(VerticalDivider)`
    align-self: center;
`

const StatWithDetail = ({title, detail}: {title: string, detail: ReactNode}) => {
    return <StatWithDetailContainer>
        <StatTitle>{title}</StatTitle>
        <StatDetail>{detail}</StatDetail>
    </StatWithDetailContainer>
}

const EnrolledGodDetails = ({account, enrolledGod, requestRefresh}: {
    account: string, enrolledGod: TournamentToken, requestRefresh: () => void
}) => {
    return <DetailsContainer>
        <TitleWithSeparator title={"Stats"} separatorType={SeparatorType.THEME_LARGE}/>
        <GodStats>
            <StatWithDetail title={"TOTAL POINTS"} detail={<SmallerPoints>{enrolledGod.totalPoints || 0}</SmallerPoints>}/>
            <AlignedDivider/>
            <StatWithDetail title={"POSITION"} detail={<SmallerPosition position={enrolledGod.position || 0}/>}/>
            <AlignedDivider/>
            <StatWithDetail title={"BATTLE POSITION"} detail={!!enrolledGod.stakeType ? <StakeModeIconWithTooltip
                mode={enrolledGod.stakeType} size={StakeModeImageSize.MEDIUM}/> : <div>Not Staked</div>
            }/>
            <AlignedDivider/>
            <StatWithDetail title={"EQUIPPED WEAPON"} detail={!!enrolledGod.pairedToken ? <WeaponContainer>
                <PairedToken token={enrolledGod.pairedToken}/>
                <WeaponQuestBonus>Bonus: +{enrolledGod.weaponQuestBonus || 0}% POINTS</WeaponQuestBonus>
            </WeaponContainer> : <div>No weapon</div>}/>
            <AlignedDivider/>
            <StatWithDetail title={"SUCCESSFUL QUESTS"} detail={enrolledGod.successfulQuests || 0}/>
        </GodStats>
        <CurrentQuests account={account} enrolledGod={enrolledGod} requestRefresh={requestRefresh}/>
    </DetailsContainer>
}

export default EnrolledGodDetails