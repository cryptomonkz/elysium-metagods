import styled from "styled-components"
import {
    BOX_SHADOW,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FULL_HEIGHT,
    FULL_SIZE,
    FULL_SIZE_ABSOLUTE_POSITION,
    Spacing,
    Z_INDEX
} from "../../Shared/Constants/StylesConstants";
import {FullSizeImage, FullSizeVideo} from "../../Shared/Components/FullSizeImage";
import {SeparatorType} from "../../Shared/Components/Separator";
import PassesOwnedImage from "../../../assets/Icons/passesOwned.png";
import PassesStakedImage from "../../../assets/Icons/passesStaked.png";
import PowerIconImage from "../../../assets/Icons/powerIcon.png";
import StatsPanel from "../../Shared/Components/StatsPanel";
import {ApplicationState} from "../../Shared/State/ApplicationState";
import CelestialsState from "../../Shared/State/Celestials/CelestialsState";
import {
    getCelestialsStateFromApplication,
    refreshCelestialsState
} from "../../Shared/State/Celestials/CelestialsService";
import {useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from 'react'
import GenericLoader from "../../Shared/Components/GenericLoader";
import {ConnectWalletError} from "../../Shared/Components/ConnectWalletError";
import {doWithMounted} from "../../Shared/Utils/ComponentUtils";
import {
    approveMintPassContract,
    isMintPassContractApproved,
    stakePasses,
    unstakePasses
} from "../../Shared/Service/ContractService";
import {ActionsPanel, ActionTrigger} from "../../Shared/Components/ActionsPanel";
import GodsInput from "../../Shared/Components/GodsInput";
import {REFRESH_PASSES_INTERVAL} from "../../Shared/Constants/TimeoutConstants";
import CelestialsTokenBackgroundImage from "../../../assets/Images/mintPassBackground.png";
import {claimPasses} from "../../Shared/Service/AggregationService";
import {TitleWithSeparator} from "../../Shared/Components/Section";

enum CelestialsAction {
    APPROVE = 'APPROVE', STAKE = 'STAKE', UNSTAKE = 'UNSTAKE', CLAIM = 'CLAIM'
}

const CelestialsContainer = styled.div`
    ${FULL_SIZE}
    overflow: hidden;
    padding: ${Spacing.FIFTH};
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const CelestialsTokenContainer = styled.div`
    position: relative;
    ${FULL_SIZE}
    overflow: hidden;
    ${FLEX_CENTERED_CONTAINER}
`

const CelestialsTokenAnimationContainer = styled.div`
    position: relative;
    ${FULL_HEIGHT}
    padding: ${Spacing.THIRD};
`

const CelestialsTokenAnimationWrapper = styled.div`
    position: relative;
    ${FULL_SIZE}
`

const CelestialsTokenShadow = styled.div`
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    ${FULL_SIZE_ABSOLUTE_POSITION}
    ${BOX_SHADOW.INSET_MINT_PASS_SHADOW}
`

const CelestialsTokenAnimation = styled(FullSizeVideo)`
    z-index: ${Z_INDEX.RELATIVE_FIRST};
    object-fit: cover;
    position: relative;
`

const CelestialsActionPanel = styled.div`
    ${FULL_SIZE}
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    padding: 0 ${Spacing.FOURTH};
    align-items: stretch;
`

const CelestialsDescription = styled.div`
    text-align: start;
    color: ${Color.WHITE};
    margin: ${Spacing.SECOND} 0;
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const StatsPanelWithMargins = styled(StatsPanel)`
    margin: ${Spacing.FOURTH} 0;
`

const CelestialsButtons = ({account, celestialsState}: { account: string, celestialsState: CelestialsState}) => {
    const [encounteredError, setEncounteredError] = useState(false)
    const [isContractApproved, setIsContractApproved] = useState(false)
    const [showInputFor, setShowInputFor] = useState<string | undefined>()
    const [actionInProgress, setActionInProgress] = useState<string | undefined>()

    const computeApproval = useCallback(() => doWithMounted(isMounted => {
        isMintPassContractApproved(account).then(isApproved => isMounted.isMounted && setIsContractApproved(isApproved))
    }), [account])

    useEffect(() => computeApproval(), [computeApproval])

    const isActionThatRequiresInput = useCallback(() => {
        return showInputFor &&
            [CelestialsAction.STAKE.toString(), CelestialsAction.UNSTAKE.toString()].includes(showInputFor)
    }, [showInputFor])

    const doOnConfirm = useCallback((action: string) => doWithMounted(isMounted => {
        isMounted.isMounted && setEncounteredError(false)
        isMounted.isMounted && setActionInProgress(action)
    }), [])

    const doOnError = useCallback(() => doWithMounted(isMounted => {
        isMounted.isMounted && setEncounteredError(true)
    }), [])

    const doOnFinish = useCallback(() => doWithMounted(isMounted => {
        isMounted.isMounted && setShowInputFor(undefined)
        isMounted.isMounted && setActionInProgress(undefined)
    }), [])

    const performAction = useCallback((action: string, toDo: (account: string) => Promise<void>, onFinish: () => void) => {
        doOnConfirm(action)
        toDo(account).catch(doOnError).finally(() => {doOnFinish(); onFinish()})
    }, [account, doOnConfirm, doOnError, doOnFinish])

    const performActionWithRefresh = useCallback((action: string, toDo: (account: string) => Promise<void>) => {
        performAction(action, toDo, () => refreshCelestialsState(account))
    }, [account, performAction])

    const getInputPlaceholder = useCallback(() => {
        switch (showInputFor) {
            case CelestialsAction.STAKE:
                return 'Stake amount'
            case CelestialsAction.UNSTAKE:
                return 'Unstake amount'
        }
    }, [showInputFor])

    const getMaxAmount = useCallback(() => {
        switch (showInputFor) {
            case CelestialsAction.STAKE:
                return celestialsState.passesUnstaked
            case CelestialsAction.UNSTAKE:
                return celestialsState.passesStaked
            default:
                return 0
        }
    }, [showInputFor, celestialsState])

    const performActionWithInput = useCallback((amount: number) => {
        switch (showInputFor) {
            case CelestialsAction.STAKE:
                performActionWithRefresh(showInputFor, (account) => stakePasses(account, amount))
                break
            case CelestialsAction.UNSTAKE:
                performActionWithRefresh(showInputFor, (account) => unstakePasses(account, amount))
                break
        }
    }, [showInputFor, performActionWithRefresh])

    return <>
        <ActionsPanel encounteredError={encounteredError} actionsList={<>
            {!isContractApproved && <ActionTrigger
                actionInProgress={actionInProgress} currentAction={CelestialsAction.APPROVE} title={'APPROVE CONTRACT'}
                onClick={action => performAction(action, approveMintPassContract, () => computeApproval())}/>}
            {isContractApproved && <>
                <ActionTrigger isDisabled={!celestialsState.passesUnstaked}
                    actionInProgress={actionInProgress} currentAction={CelestialsAction.STAKE}
                    title={'STAKE'} onClick={setShowInputFor}/>
                <ActionTrigger isDisabled={!celestialsState.passesStaked}
                    actionInProgress={actionInProgress} currentAction={CelestialsAction.UNSTAKE}
                    title={'UNSTAKE'} onClick={setShowInputFor}/>
                <ActionTrigger isDisabled={!celestialsState.tokensYielded}
                    actionInProgress={actionInProgress} currentAction={CelestialsAction.CLAIM}
                    title={'CLAIM ALL'} onClick={action => performActionWithRefresh(action, claimPasses)}/>
            </>}
        </>}/>
        { isActionThatRequiresInput() && <GodsInput
            placeholder={getInputPlaceholder()}
            additionalProperties={{ min: 0, max: getMaxAmount() }}
            confirmAction={performActionWithInput}
            cancelAction={doOnFinish} inputDisabled={!!actionInProgress}/> }
    </>
}

const CelestialsData = ({account}: { account: string}) => {
    const celestialsState = useSelector<ApplicationState, CelestialsState>(applicationState => (
        getCelestialsStateFromApplication(applicationState)
    ))

    return <CelestialsContainer>
        <CelestialsTokenContainer>
            <CelestialsTokenAnimationContainer>
                <FullSizeImage src={CelestialsTokenBackgroundImage} alt={"CelestialsTokenBackground"}/>
                <CelestialsTokenAnimationWrapper>
                    <CelestialsTokenShadow/>
                    <CelestialsTokenAnimation loop autoPlay muted>
                        <source src="https://storage.googleapis.com/elysium-metagods-mintpass/celestial_mint_pass_small.mp4" type="video/mp4" />
                    </CelestialsTokenAnimation>
                </CelestialsTokenAnimationWrapper>
            </CelestialsTokenAnimationContainer>
        </CelestialsTokenContainer>
        <CelestialsActionPanel>
            <TitleWithSeparator
                title={"CELESTIALS"}
                titleStyles={{textAlign: 'start', fontSize: fontSizeToPixels(FontSize.MEDIUM_TO_LARGE)}}
                separatorType={SeparatorType.THEME_SMALL}/>
            <CelestialsDescription>
                Here you can find information about the Celestial Passes. Stake, Unstake, or claim the Yielded $GOD tokens.
            </CelestialsDescription>
            <StatsPanelWithMargins entries={[
                { title: "Amounts of Passes staked", amount: celestialsState.passesStaked, icon: PassesStakedImage, },
                { title: "Amount of Passes owned", amount: celestialsState.passesUnstaked, icon: PassesOwnedImage, },
                { title: "Amount of Tokens yielded", amount: celestialsState.tokensYielded, icon: PowerIconImage, },
            ]}/>
            <CelestialsButtons account={account} celestialsState={celestialsState}/>
        </CelestialsActionPanel>
    </CelestialsContainer>
}

const CelestialsForAccount = ({account, loadingData}: { account: string, loadingData: boolean }) => <>
    {!loadingData && <CelestialsData account={account}/>}
    <GenericLoader loading={loadingData}/>
</>

const CelestialsWithLoader = ({account}: { account: string }) => {
    const [loadingCelestials, setLoadingCelestials] = useState(false)
    useEffect(() => doWithMounted(isMounted => {
        setLoadingCelestials(true)
        refreshCelestialsState(account).finally(() => isMounted.isMounted && setLoadingCelestials(false))
        const refreshCelestialsInterval = setInterval(() => refreshCelestialsState(account), REFRESH_PASSES_INTERVAL)
        return () => clearInterval(refreshCelestialsInterval)
    }), [account, setLoadingCelestials])
    return <CelestialsForAccount account={account} loadingData={loadingCelestials}/>
}

const Celestials = () => <ConnectWalletError>{(account) => <>
    <CelestialsWithLoader account={account}/>
</>}</ConnectWalletError>

export default Celestials