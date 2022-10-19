import {GodQuest} from "../../../../Shared/Models/Tournament/GodQuest";
import {
    Color,
    DEFAULT_BUTTON_SIZE,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FontWeight,
    FULL_SIZE,
    NO_USER_SELECT,
    Spacing,
    Z_INDEX
} from "../../../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import {HighlightedText} from "../../../../Shared/Components/HighlightedText";
import SectionBackground from "../../../../../assets/Images/sectionBackground.png";
import QuestResultBackground from "../../../../../assets/Images/questResultBackground.png";
import {FullSizeImage} from "../../../../Shared/Components/FullSizeImage";
import {ReactNode} from "react";
import {SmallerPoints} from "./Stats";
import {QuestResult} from "../../../../Shared/Models/Tournament/QuestResult";
import {ThemeButton} from "../../../../Shared/Components/StyledButton";
import {QuestResultBreakdown} from "../../../../Shared/Models/Tournament/QuestResultBreakdown";
import {SmallDivider} from "../../../../Shared/Components/Separator";
import {GenericToken} from "../../../../Shared/Models/Token/GenericToken";
import {TournamentToken} from "../../../../Shared/Models/Token/TournamentToken";

const DetailsContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    align-items: flex-start;
    justify-content: flex-start;
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
`

const DayText = styled.div`
    color: ${Color.GREEN_DARK};
    margin-bottom: ${Spacing.FIRST};
`

const QuestTitle = styled(HighlightedText)`
    margin-bottom: ${Spacing.FIRST};
`

const QuestDescription = styled.div`
    margin-bottom: ${Spacing.FIRST};
`

const MainDetailsContainer = styled.div`
    flex: 1;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: ${Spacing.SECOND};
`

const ResultBreakdownContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    margin-right: ${Spacing.SECOND};
`

const StatusContainer = styled.div`
    flex: 1;
    ${FLEX_CENTERED_CONTAINER}
    justify-content: flex-start;
    align-items: flex-end;
`

const FoggedDetail = styled.div`
    position: relative;
    ${FLEX_CENTERED_CONTAINER}
    ${NO_USER_SELECT}
    padding: ${Spacing.SECOND};
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const BackgroundImage = styled(FullSizeImage)`
    z-index: ${Z_INDEX.RELATIVE_FIRST};
`

const QuestStatus = styled.div<{isSuccess: boolean}>`
    font-weight: ${FontWeight.EXTRA_LARGE};
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    color: ${props => props.isSuccess ? Color.GREEN_DARK : Color.RED};
`

const OverImageContainer = styled.div`
    z-index: ${Z_INDEX.RELATIVE_SECOND};
`

const ResultRowContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    justify-content: space-between;
    flex-wrap: nowrap;
`

const RowWithPaddingContainer = styled.div`
    padding: 0 ${Spacing.SECOND};
`

const ResultRowTitle = styled.div`
    white-space: nowrap;
    margin-right: ${Spacing.SECOND};
`

const ResultRowValue = styled.div`
    font-weight: ${FontWeight.EXTRA_LARGE};
`

const ActionsContainer = styled.div`
    align-self: flex-start;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
`

const PageButton = styled(ThemeButton)`
    ${DEFAULT_BUTTON_SIZE}
    margin: ${Spacing.SECOND} 0;
`

const CurrentQuest = styled.div`
    font-weight: ${FontWeight.EXTRA_LARGE};
`

const TotalQuests = styled.div`
    font-weight: ${FontWeight.EXTRA_LARGE};
    color: ${Color.BACKGROUND_MINT_PASS};
`

const SuccessContainer = styled.div`
    position: relative;
    ${NO_USER_SELECT}
    padding: ${Spacing.TINY} ${Spacing.FIRST} 0 ${Spacing.FIRST};
    align-self: flex-start;
    margin-right: ${Spacing.SECOND};
`

const SuccessActualImage = styled(OverImageContainer)`
    position: relative;
    ${FULL_SIZE}
`

const SuccessSource = styled(FullSizeImage)`
    max-width: 200px;
    position: relative;
`

const ResultMainDetails = ({questData}:{questData: GodQuest}) => <MainDetailsContainer>
    <DayText>Quest {questData.periodNumber}</DayText>
    <QuestTitle>{questData.quest.title}</QuestTitle>
    <QuestDescription>{questData.quest.description}</QuestDescription>
    <StatusContainer>
        <FoggedDetail>
            <BackgroundImage src={SectionBackground} alt={"SectionBackground"}/>
            <QuestStatus isSuccess={questData.result.isSuccessful}>
                {questData.result.isSuccessful ? 'Quest Successful!' : 'Quest Failed!'}
            </QuestStatus>
        </FoggedDetail>
    </StatusContainer>
</MainDetailsContainer>

const ResultRow = ({title, value}: {title: string, value: ReactNode}) => <ResultRowContainer>
    <ResultRowTitle>{title}</ResultRowTitle>
    <ResultRowValue>{value}</ResultRowValue>
</ResultRowContainer>

const ResultRowWithPadding = ({title, value}: {title: string, value: ReactNode}) => <RowWithPaddingContainer>
    <ResultRow title={title} value={value}/>
</RowWithPaddingContainer>

const ResultBreakdown = ({result, breakdown}:{
    result: QuestResult, breakdown: QuestResultBreakdown
}) => <ResultBreakdownContainer>
    <FoggedDetail>
        <BackgroundImage src={SectionBackground} alt={"SectionBackground"}/>
        <OverImageContainer>
            <ResultRow title={"TOTAL POINTS"} value={<SmallerPoints>{result.pointsGained}</SmallerPoints>}/>
        </OverImageContainer>
    </FoggedDetail>
    <ResultRowWithPadding title={"Daily Quest Completion"} value={breakdown.basePoints || 0}/>
    <ResultRowWithPadding title={"Relic Bonus"} value={breakdown.relicBonus || 0}/>
    <ResultRowWithPadding title={"Well-Suited Bonus"} value={breakdown.suitedGodBonus || 0}/>
    <ResultRowWithPadding title={"Success Streak Bonus"} value={breakdown.successChainBonus || 0}/>
    <ResultRowWithPadding title={"Risk Bonus"} value={breakdown.riskBonus || 0}/>
    <ResultRowWithPadding title={"Weapon Bonus"} value={breakdown.weaponBonus || 0}/>
    {!!breakdown.primordialBonus && <ResultRowWithPadding
        title={"Primordial Bonus"} value={breakdown.primordialBonus || 0}/>}
</ResultBreakdownContainer>

const getSuccessImage = (isSuccess: boolean, token: GenericToken) => {
    return `https://storage.googleapis.com/elysium-metagods-tournaments/quest-result/${isSuccess ? 'victory' : 'defeat'}/${token.name.toLowerCase()}.png`
}

const SuccessImage = ({isSuccess, token}: {isSuccess: boolean, token: GenericToken}) => <SuccessContainer>
    <BackgroundImage src={QuestResultBackground} alt={"QuestResultBackground"}/>
    <SuccessActualImage>
        <SuccessSource src={getSuccessImage(isSuccess, token)} alt={"SuccessStatus"}/>
    </SuccessActualImage>
</SuccessContainer>

const ResultActions = ({currentQuestPosition, totalQuests, onPreviousQuest, onNextQuest}:{
    currentQuestPosition: number, totalQuests: number, onPreviousQuest: () => void, onNextQuest: () => void
}) => <ActionsContainer>
    <PageButton icon="pi pi-angle-up" onClick={onPreviousQuest} disabled={currentQuestPosition === 0}/>
    <CurrentQuest>{currentQuestPosition + 1}</CurrentQuest>
    <SmallDivider/>
    <TotalQuests>{totalQuests}</TotalQuests>
    <PageButton icon="pi pi-angle-down" onClick={onNextQuest} disabled={currentQuestPosition === totalQuests - 1}/>
</ActionsContainer>

const ResultDetails = ({tournamentToken, questData, currentQuestPosition, totalQuests, onPreviousQuest, onNextQuest}:{
    tournamentToken: TournamentToken, questData: GodQuest, currentQuestPosition: number, totalQuests: number,
    onPreviousQuest: () => void, onNextQuest: () => void
}) => {
    return <DetailsContainer>
        <ResultMainDetails questData={questData}/>
        {!!questData.result.pointsBreakdown && <ResultBreakdown
            result={questData.result} breakdown={questData.result.pointsBreakdown}/>}
        <SuccessImage isSuccess={questData.result.isSuccessful} token={tournamentToken.token}/>
        <ResultActions currentQuestPosition={currentQuestPosition} totalQuests={totalQuests}
                       onPreviousQuest={onPreviousQuest} onNextQuest={onNextQuest}/>
    </DetailsContainer>
}

export default ResultDetails