import {useCallback, useEffect, useState} from "react";
import ElyisiumTimer from "../../../Shared/Components/ElyisiumTimer";
import styled from "styled-components";
import {Tournament} from "../../../Shared/Models/Tournament/Tournament";
import {doWithMounted} from "../../../Shared/Utils/ComponentUtils";
import {getNextQuestStatus, NextQuestMappedResponse} from "../../../Shared/Service/PublicTournamentService";
import {Moment} from "moment";
import {isPastDate} from "../../../Shared/Utils/DateUtils";

const REFRESH_TIMEOUT = 5000
const ASSIGNATION_IN_PROGRESS = 'The next assignable quests are being processed. Waiting for results...'

const NextQuestContainer = styled.div`
    text-align: center;
`

const MessageWithTimer = (
    {
        timerInProgressWithResults, timerInProgressWithoutResults,
        timerExpiredWithResults, timerExpiredWithoutResults,
        expiryTime, processingFinished, requestRefresh
    }: {
        timerInProgressWithResults: string, timerInProgressWithoutResults: string,
        timerExpiredWithResults: string, timerExpiredWithoutResults: string,
        expiryTime: Moment, processingFinished: boolean, requestRefresh: () => void
    }) => {
    const [timerExpired, setTimerExpired] = useState(() => isPastDate(expiryTime))
    useEffect(() => setTimerExpired(isPastDate(expiryTime)), [expiryTime])

    const onTimerExpired = useCallback(() => {
        requestRefresh()
        setTimerExpired(true)
    }, [requestRefresh])

    if (timerExpired) {
        return <>{processingFinished ? timerExpiredWithResults : timerExpiredWithoutResults}</>
    } else {
        return processingFinished ? <>
            {timerInProgressWithResults} <ElyisiumTimer expiryDate={expiryTime} signalExpiry={onTimerExpired}/>.
        </> : <>{timerInProgressWithoutResults}</>
    }
}

const NextQuestMessage = ({nextQuestsAssignation, processingFinished, requestRefresh}: {
    nextQuestsAssignation: Moment, processingFinished: boolean, requestRefresh: () => void
}) => <MessageWithTimer
    timerInProgressWithResults={'The next quest will be assigned in'}
    timerInProgressWithoutResults={ASSIGNATION_IN_PROGRESS}
    timerExpiredWithResults={''}
    timerExpiredWithoutResults={ASSIGNATION_IN_PROGRESS}
    expiryTime={nextQuestsAssignation} processingFinished={processingFinished} requestRefresh={requestRefresh}/>

const TournamentEndMessage = ({tournamentEndTime, processingFinished, requestRefresh}: {
    tournamentEndTime: Moment, processingFinished: boolean, requestRefresh: () => void
}) => <MessageWithTimer
    timerInProgressWithResults={'The tournament ends in'}
    timerInProgressWithoutResults={ASSIGNATION_IN_PROGRESS}
    timerExpiredWithResults={'The tournament has finished.'}
    timerExpiredWithoutResults={'The final results are being processed...'}
    expiryTime={tournamentEndTime} processingFinished={processingFinished} requestRefresh={requestRefresh}/>

const NextQuestDetailsWithStatus = ({tournament, nextQuestStatus, requestRefresh}:{
    tournament: Tournament, nextQuestStatus: NextQuestMappedResponse, requestRefresh: () => void
}) => {
    const [tournamentEndsBeforeNextQuest, setTournamentEndsBeforeNextQuest] = useState(false)

    useEffect(() => {
        const nextQuestsAssignation = nextQuestStatus.nextQuestsAssignation
        setTournamentEndsBeforeNextQuest(tournament.tournamentEndTime.isSameOrBefore(nextQuestsAssignation))
    }, [tournament, nextQuestStatus])

    return <NextQuestContainer>
        {!tournamentEndsBeforeNextQuest ? <NextQuestMessage
            nextQuestsAssignation={nextQuestStatus.nextQuestsAssignation}
            processingFinished={nextQuestStatus.currentQuestsDistributed}
            requestRefresh={requestRefresh}/> : <TournamentEndMessage
            tournamentEndTime={tournament.tournamentEndTime}
            processingFinished={nextQuestStatus.currentQuestsDistributed}
            requestRefresh={requestRefresh}/>}
    </NextQuestContainer>
}

const NextQuestDetails = ({tournament, requestRefresh}:{ tournament: Tournament, requestRefresh: () => void }) => {
    const [nextQuestStatus, setNextQuestStatus] = useState<NextQuestMappedResponse | undefined>()

    const refreshNextQuestEndDate = useCallback(() => doWithMounted(isMounted => {
        getNextQuestStatus().then(nextQuestStatus => isMounted.isMounted && setNextQuestStatus(nextQuestStatus))
    }), [])
    useEffect(() => refreshNextQuestEndDate(), [refreshNextQuestEndDate])

    const requestRefreshWithStatus = useCallback(() => {
        requestRefresh()
        refreshNextQuestEndDate()
    }, [requestRefresh, refreshNextQuestEndDate])

    const setRefreshTimeout = useCallback(() => {
        const refreshTimeout = setTimeout(requestRefreshWithStatus, REFRESH_TIMEOUT)
        return () => clearTimeout(refreshTimeout)
    }, [requestRefreshWithStatus])

    useEffect(() => {
        return !!nextQuestStatus && !nextQuestStatus.currentQuestsDistributed ? setRefreshTimeout() : () => {}
    }, [nextQuestStatus, setRefreshTimeout])

    return !!nextQuestStatus ? <NextQuestDetailsWithStatus
        tournament={tournament} nextQuestStatus={nextQuestStatus} requestRefresh={requestRefreshWithStatus}/> : <></>
}

export default NextQuestDetails