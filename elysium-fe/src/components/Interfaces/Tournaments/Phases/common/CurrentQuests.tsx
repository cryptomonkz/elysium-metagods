import {doWithMounted} from "../../../../Shared/Utils/ComponentUtils";
import {
    getEmptyGodQuestsResponse,
    getGodQuests,
    GodQuestsResponse
} from "../../../../Shared/Service/PublicTournamentService";
import {Fragment, useCallback, useEffect, useState} from "react";
import {LargeSpinner} from "../../../../Shared/Components/ElysiumSpinner";
import {TournamentToken} from "../../../../Shared/Models/Token/TournamentToken";
import {TitleWithSeparator} from "../../../../Shared/Components/Section";
import {SeparatorType} from "../../../../Shared/Components/Separator";
import {
    AbsoluteBorderRadius,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontFamily,
    FontSize,
    fontSizeToPixels,
    FontWeight,
    GRADIENT,
    Spacing
} from "../../../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import {Accordion, AccordionTab} from "primereact/accordion";
import QuestDetails from "./QuestDetails";
import {GodQuest} from "../../../../Shared/Models/Tournament/GodQuest";
import ResultDetails from "./ResultDetails";
import {acceptQuestInTournament} from "../../../../Shared/Service/AggregationService";
import {showQuestAcceptFailed} from "../../../../Shared/Utils/ToastUtils";

const StyledAccordion = styled(Accordion)`
    margin: ${Spacing.THIRD} 0;
    
    .p-accordion-toggle-icon {
        margin: 0 !important;
        border-radius: ${AbsoluteBorderRadius.TINY};
        padding: ${Spacing.FIRST} !important;
        background: ${GRADIENT.FIRST_THEME};
    }
    
    .p-accordion-header-link, .p-accordion-content {
        border: none !important;
        color: ${Color.WHITE} !important;
        background-color: ${Color.TRANSPARENT} !important;
        padding: ${Spacing.SECOND} 0 !important;
    }
    
    .p-accordion-header-link {
        &:focus {
            outline: none !important;
            box-shadow: none !important;
        }
    }
`

const StyledCarousel = styled.div`
    margin: ${Spacing.SECOND} 0 !important;
`

const CurrentQuestHeaderContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    margin-left: ${Spacing.SECOND};
    justify-content: space-between;
`

const CurrentQuestHeader = styled.span`
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
    font-family: ${FontFamily.HU_THE_GAME};
`

const SpinnerWithMargin = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    margin-top: ${Spacing.FIFTH};
`

const NoQuestsContainer = styled.div`
    margin: ${Spacing.THIRD} 0;
    font-weight: ${FontWeight.EXTRA_LARGE};
    font-size: ${fontSizeToPixels(FontSize.ALMOST_MEDIUM)};
`

const renderQuestTabs = (quests: GodQuest[], withAccept: boolean, onAccept?: (questId: number) => void) => {
    return quests.map(questData => <AccordionTab key={questData.id} header={<Fragment>
        <CurrentQuestHeaderContainer>
            <CurrentQuestHeader>{questData.quest.title}</CurrentQuestHeader>
        </CurrentQuestHeaderContainer>
    </Fragment>}>
        <QuestDetails questData={questData} withAccept={withAccept} onAccept={onAccept}/>
    </AccordionTab>)
}

const ResultsCarousel = ({tournamentToken, quests}: { tournamentToken: TournamentToken, quests: GodQuest[] }) => {
    const [positionToDisplay, setPositionToDisplay] = useState(0)

    return <StyledCarousel>
        <ResultDetails
            tournamentToken={tournamentToken}
            questData={quests[positionToDisplay]}
            currentQuestPosition={positionToDisplay}
            totalQuests={quests.length}
            onPreviousQuest={() => setPositionToDisplay(currentPosition => Math.max(0, currentPosition - 1))}
            onNextQuest={() => setPositionToDisplay(currentPosition => Math.min(quests.length - 1, currentPosition + 1))}/>
    </StyledCarousel>
}

const CurrentQuests = ({account, enrolledGod, requestRefresh}: {
    account: string, enrolledGod: TournamentToken, requestRefresh: () => void
}) => {
    const [loadingState, setLoadingState] = useState(true)
    const [questsState, setQuestsState] = useState<GodQuestsResponse>(getEmptyGodQuestsResponse)

    const refreshQuestsState = useCallback(() => doWithMounted(isMounted => {
        setLoadingState(true);
        getGodQuests(enrolledGod.token.tokenId)
            .then(questsStatus => isMounted.isMounted && setQuestsState(questsStatus))
            .finally(() => isMounted.isMounted && setLoadingState(false))
    }), [enrolledGod])
    useEffect(() => refreshQuestsState(), [refreshQuestsState])

    const doOnAccept = useCallback((questId: number) => {
        acceptQuestInTournament(account, enrolledGod.token.tokenId, questId)
            .then(() => requestRefresh()).catch(() => showQuestAcceptFailed())
    }, [account, enrolledGod, requestRefresh])

    return <>
        {loadingState && <SpinnerWithMargin>
            <LargeSpinner loading={loadingState}/>
        </SpinnerWithMargin>}
        {!loadingState && <>
            <TitleWithSeparator title={"Current Quests"} separatorType={SeparatorType.THEME_LARGE}/>
            {!questsState.assignableQuests.length && !questsState.currentQuests.length && <NoQuestsContainer>
                There are no assignable quests.
            </NoQuestsContainer>}
            {(!!questsState.assignableQuests.length || !!questsState.currentQuests.length) && <StyledAccordion
                activeIndex={!!questsState.currentQuests.length ? 0 : []}
                expandIcon={"pi pi-plus"} collapseIcon={"pi pi-minus"}>
                {renderQuestTabs(questsState.currentQuests, false)}
                {renderQuestTabs(questsState.assignableQuests, true, doOnAccept)}
            </StyledAccordion>}
            <TitleWithSeparator title={"Quests Results"} separatorType={SeparatorType.THEME_LARGE}/>
            {!questsState.previousQuests.length && <NoQuestsContainer>
                There are no results registered so far.
            </NoQuestsContainer>}
            {!!questsState.previousQuests.length && <ResultsCarousel
                tournamentToken={enrolledGod} quests={questsState.previousQuests}/>}
        </>}
    </>
}

export default CurrentQuests