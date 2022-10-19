import {Tournament} from "../../../Shared/Models/Tournament/Tournament";
import {isFutureDate} from "../../../Shared/Utils/DateUtils";
import {useCallback, useEffect, useState} from "react";
import EnrollmentPhaseTournament from "./EnrollmentPhaseTournament";
import InProgressPhaseTournament from "./InProgressPhaseTournament";

const ActiveTournament = ({account, tournament}: { account: string, tournament: Tournament }) => {
    const [isEnrollmentPhase, setIsEnrollmentPhase] = useState(false)
    const refreshTournamentState = useCallback(() => {
        setIsEnrollmentPhase(isFutureDate(tournament.tournamentStartTime))
    }, [tournament])
    useEffect(() => refreshTournamentState(), [refreshTournamentState])
    return isEnrollmentPhase ?
        <EnrollmentPhaseTournament
            account={account} tournament={tournament} signalTournamentStarted={refreshTournamentState}/> :
        <InProgressPhaseTournament account={account} tournament={tournament}/>
};

export default ActiveTournament