import {Tournament} from "../../../Shared/Models/Tournament/Tournament";
import styled from "styled-components";
import {device} from "../../../Shared/Constants/MediaQueries";
import {ComplexCell, DataGrid, GridCell, GridContainer} from "../../../Shared/Components/Grid/Grid";
import {TitleWithSeparator} from "../../../Shared/Components/Section";
import {Separator, SeparatorType} from "../../../Shared/Components/Separator";
import {
    DEFAULT_BUTTON_HEIGHT,
    DEFAULT_BUTTON_SIZE,
    FLEX_CENTERED_CONTAINER,
    OverflowYContainer,
    Spacing
} from "../../../Shared/Constants/StylesConstants";
import ElyisiumTimer from "../../../Shared/Components/ElyisiumTimer";
import {formatDate, isPastDate} from "../../../Shared/Utils/DateUtils";
import {CSSProperties, useCallback, useEffect, useState} from "react";
import {Format} from "../../../Shared/Constants/DateConstants";
import SimpleTokensList from "../Drag/SimpleTokensList";
import {doWithMounted} from "../../../Shared/Utils/ComponentUtils";
import {getEnrollmentStatus} from "../../../Shared/Service/PublicTournamentService";
import GenericLoader from "../../../Shared/Components/GenericLoader";
import {StakedToken} from "../../../Shared/Models/Token/StakedToken";
import {DroppableTokensArea} from "../Drag/DroppableTokensArea";
import {GenericToken} from "../../../Shared/Models/Token/GenericToken";
import {CancelButton, ThemeButton} from "../../../Shared/Components/StyledButton";
import {getTokenWithTrait} from "../../../Shared/Components/TokenWithTrait";
import {enrollGodsInTournament} from "../../../Shared/Service/AggregationService";
import {EnrolledToken} from "../../../Shared/Models/Token/EnrolledToken";
import ConfirmationDialog, {
    ConfirmationHighlightedText,
    ConfirmationMainText
} from "../../../Shared/Components/ConfirmationDialog";

type EnrollmentState = {
    details: Map<number, EnrolledToken>;
    staked: number[];
    enrolled: number[];
}

const EnrollmentGrid = styled(DataGrid)`
    grid-template-columns: 1fr 3fr;
    @media ${device.laptopL} { 
        grid-template-columns: 1fr 4fr;
    }
`

const EnrolledDescriptionContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    justify-content: space-between;
`

const TournamentExtraDetails = styled.div`
    margin-top: ${Spacing.THIRD};
`

const EnrolledDetails = styled.div`
    margin-right: ${Spacing.SECOND};
`

const StakedGodsContainer = styled.div`
    ${OverflowYContainer}
    flex: 1;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: flex-start;
`

const ButtonsContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: row;
    flex-wrap: wrap;
`

const ConfirmButton = styled(ThemeButton)`
    ${DEFAULT_BUTTON_HEIGHT}
    margin: 0 ${Spacing.SECOND} ${Spacing.SECOND} ${Spacing.SECOND};
`

const RollbackButton = styled(CancelButton)`
    ${DEFAULT_BUTTON_SIZE}
    margin: 0 ${Spacing.SECOND} ${Spacing.SECOND} ${Spacing.SECOND};
`

const getButtonVisibility = (anyChangePerformed: boolean): CSSProperties => ({
    visibility: anyChangePerformed ? 'visible' : 'hidden'
})

const getEmptyEnrollmentState = (): EnrollmentState => ({
    details: new Map<number, StakedToken>(), staked: [], enrolled: []
})

const loadState = async (account: string): Promise<EnrollmentState> => {
    const enrollmentStatus = await getEnrollmentStatus(account)
    const tokenDetails = ([...enrollmentStatus.availableGods, ...enrollmentStatus.enrolledGods]).reduce((currentDetails, token) => {
        return currentDetails.set(token.token.tokenId, token)
    }, new Map<number, EnrolledToken>())
    return {
        details: tokenDetails,
        staked: enrollmentStatus.availableGods.map(staked => staked.token.tokenId),
        enrolled: enrollmentStatus.enrolledGods.map(staked => staked.token.tokenId)
    }
}

const EnrolledDescription = (
    {
        onConfirmEnroll, onRollback, anyChangePerformed, tournament, isEnrollmentDisabled, signalTournamentStarted
    }: {
        onConfirmEnroll: () => void, onRollback: () => void, anyChangePerformed: boolean,
        tournament: Tournament, isEnrollmentDisabled: boolean, signalTournamentStarted: () => void
    }) => <EnrolledDescriptionContainer>
    <EnrolledDetails>
        <div>
            Metagods enrolled in the current tournament. {!isEnrollmentDisabled ?
            'The enrollment is open until' : 'Enrollment ended on'
        } <ConfirmationHighlightedText>{
            formatDate(Format.DATE_WITH_TIME, tournament.enrollmentEndTime)
        }</ConfirmationHighlightedText>.
        </div>
        <TournamentExtraDetails>
            The enrollment fee for this tournament is <ConfirmationHighlightedText>
            {tournament.enrollmentFee}
        </ConfirmationHighlightedText> $GOD/MetaGod.
        </TournamentExtraDetails>
        <TournamentExtraDetails>
            <ConfirmationHighlightedText>{tournament.getTournamentDisplayedName()}</ConfirmationHighlightedText> starts in <ElyisiumTimer
            expiryDate={tournament.tournamentStartTime} signalExpiry={signalTournamentStarted}/>.
        </TournamentExtraDetails>
    </EnrolledDetails>
    <ButtonsContainer>
        <RollbackButton icon="pi pi-replay"
                        disabled={false}
                        onClick={onRollback}
                        style={getButtonVisibility(anyChangePerformed)}/>
        <ConfirmButton disabled={isEnrollmentDisabled || !anyChangePerformed}
                       onClick={onConfirmEnroll}>Enroll</ConfirmButton>
    </ButtonsContainer>
</EnrolledDescriptionContainer>

const EnrollmentConfirmation = ({account, gods, tournament, onFinish, showConfirmation, setShowConfirmation}:{
    account: string, gods: GenericToken[], tournament: Tournament,
    onFinish: () => void, showConfirmation: boolean, setShowConfirmation: (show: boolean) => void
}) => {
    const onHide = useCallback(() => setShowConfirmation(false), [setShowConfirmation])

    const onEnroll = useCallback(() => {
        const godsToEnroll = gods.map(god => god.tokenId)
        return enrollGodsInTournament(account, godsToEnroll).then(() => onFinish())
    }, [account, gods, onFinish])
    
    const ConfirmationMessage = (<>
        <ConfirmationMainText>
            The following MetaGods will be enrolled:
        </ConfirmationMainText>
        <ul>
            {gods.map(god => <li key={god.tokenId}>{getTokenWithTrait(god)}</li>)}
        </ul>
        <ConfirmationMainText>
            You will pay <ConfirmationHighlightedText>{tournament.enrollmentFee * gods.length} $GOD</ConfirmationHighlightedText>! Do you want to proceed?
        </ConfirmationMainText>
    </>)

    return <ConfirmationDialog message={ConfirmationMessage} showConfirmation={showConfirmation} 
                               yesButtonText={"Enroll"} noButtonText={"Cancel"} 
                               onConfirm={onEnroll} onHide={onHide}/>
}

const EnrollmentPhaseTournament = ({account, tournament, signalTournamentStarted}: {
    account: string, tournament: Tournament, signalTournamentStarted: () => void
}) => {
    const [loadingState, setLoadingState] = useState(true)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const [newlyEnrolledGods, setNewlyEnrolledGods] = useState<GenericToken[]>([])
    const [enrollmentState, setEnrollmentState] = useState<EnrollmentState>(getEmptyEnrollmentState)
    const [initialEnrollmentState, setInitialEnrollmentState] = useState<EnrollmentState>(getEmptyEnrollmentState)

    const refreshToEmptyState = useCallback(() => {
        setNewlyEnrolledGods([])
        setShowConfirmation(false)
    }, [])

    const refreshEnrollmentState = useCallback(() => doWithMounted(isMounted => {
        setLoadingState(true); refreshToEmptyState()
        loadState(account).then(state => {
            setEnrollmentState(state);
            setInitialEnrollmentState(state)
        }).finally(() => isMounted.isMounted && setLoadingState(false))
    }), [account, refreshToEmptyState])
    useEffect(() => refreshEnrollmentState(), [refreshEnrollmentState])

    const onRollback = useCallback(() => {
        setNewlyEnrolledGods([])
        setEnrollmentState(_ => ({...initialEnrollmentState}))
    }, [initialEnrollmentState])

    const shouldEnrollmentBeDisabled = useCallback(() => isPastDate(tournament.enrollmentEndTime), [tournament])
    const [isEnrollmentDisabled, setIsEnrollmentDisabled] = useState(() => shouldEnrollmentBeDisabled())
    useEffect(() => {
        const enrollmentInterval = setInterval(() => {
            setIsEnrollmentDisabled(shouldEnrollmentBeDisabled())
        }, 1000)
        return () => clearInterval(enrollmentInterval)
    }, [shouldEnrollmentBeDisabled])

    const onEnroll = useCallback((toEnroll: GenericToken) => {
        setNewlyEnrolledGods(previous => [...previous, toEnroll])
        setEnrollmentState(previous => {
            const newStaked = previous.staked.filter(staked => staked !== toEnroll.tokenId)
            const newEnrolled = [...previous.enrolled, toEnroll.tokenId]
            return {details: previous.details, staked: newStaked, enrolled: newEnrolled}
        })
    }, [setEnrollmentState])

    const fetchFromState = useCallback((toFetch: number[]) => {
        return toFetch.reduce((fetched, tokenId) => {
            const foundToken = enrollmentState.details.get(tokenId)
            return foundToken ? [...fetched, foundToken] : fetched
        }, new Array<EnrolledToken>())
    }, [enrollmentState])

    return <>
        <GenericLoader loading={loadingState}/>
        {!loadingState && <>
            <EnrollmentConfirmation
                account={account} gods={newlyEnrolledGods} tournament={tournament} onFinish={() => {
                refreshToEmptyState()
                setInitialEnrollmentState(enrollmentState)
            }} showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation}/>
            <GridContainer>
                <EnrollmentGrid>
                    <GridCell>
                        <TitleWithSeparator
                            title={"Gods on the battlefield"} separatorType={SeparatorType.THEME_SMALL}
                            description={"Metagods staked on the battlefield. Drag them to the enrollment list if you wish to participate."}/>
                    </GridCell>
                    <GridCell>
                        <TitleWithSeparator
                            title={"Enrolled Gods"} separatorType={SeparatorType.THEME_SMALL}
                            description={<EnrolledDescription
                                onConfirmEnroll={() => setShowConfirmation(true)}
                                onRollback={onRollback}
                                anyChangePerformed={!!newlyEnrolledGods.length}
                                tournament={tournament}
                                isEnrollmentDisabled={isEnrollmentDisabled}
                                signalTournamentStarted={signalTournamentStarted}/>}/>
                    </GridCell>
                    <GridCell>
                        <ComplexCell>
                            <Separator type={SeparatorType.WHITE_SMALL}/>
                            {enrollmentState.staked.length ? <StakedGodsContainer>
                                <SimpleTokensList tokens={fetchFromState(enrollmentState.staked)}
                                                  isEnrollmentDisabled={isEnrollmentDisabled}/>
                            </StakedGodsContainer> : <div>You have no more gods staked on the battlefield.</div>}
                        </ComplexCell>
                    </GridCell>
                    <GridCell>
                        <ComplexCell>
                            <Separator type={SeparatorType.WHITE_LARGE}/>
                            {isEnrollmentDisabled && !enrollmentState.enrolled.length && <div>
                                You have no gods enrolled in this tournament.
                            </div>}
                            {(!isEnrollmentDisabled || !!enrollmentState.enrolled.length) && <StakedGodsContainer>
                                <DroppableTokensArea onEnroll={onEnroll}
                                                     tokens={fetchFromState(enrollmentState.enrolled)}
                                                     isEnrollmentDisabled={isEnrollmentDisabled}/>
                            </StakedGodsContainer>}
                        </ComplexCell>
                    </GridCell>
                </EnrollmentGrid>
            </GridContainer>
        </>}
    </>
}

export default EnrollmentPhaseTournament