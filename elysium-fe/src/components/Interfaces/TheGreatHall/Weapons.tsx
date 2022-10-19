import styled from "styled-components"
import {
    BOX_SHADOW,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FontWeight,
    FULL_HEIGHT,
    FULL_SIZE,
    FULL_SIZE_ABSOLUTE_POSITION,
    FULL_WIDTH,
    Spacing,
    Z_INDEX
} from "../../Shared/Constants/StylesConstants";
import {FullSizeImage} from "../../Shared/Components/FullSizeImage";
import {SeparatorType} from "../../Shared/Components/Separator";
import React, {useCallback, useEffect, useState} from 'react'
import {doWithMounted} from "../../Shared/Utils/ComponentUtils";
import {
    areWeaponsPaused,
    getMintedWeapons,
    getWeaponsCurrentMaxSupply,
    getWeaponsSupply
} from "../../Shared/Service/ContractService";
import {ActionsPanel, ActionTrigger} from "../../Shared/Components/ActionsPanel";
import GodsInput from "../../Shared/Components/GodsInput";
import {REFRESH_STAKING_STATUS_TIMEOUT, REFRESH_WEAPONS_COUNT_INTERVAL} from "../../Shared/Constants/TimeoutConstants";
import WeaponsTokenBackgroundImage from "../../../assets/Images/mintPassBackground.png";
import {TitleWithSeparator} from "../../Shared/Components/Section";
import {PER_WALLET_LIMIT} from "../../Shared/Constants/ContractConstants";
import StyledProgressBar from "../../Shared/Components/StyledProgressBar";
import {mintWeapons} from "../../Shared/Service/AggregationService";
import {MINT_WEAPONS_BLOCK_LIFETIME} from "../../Shared/Constants/TokenConstants";
import {showMintWeaponsRequestFailed} from "../../Shared/Utils/ToastUtils";

enum WeaponsAction {
    MINT = 'MINT',
}

const WeaponsContainer = styled.div`
    ${FULL_SIZE}
    overflow: hidden;
    padding: ${Spacing.FIFTH};
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const WeaponsTokenContainer = styled.div`
    position: relative;
    ${FULL_SIZE}
    overflow: hidden;
    ${FLEX_CENTERED_CONTAINER}
`

const WeaponsTokenAnimationContainer = styled.div`
    position: relative;
    ${FULL_HEIGHT}
    padding: ${Spacing.THIRD};
`

const WeaponsTokenAnimationWrapper = styled.div`
    position: relative;
    ${FULL_SIZE}
`

const WeaponsTokenShadow = styled.div`
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    ${FULL_SIZE_ABSOLUTE_POSITION}
    ${BOX_SHADOW.INSET_MINT_PASS_SHADOW}
`

const WeaponsTokenAnimation = styled(FullSizeImage)`
    z-index: ${Z_INDEX.RELATIVE_FIRST};
    object-fit: cover;
    position: relative;
`

const WeaponsActionPanel = styled.div`
    ${FULL_SIZE}
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    padding: 0 ${Spacing.FOURTH};
    align-items: stretch;
`

const WeaponsDescription = styled.div`
    text-align: center;
    color: ${Color.WHITE};
    margin: ${Spacing.SECOND} 0;
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const DetailContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    margin: ${Spacing.SECOND} 0;
`

const MintCount = styled.div`
    margin: 0 ${Spacing.SECOND};
`

const MintPrice = styled.div`
    color: ${Color.DARK_GOLDEN};
    font-weight: ${FontWeight.EXTRA_LARGE};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

const WarningMessage = styled.div`
    ${FULL_WIDTH}
    margin-top: ${Spacing.THIRD};
    max-width: 500px;
    align-self: center;
`

const BlockLifetimeHighlight = styled.span`
    color: ${Color.GREEN_DARK};
    font-weight: ${FontWeight.EXTRA_LARGE};
`

const WeaponsButtons = ({account, isContractPaused, weaponsCount, alreadyMinted, maxSupply, isMintDisabled, refreshAfterMint}: {
    account: string, isContractPaused: boolean, weaponsCount: number,
    alreadyMinted: number, isMintDisabled: boolean, maxSupply: number, refreshAfterMint: () => void
}) => {
    const [showInput, setShowInput] = useState(false)
    const [encounteredError, setEncounteredError] = useState(false)
    const [actionInProgress, setActionInProgress] = useState<string | undefined>()

    const doOnConfirm = useCallback(() => doWithMounted(isMounted => {
        isMounted.isMounted && setEncounteredError(false)
        isMounted.isMounted && setActionInProgress(WeaponsAction.MINT)
    }), [])

    const doOnError = useCallback((error) => doWithMounted(isMounted => {
        isMounted.isMounted && setEncounteredError(true)
        isMounted.isMounted && showMintWeaponsRequestFailed((error as Error)?.message)
    }), [])

    const doOnFinish = useCallback(() => doWithMounted(isMounted => {
        isMounted.isMounted && setShowInput(false)
        isMounted.isMounted && setActionInProgress(undefined)
        isMounted.isMounted && setTimeout(() => refreshAfterMint(), REFRESH_STAKING_STATUS_TIMEOUT);
    }), [refreshAfterMint])

    const performMint = useCallback((amount: number) => {
        doOnConfirm()
        mintWeapons(account, amount).catch(doOnError).finally(doOnFinish)
    }, [account, doOnConfirm, doOnError, doOnFinish])

    return <>
        <ActionsPanel encounteredError={encounteredError} actionsList={<>
            <ActionTrigger isDisabled={isMintDisabled || isContractPaused}
                actionInProgress={actionInProgress} currentAction={WeaponsAction.MINT}
                title={'MINT'} onClick={() => setShowInput(true)}/>
        </>}/>
        { !!showInput && <>
            <GodsInput
            placeholder={"Amount to mint"}
            additionalProperties={{ min: 0, max: Math.min(maxSupply - weaponsCount, PER_WALLET_LIMIT - alreadyMinted) }}
            confirmAction={performMint}
            inputDisabled={!!actionInProgress || isMintDisabled || isContractPaused}
            cancelAction={doOnFinish}/>
            <WarningMessage>
                Proceeding forward will result in the chosen amount being blocked
                for approximately <BlockLifetimeHighlight>{MINT_WEAPONS_BLOCK_LIFETIME} hours</BlockLifetimeHighlight> if
                the transaction is cancelled or unsuccessful. Please make sure to adjust you gas fees so that your
                transaction can be completed in at most the amount of time previously specified.
            </WarningMessage>
        </> }
    </>
}

const WeaponsData = ({account, isContractPaused, weaponsCount, alreadyMinted, maxSupply, refreshAfterMint}: {
    account: string, isContractPaused: boolean,
    weaponsCount: number, alreadyMinted: number, maxSupply: number, refreshAfterMint: () => void
}) => {
    const [isMintDisabled, setIsMintDisabled] = useState(false)

    useEffect(() => {
        const isDisabled = (alreadyMinted >= PER_WALLET_LIMIT) ||  (weaponsCount >= maxSupply)
        setIsMintDisabled(isDisabled)
    }, [alreadyMinted, weaponsCount, maxSupply])

    return <WeaponsContainer>
        <WeaponsTokenContainer>
            <WeaponsTokenAnimationContainer>
                <FullSizeImage src={WeaponsTokenBackgroundImage} alt={"WeaponsTokenBackground"}/>
                <WeaponsTokenAnimationWrapper>
                    <WeaponsTokenShadow/>
                    <WeaponsTokenAnimation alt={"WeaponsTokenAnimation"}
                        src="https://storage.googleapis.com/elysium-metagods-weapons/weapons_preview.gif"/>
                </WeaponsTokenAnimationWrapper>
            </WeaponsTokenAnimationContainer>
        </WeaponsTokenContainer>
        <WeaponsActionPanel>
            <TitleWithSeparator
                title={"WEAPONS"}
                titleStyles={{textAlign: 'center', fontSize: fontSizeToPixels(FontSize.LARGE)}}
                separatorType={SeparatorType.THEME_SMALL}/>
            <WeaponsDescription>
                Use weapons to increase your MetaGods fighting chances against the Titans.
            </WeaponsDescription>
            <DetailContainer>
                <MintCount>{weaponsCount}</MintCount>
                <StyledProgressBar showValue={false} value={Math.floor(weaponsCount / maxSupply * 100)}/>
                <MintCount>{maxSupply}</MintCount>
            </DetailContainer>
            <DetailContainer>
                Yield: 50 $GOD/day
            </DetailContainer>
            <DetailContainer>
                CELESTIALS ONLY
            </DetailContainer>
            <DetailContainer>
                <MintPrice>Mint: 9999 $GOD</MintPrice>
            </DetailContainer>
            <DetailContainer>
                {isMintDisabled ? (!!alreadyMinted ? ('You have already minted ' + alreadyMinted + ' weapons') : '') :
                    ('Limit per wallet: ' + PER_WALLET_LIMIT + ' weapons')}
            </DetailContainer>
            <WeaponsButtons account={account} isContractPaused={isContractPaused}
                            weaponsCount={weaponsCount} alreadyMinted={alreadyMinted} maxSupply={maxSupply}
                            isMintDisabled={isMintDisabled} refreshAfterMint={refreshAfterMint}/>
        </WeaponsActionPanel>
    </WeaponsContainer>
}

const WeaponsWithLoader = ({account, refreshStakingStatus}: { account: string, refreshStakingStatus: () => void }) => {
    const [weaponsCount, setWeaponsCount] = useState(0)
    const [alreadyMinted, setAlreadyMinted] = useState(0)
    const [maxSupply, setMaxSupply] = useState(0)
    const [isContractPaused, setIsContractPaused] = useState(false)

    const refreshWeapons = useCallback((isMounted) => {
        getWeaponsSupply().then(count => !!isMounted.isMounted && setWeaponsCount(count))
    }, [])

    const refreshMinted = useCallback(() => {
        getMintedWeapons(account).then(count => setAlreadyMinted(count))
    }, [account])

    const refreshSupply = useCallback(() => {
        getWeaponsCurrentMaxSupply().then(count => setMaxSupply(count))
    }, [])

    const refreshPaused = useCallback(() => {
        areWeaponsPaused().then(isPaused => setIsContractPaused(isPaused))
    }, [])

    const refreshAfterMint = useCallback(() => {
        refreshMinted()
        refreshStakingStatus()
    }, [refreshMinted, refreshStakingStatus])

    useEffect(() => doWithMounted(isMounted => {
        isMounted.isMounted && refreshSupply()
        isMounted.isMounted && refreshPaused()
        isMounted.isMounted && refreshMinted()
        isMounted.isMounted && refreshWeapons(isMounted)
        const refreshWeaponsInterval = setInterval(() => refreshWeapons(isMounted), REFRESH_WEAPONS_COUNT_INTERVAL)
        return () => clearInterval(refreshWeaponsInterval)
    }), [refreshWeapons, refreshMinted, refreshPaused, refreshSupply])

    return <WeaponsData account={account} isContractPaused={isContractPaused}
                        weaponsCount={weaponsCount} alreadyMinted={alreadyMinted} maxSupply={maxSupply}
                        refreshAfterMint={refreshAfterMint}/>
}

const Weapons = ({account, refreshStakingStatus}: { account: string, refreshStakingStatus: () => void }) => <WeaponsWithLoader
    account={account} refreshStakingStatus={refreshStakingStatus}/>

export default Weapons