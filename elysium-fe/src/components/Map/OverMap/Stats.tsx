import styled from "styled-components";
import {getAbsolutePosition} from "../../Shared/Utils/StylesUtils";
import {
    ALL_POINTER_EVENTS,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FULL_SIZE_CENTERED,
    NO_POINTER_EVENTS,
    Spacing,
    Z_INDEX
} from "../../Shared/Constants/StylesConstants";
import {device} from "../../Shared/Constants/MediaQueries";
import StatsBackgroundImage from "../../../assets/Images/statsBackground.png"
import {FullSizeImage} from "../../Shared/Components/FullSizeImage";
import {refreshTokenRelatedState} from "../../Shared/State/GreatHall/GreatHallService";
import {REFRESH_CLAIM_INTERVAL} from "../../Shared/Constants/TimeoutConstants";
import {useWeb3React} from "@web3-react/core";
import {useCallback, useEffect, useState} from "react";
import {Separator, SeparatorType} from "../../Shared/Components/Separator";
import {ApplicationState} from "../../Shared/State/ApplicationState";
import VaultState from "../../Shared/State/Vault/VaultState";
import {getVaultStateFromApplication, refreshVaultState} from "../../Shared/State/Vault/VaultService";
import {useSelector} from "react-redux";
import {ElysiumSpinner} from "../../Shared/Components/ElysiumSpinner";
import GodIconImage from "../../../assets/Icons/godIcon.png";
import BattleIconImage from "../../../assets/Icons/battleIcon.png";
import PowerIconImage from "../../../assets/Icons/powerIcon.png";
import RedeemableIconImage from "../../../assets/Icons/redeemableIcon.png";
import StatsPanel from "../../Shared/Components/StatsPanel";
import {TitleWithSeparator} from "../../Shared/Components/Section";
import {ThemeButton} from "../../Shared/Components/StyledButton";
import {showClaimFailed, showMintPassApproveRequired} from "../../Shared/Utils/ToastUtils";
import {claimAllTokens, claimPasses} from "../../Shared/Service/AggregationService";
import {isMintPassContractApproved} from "../../Shared/Service/ContractService";

const StatsWithPosition = styled.div`
    ${NO_POINTER_EVENTS}
    transform: translate(0, -50%);
    ${getAbsolutePosition('50%', undefined, undefined, '20px')}
    z-index: ${Z_INDEX.OVER_MAP};
    
    @media ${device.tablet} {
        ${getAbsolutePosition('50%', undefined, undefined, '30px')}
    }
`

const StatsBackgroundContainer = styled(FullSizeImage)`
    z-index: ${Z_INDEX.RELATIVE_FIRST};
`

const StatsContent = styled.div<{ $loading: boolean }>`
    position: relative;
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: ${Spacing.FOURTH};
    visibility: ${props => (!!props.$loading ? 'hidden' : 'visible')};
`

const CenteredSpinner = styled(ElysiumSpinner)`
    width: ${Spacing.FIFTH};
    height: ${Spacing.FIFTH};
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    ${FULL_SIZE_CENTERED}
`

const QuickAccessPanel = styled.div`
    ${FLEX_CENTERED_CONTAINER}
`

const RestrictedContainer = styled.div`
    ${ALL_POINTER_EVENTS}
`

const SmallButton = styled(ThemeButton)`
    padding: ${Spacing.FIRST};
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
    margin: 0 ${Spacing.FIRST};
`

const StatsWithAccount = ({account}: { account: string }) => {
    const [claiming, setClaiming] = useState(false)

    const [loadingStats, setLoadingStats] = useState(false)
    useEffect(() => {
        setLoadingStats(true)
        refreshVaultState(account).finally(() => setLoadingStats(false))
        const refreshClaimsInterval = setInterval(() => refreshTokenRelatedState(account), REFRESH_CLAIM_INTERVAL)
        return () => clearInterval(refreshClaimsInterval)
    }, [account])

    const vaultState = useSelector<ApplicationState, VaultState>(applicationState => (
        getVaultStateFromApplication(applicationState)
    ))

    const doClaim = useCallback((claimAction: (account: string) => Promise<void>) => {
        setClaiming(true)
        claimAction(account)
            .then(() => refreshTokenRelatedState(account))
            .catch(() => showClaimFailed())
            .finally(() => setClaiming(false))
    }, [account])

    const claimPassesIfApproved = useCallback(() => {
        isMintPassContractApproved(account).then(isApproved => {
            isApproved && doClaim(claimPasses)
            !isApproved && showMintPassApproveRequired()
        })
    }, [account, doClaim])

    return <StatsWithPosition>
        <StatsBackgroundContainer src={StatsBackgroundImage} alt={"StatsBackground"}/>
        <CenteredSpinner loading={loadingStats}/>
        <StatsContent $loading={loadingStats}>
            <TitleWithSeparator
                title={"Your Stats"}
                titleStyles={{fontSize: fontSizeToPixels(FontSize.MEDIUM_TO_LARGE)}}
                separatorType={SeparatorType.THEME_SMALL}/>
            <StatsPanel entries={[
                { title: "MetaGods", amount: vaultState.unstakedMetaGods, icon: GodIconImage, },
                { title: "MetaGods in battle", amount: vaultState.stakedMetaGods, icon: BattleIconImage, },
                { title: "$GOD Tokens", amount: vaultState.inGameBalance, icon: PowerIconImage, },
                { title: "$GOD Tokens Redeemable", amount: vaultState.claimableBalance + vaultState.claimablePasses, icon: RedeemableIconImage, },
            ]} withTextConstraint={true}/>
            <Separator type={SeparatorType.THEME_SMALL}/>
            <QuickAccessPanel>
                <RestrictedContainer>
                    <SmallButton disabled={!vaultState.claimableBalance || claiming}
                                 onClick={() => doClaim(claimAllTokens)}>CLAIM STAKING YIELD</SmallButton>
                    <SmallButton disabled={!vaultState.claimablePasses || claiming}
                                 onClick={claimPassesIfApproved}>CLAIM PASSES</SmallButton>
                </RestrictedContainer>
            </QuickAccessPanel>
        </StatsContent>
    </StatsWithPosition>
}

const Stats = () => {
    const {account} = useWeb3React()
    return <>{account && <StatsWithAccount account={account}/>}</>
}


export default Stats
