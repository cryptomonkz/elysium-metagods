import styled from "styled-components";
import {device} from "../../../Shared/Constants/MediaQueries";
import {ComplexCell, DataGrid, GridCell, GridContainer} from "../../../Shared/Components/Grid/Grid";
import {Separator, SeparatorType} from "../../../Shared/Components/Separator";
import {FLEX_CENTERED_CONTAINER, OverflowYContainer, Spacing} from "../../../Shared/Constants/StylesConstants";
import {useCallback, useEffect, useState} from "react";
import {doWithMounted} from "../../../Shared/Utils/ComponentUtils";
import GenericLoader from "../../../Shared/Components/GenericLoader";
import {TournamentToken} from "../../../Shared/Models/Token/TournamentToken";
import {getEnrolledGods} from "../../../Shared/Service/PublicTournamentService";
import {ThemeButton} from "../../../Shared/Components/StyledButton";
import {TitleWithSeparator} from "../../../Shared/Components/Section";
import {TokenWithHover} from "../Token/TokenWithMode";
import Leaderboard from "./Leaderboard";
import EnrolledGodDetails from "./EnrolledGodDetails";
import {BackgroundType} from "../../../Shared/Components/Drag/Token";
import {playActionSound} from "../../../Shared/State/Sound/SoundService";
import {ACTION_SOUND} from "../../../Shared/State/Sound/SoundState";
import {Tournament} from "../../../Shared/Models/Tournament/Tournament";
import {isPastDate} from "../../../Shared/Utils/DateUtils";
import {ElysiumDialog} from "../../../Shared/Components/ElysiumDialog";
import NextQuestDetails from "./NextQuestDetails";

const FINALIZED_STATUS_STORAGE = "TOURNAMENT_FINALIZED_"

enum DisplayedScreen {
    GOD, LEADERBOARD, NOT_DEFINED
}

type GodData = { selectedItem: number }

type DisplayedScreenState = { screen: DisplayedScreen; data?: GodData }

const getDefaultDisplayedScreenState = (): DisplayedScreenState => ({ screen: DisplayedScreen.LEADERBOARD })

const TournamentGrid = styled(DataGrid)`
    grid-template-columns: 1fr 3fr;
    @media ${device.laptopL} { 
        grid-template-columns: 1fr 4fr;
    }
    grid-template-rows: unset;
`

const EnrolledGodsContainer = styled.div`
    ${OverflowYContainer}
    flex: 1;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: flex-start;
`

const LeaderboardButton = styled(ThemeButton)`
    ${FLEX_CENTERED_CONTAINER}
    margin-bottom: ${Spacing.SECOND};
`

const EnrolledTitle = styled.div`
    margin-top: ${Spacing.THIRD};
`

const FinalizedContainer = styled.div`
    text-align: center;
    margin: ${Spacing.SECOND} 0;
    ${FLEX_CENTERED_CONTAINER}
`

const findGodInList = (enrolledGods: TournamentToken[], toFind?: GodData) => {
    return toFind ? enrolledGods.find(god => god.token.tokenId === toFind.selectedItem) : undefined
}

const renderContentScreen = (
    account: string, tournament: Tournament, enrolledGods: TournamentToken[],
    displayedScreen: DisplayedScreenState, requestRefresh: () => void
) => {
    switch (displayedScreen.screen) {
        case DisplayedScreen.LEADERBOARD:
            return <Leaderboard account={account} tournament={tournament}/>
        case DisplayedScreen.GOD:
            const foundGod = findGodInList(enrolledGods, displayedScreen.data)
            return !!foundGod ? <EnrolledGodDetails
                account={account} enrolledGod={foundGod} requestRefresh={requestRefresh}/> : <></>
        case DisplayedScreen.NOT_DEFINED:
            return <></>
        default:
            throw new Error("The screen has not been defined.")
    }
}

const computeTournamentStorageKey = (tournament: Tournament) => {
    return `${FINALIZED_STATUS_STORAGE}${tournament.tournamentNumber}`
}

const shouldDisplayDialogForFinalizedTournament = (tournament: Tournament) => {
    const tournamentStorageKey = computeTournamentStorageKey(tournament)
    const finalizedFromStorage = localStorage.getItem(tournamentStorageKey)
    return !JSON.parse(finalizedFromStorage || String(false))
}

const saveDisplayedDialog = (tournament: Tournament) => {
    const tournamentStorageKey = computeTournamentStorageKey(tournament)
    localStorage.setItem(tournamentStorageKey, String(true))
}

const LeaderboardContainer = ({isTournamentFinalized, displayedScreen, displayLeaderboard}: {
    isTournamentFinalized: boolean, displayedScreen: DisplayedScreenState, displayLeaderboard: () => void
}) => {
    return <LeaderboardButton onClick={displayLeaderboard}
                              disabled={displayedScreen.screen === DisplayedScreen.LEADERBOARD}>
        <div>
            <div>RANKING LEADERBOARD</div>
            {isTournamentFinalized ? <div>FINAL RESULTS</div> : <></>}
        </div>
    </LeaderboardButton>
}

const FinishDialog = ({displayFinalizeDialog, onHide}: {displayFinalizeDialog: boolean, onHide: () => void}) => {
    return <ElysiumDialog position={"center"} visible={displayFinalizeDialog}
                   onHide={onHide} dismissableMask={true}>
        <TitleWithSeparator title={"Tournament finished"} titleStyles={{textAlign: "center"}}
                            separatorType={SeparatorType.THEME_LARGE}/>
        <FinalizedContainer>
            The tournament finished.
            Please note that you can check the final results in the leaderboard.
            Also, the progress of your gods is still accessible from the left panel.
        </FinalizedContainer>
    </ElysiumDialog>
}

const EnrolledGodsList = ({displayedScreen, enrolledGods, isTournamentFinalized, displayGod}: {
    displayedScreen: DisplayedScreenState, enrolledGods: TournamentToken[],
    isTournamentFinalized: boolean, displayGod: (enrolledGod: TournamentToken) => void
}) => {
    const getEnrolledGodAdditionalDetails = useCallback((enrolledGod: TournamentToken) => {
        const toCheckId = enrolledGod.token.tokenId
        const shouldHighlightBackground = displayedScreen.screen === DisplayedScreen.GOD && !!displayedScreen.data &&
            displayedScreen.data.selectedItem === toCheckId
        return shouldHighlightBackground ? {backgroundType: BackgroundType.HIGHLIGHT} : {}
    }, [displayedScreen])

    return !!enrolledGods.length ? <EnrolledGodsContainer>
        {enrolledGods.map(enrolledGod => <TokenWithHover
            key={enrolledGod.token.tokenId} stakedToken={enrolledGod}
            isTournamentFinalized={isTournamentFinalized}
            handlers={{onClick: () => displayGod(enrolledGod)}}
            {...getEnrolledGodAdditionalDetails(enrolledGod)}/>)}
    </EnrolledGodsContainer> : <div>You have no enrolled MetaGods in this tournament.</div>
}

const InProgressPhaseTournament = ({account, tournament}: { account: string, tournament: Tournament }) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [enrolledGods, setEnrolledGods] = useState<TournamentToken[]>([])
    const [displayedScreen, setDisplayedScreen] = useState<DisplayedScreenState>(getDefaultDisplayedScreenState)

    const [isTournamentFinalized, setIsTournamentFinalized] = useState(false)
    const [displayFinalizeDialog, setDisplayFinalizeDialog] = useState(false)

    const refreshFinalized = useCallback(() => {
        const isFinalized = isPastDate(tournament.tournamentEndTime)
        setIsTournamentFinalized(isFinalized)

        const shouldDisplayDialog = isFinalized && shouldDisplayDialogForFinalizedTournament(tournament)
        shouldDisplayDialog && setDisplayFinalizeDialog(true)
        shouldDisplayDialog && saveDisplayedDialog(tournament)
    }, [tournament])

    const refreshEnrolledGods = useCallback((onEnd: () => void = () => {}) => doWithMounted(isMounted => {
        refreshFinalized()
        getEnrolledGods(account).then(gods => isMounted.isMounted && setEnrolledGods(gods)).finally(() => {
            isMounted.isMounted && onEnd()
            isMounted.isMounted && setFirstLoad(false)
        })
    }), [account, refreshFinalized])
    useEffect(() => refreshEnrolledGods(), [refreshEnrolledGods])

    const switchScreens = useCallback((previousScreen: DisplayedScreenState) => {
        const currentDisplayedScreen = previousScreen
        setDisplayedScreen({screen: DisplayedScreen.NOT_DEFINED})
        setTimeout(() => setDisplayedScreen(currentDisplayedScreen))
    }, [])

    const refreshStatusWithChild = useCallback(() => refreshEnrolledGods(() => {
        displayedScreen.screen === DisplayedScreen.LEADERBOARD && switchScreens(displayedScreen)
    }), [displayedScreen, refreshEnrolledGods, switchScreens])

    const displayLeaderboard = useCallback(() => setDisplayedScreen({
        screen: DisplayedScreen.LEADERBOARD
    }), [])

    const displayGod = useCallback((enrolledGod: TournamentToken) => {
        playActionSound(ACTION_SOUND.DROP)
        setDisplayedScreen({screen: DisplayedScreen.GOD, data: { selectedItem: enrolledGod.token.tokenId }})
    }, [])

    return <>
        <GenericLoader loading={firstLoad}/>
        {!firstLoad && <>
            <FinishDialog displayFinalizeDialog={displayFinalizeDialog}
                          onHide={() => setDisplayFinalizeDialog(false)}/>
            <GridContainer>
                <TournamentGrid>
                    <GridCell>
                        <ComplexCell>
                            <LeaderboardContainer
                                isTournamentFinalized={isTournamentFinalized}
                                displayedScreen={displayedScreen} displayLeaderboard={displayLeaderboard}/>
                            <Separator type={SeparatorType.WHITE_SMALL}/>
                            <NextQuestDetails tournament={tournament} requestRefresh={refreshStatusWithChild}/>
                            <TitleWithSeparator title={<EnrolledTitle>Gods Enrolled</EnrolledTitle>}
                                                separatorType={SeparatorType.THEME_SMALL}/>
                            <EnrolledGodsList
                                displayedScreen={displayedScreen} enrolledGods={enrolledGods}
                                isTournamentFinalized={isTournamentFinalized} displayGod={displayGod}/>
                        </ComplexCell>
                    </GridCell>
                    <GridCell>
                        <ComplexCell>
                            {renderContentScreen(account, tournament, enrolledGods, displayedScreen, refreshEnrolledGods)}
                        </ComplexCell>
                    </GridCell>
                </TournamentGrid>
            </GridContainer>
        </>}
    </>
}

export default InProgressPhaseTournament