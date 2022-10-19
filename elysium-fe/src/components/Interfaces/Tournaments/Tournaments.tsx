import {doWithMounted} from "../../Shared/Utils/ComponentUtils";
import {ConnectWalletError} from "../../Shared/Components/ConnectWalletError";
import {useCallback, useEffect, useState} from "react";
import GenericLoader from "../../Shared/Components/GenericLoader";
import {getActiveTournament} from "../../Shared/Service/PublicTournamentService";
import {Tournament} from "../../Shared/Models/Tournament/Tournament";
import HighlightableAreaMessage from "../../Shared/Components/HighlightableAreaMessage";
import {isFutureDate} from "../../Shared/Utils/DateUtils";
import FutureTournament from "./Phases/FutureTournament";
import ActiveTournament from "./Phases/ActiveTournament";
import {playBackgroundSound} from "../../Shared/State/Sound/SoundService";
import {BACKGROUND_SOUND} from "../../Shared/State/Sound/SoundState";

const NoTournament = () => <HighlightableAreaMessage>
    At the moment, there is no active Elysium Tournament.
</HighlightableAreaMessage>

const TournamentForAccount = ({account, tournament}: { account: string, tournament: Tournament }) => {
    const [isUpcomingTournament, setIsUpcomingTournament] = useState(false)
    const refreshTournamentState = useCallback(() => {
        setIsUpcomingTournament(isFutureDate(tournament.enrollmentStartTime))
    }, [tournament])
    useEffect(() => refreshTournamentState(), [refreshTournamentState])
    return isUpcomingTournament ?
        <FutureTournament tournament={tournament} signalEnrollmentStarted={refreshTournamentState}/> :
        <ActiveTournament account={account} tournament={tournament}/>
}

const PossibleTournamentForAccount = ({account, tournament}: { account: string, tournament?: Tournament }) => tournament ?
    <TournamentForAccount account={account} tournament={tournament}/> : <NoTournament/>

const TournamentWithLoader = ({account}: { account: string }) => {
    const [tournament, setTournament] = useState<Tournament | undefined>()
    const [loadingTournament, setLoadingTournament] = useState(true)
    useEffect(() => doWithMounted(isMounted => {
        setLoadingTournament(true)
        getActiveTournament()
            .then(activeTournament => setTournament(activeTournament))
            .finally(() => isMounted.isMounted && setLoadingTournament(false))
    }), [account, setLoadingTournament])
    return <>
        {!loadingTournament && <PossibleTournamentForAccount account={account} tournament={tournament}/>}
        <GenericLoader loading={loadingTournament}/>
    </>
}

const Tournaments = () => {
    useEffect(() => playBackgroundSound(BACKGROUND_SOUND.TOURNAMENTS), [])
    return <ConnectWalletError>{(account) => <>
        <TournamentWithLoader account={account}/>
    </>}</ConnectWalletError>
}

export default Tournaments