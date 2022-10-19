import React, {useCallback, useEffect, useState} from "react";
import {resetGreatHall, signalBuildGreatHallState} from "../../Shared/State/GreatHall/GreatHallService";
import GenericLoader from "../../Shared/Components/GenericLoader";
import {isGreatHallDataValid} from "../../Shared/State/GreatHall/GreatHallDataState";
import GreatHallData from "./GreatHallData";
import {refreshClaimState} from "../../Shared/State/GreatHall/ClaimService";
import Vault from "./Vault";
import {refreshVaultState} from "../../Shared/State/Vault/VaultService";
import {doWithMounted} from "../../Shared/Utils/ComponentUtils";
import HighlightableAreaMessage from "../../Shared/Components/HighlightableAreaMessage";
import {getStakingStatus, StakingStatusResponse} from "../../Shared/Service/PublicWalletService";
import Weapons from "./Weapons";
import {TabsWithAccount} from "../../Shared/Components/Tab/Tabs";

enum TAB {
    STAKING = 'STAKING', VAULT = 'VAULT', WEAPONS = 'WEAPONS'
}

const getTabs = () => {
    return Object.keys(TAB).map(tabName => ({name: tabName, value: TAB[tabName as keyof typeof TAB]}))
}

const GreatHallForAccount = ({account, loadingTokens, isDataValid}: {
    account: string, loadingTokens: boolean, isDataValid: boolean
}) => <>
    {!loadingTokens && <>
        {isDataValid && <GreatHallData account={account}/>}
        {!isDataValid && <HighlightableAreaMessage>You do not own any Elysium NFTs!</HighlightableAreaMessage>}
    </>}
    <GenericLoader loading={loadingTokens}/>
</>

const VaultForAccount = ({account, loadingData}: { account: string, loadingData: boolean }) => <>
    {!loadingData && <Vault account={account}/>}
    <GenericLoader loading={loadingData}/>
</>

const TabsData = ({account, selectedTab}: {account: string, selectedTab: TAB}) => {
    const [isStakingDataValid, setIsStakingDataValid] = useState(true)
    const [loadingStakingData, setLoadingStakingData] = useState(true)
    const [loadingClaimsData, setLoadingClaimsData] = useState(true)
    const [loadingVaultData, setLoadingVaultData] = useState(true)

    const resetState = useCallback(() => {
        setIsStakingDataValid(true)
        setLoadingStakingData(true)
        setLoadingVaultData(true)
    }, [])

    const doAfterGetStakingStatus = useCallback((tokens: StakingStatusResponse) => {
        signalBuildGreatHallState(tokens)
        setIsStakingDataValid(isGreatHallDataValid(tokens))
    }, [])

    const refreshStakingStatus = useCallback(() => doWithMounted(isMounted => {
        getStakingStatus(account).then((tokens) => {
            isMounted.isMounted && doAfterGetStakingStatus(tokens)
        }).finally(() => isMounted.isMounted && setLoadingStakingData(false))
    }), [account, doAfterGetStakingStatus])

    useEffect(() => doWithMounted(isMounted => {
        resetState()
        resetGreatHall()
        refreshStakingStatus()
        refreshClaimState(account).finally(() => isMounted.isMounted && setLoadingClaimsData(false))
        refreshVaultState(account).finally(() => isMounted.isMounted && setLoadingVaultData(false))
    }), [account, resetState, refreshStakingStatus])

    return <>
        {selectedTab === TAB.STAKING && <GreatHallForAccount
            account={account} isDataValid={isStakingDataValid} loadingTokens={loadingStakingData || loadingClaimsData}/>}
        {selectedTab === TAB.VAULT && <VaultForAccount account={account} loadingData={loadingVaultData}/>}
        {selectedTab === TAB.WEAPONS && <Weapons account={account} refreshStakingStatus={refreshStakingStatus}/>}
    </>
}

const TheGreatHall = () => <TabsWithAccount defaultTab={TAB.STAKING} tabs={getTabs()}>
    {(account, selectedTab) => <TabsData account={account} selectedTab={selectedTab}/>}
</TabsWithAccount>

export default TheGreatHall