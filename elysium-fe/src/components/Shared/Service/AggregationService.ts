import {EditOperation} from "../State/GreatHall/EditState";
import {ItemType} from "../State/GreatHall/ItemType";
import {GenericToken} from "../Models/Token/GenericToken";
import VaultState from "../State/Vault/VaultState";
import CelestialsState from "../State/Celestials/CelestialsState";
import {getVaultStatus} from "./PublicWalletService";
import {
    showBundleAcquired,
    showGodsEnrollmentFinished,
    showQuestAccepted, showRewardClaimed,
    showTokenMintFinished,
    showTokensTransferred,
    showTokenTransactionFinished
} from "../Utils/ToastUtils";
import {doAuthenticationIfNecessary} from "./AuthenticationService";
import {callTransferTokens, signWithdrawRequest, signMintWeaponsRequest} from "./WalletService";
import {
    callDepositTokens,
    callWithdrawTokens,
    callMintWeapons,
    claimAllMintPasses,
    getCelestialPassesYield,
    getExternalBalance,
    getStakedCelestialPasses,
    getUnstakedCelestialPasses, callClaimERC721Asset, claimERC1155Asset, claimERC20Asset, areRewardsClaimed
} from "./ContractService";
import {
    callChangeStakeTypes,
    callChangeTokenLinks,
    callClaimAllTokens,
    callClaimTokens,
    callStakeTokens,
    callUnstakeTokens
} from "./StakingService";
import {findTokensByType} from "../Utils/TokenUtils";
import {isPairedAreaOperation, operationsToTokens} from "../State/GreatHall/EditService";
import {buildStakedGods, buildWeaponsPairings} from "../Utils/TokenStakeUtils";
import {showClaims} from "../Utils/ClaimUtils";
import {acceptQuest, enrollGods} from "./TournamentService";
import {doBuyBundle, doClaimReward, doOpenBox, OpenedBoxResponse} from "./LootboxesService";
import {RewardTokenStandard} from "../Models/Lootboxes/RewardTokenStandard";

export const getVaultData = async (account: string): Promise<VaultState> => {
    const inGameVaultState = await getVaultStatus(account)
    const externalWalletBalance = await getExternalBalance(account)
    const claimablePasses = await getCelestialPassesYield(account)
    return ({
        externalWalletBalance, claimablePasses,
        unstakedMetaGods: inGameVaultState.godsCount,
        stakedMetaGods: inGameVaultState.stakedGodsCount,
        inGameBalance: inGameVaultState.inGameBalance,
        blockedBalance: inGameVaultState.blockedBalance,
        claimableBalance: inGameVaultState.claimableBalance,
    })
}

export const getCelestialsData = async (account: string): Promise<CelestialsState> => {
    const passesUnstaked = await getUnstakedCelestialPasses(account)
    const passesStaked = await getStakedCelestialPasses(account)
    const tokensYielded = await getCelestialPassesYield(account)
    return ({ passesUnstaked, passesStaked, tokensYielded })
}

export const depositTokens = async (account: string, amount: number): Promise<void> => {
    await callDepositTokens(account, amount)
    showTokenTransactionFinished()
}

export const withdrawTokens = async (account: string, amount: number): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    await callWithdrawTokens(account, await signWithdrawRequest(amount))
    showTokenTransactionFinished()
}

export const mintWeapons = async (account: string, amount: number): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    await callMintWeapons(account, await signMintWeaponsRequest(amount))
    showTokenMintFinished()
}

export const claimPasses = async (account: string): Promise<void> => {
    await claimAllMintPasses(account)
    showTokenTransactionFinished()
}

export const transferTokens = async (account: string, amount: number, recipient: string): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    await callTransferTokens(amount, recipient)
    showTokensTransferred(amount, recipient)
}

export const claimAllTokens = async (account: string): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    showClaims(await callClaimAllTokens())
}

export const claimTokens = async (account: string, tokens: GenericToken[]): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    const gods = findTokensByType(tokens, ItemType.GOD).map(token => token.tokenId)
    const weapons = findTokensByType(tokens, ItemType.WEAPON).map(token => token.tokenId)
    showClaims(await callClaimTokens(gods, weapons))
}

export const changeStakeTypes = async (account: string, operations: EditOperation[]): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    showClaims(await callChangeStakeTypes(buildStakedGods(operations)))
}

export const changeTokenLinks = async (account: string, operations: EditOperation[]): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    const pairedWeapons = buildWeaponsPairings(operations)
    const unpairedWeapons = operationsToTokens(operations.filter(operation => !isPairedAreaOperation(operation)))
        .map(token => token.tokenId)
    showClaims(await callChangeTokenLinks(pairedWeapons, unpairedWeapons))
}

export const unstakeTokens = async (account: string, operations: EditOperation[]): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    const gods = findTokensByType(operationsToTokens(operations), ItemType.GOD).map(token => token.tokenId)
    const weapons = findTokensByType(operationsToTokens(operations), ItemType.WEAPON).map(token => token.tokenId)
    showClaims(await callUnstakeTokens(gods, weapons))
}

export const stakeTokens = async (account: string, operations: EditOperation[]): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    const stakedGods = buildStakedGods(operations)
    const stakedWeapons = findTokensByType(operationsToTokens(operations), ItemType.WEAPON).map(token => token.tokenId)
    const stakedPairings = buildWeaponsPairings(operations)
    showClaims(await callStakeTokens(stakedGods, stakedWeapons, stakedPairings))
}

export const enrollGodsInTournament = async (account: string, gods: number[]): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    await enrollGods(gods)
    showGodsEnrollmentFinished()
}

export const acceptQuestInTournament = async (account: string, godId: number, questId: number): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    await acceptQuest(godId, questId)
    showQuestAccepted()
}

export const buyBundle = async (account: string, bundleId: number): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    await doBuyBundle(bundleId)
    showBundleAcquired()
}

export const openOwnedBox = async (account: string, lootBoxId: number): Promise<OpenedBoxResponse> => {
    await doAuthenticationIfNecessary(account)
    return await doOpenBox(lootBoxId)
}

export const claimReward = async (account: string, rewardId: number): Promise<void> => {
    await doAuthenticationIfNecessary(account)
    const claimResponse = await doClaimReward(rewardId)
    switch (claimResponse.tokenStandard) {
        case RewardTokenStandard.ERC20:
            await claimERC20Asset(account, claimResponse)
            break;
        case RewardTokenStandard.ERC721:
            await callClaimERC721Asset(account, claimResponse)
            break;
        case RewardTokenStandard.ERC1155:
            await claimERC1155Asset(account, claimResponse)
            break;
        default:
            throw new Error("Standard has not been defined")
    }
    showRewardClaimed()
}

export const getAlreadyClaimedRewards = async (rewardIds: number[]): Promise<number[]> => {
    const areClaimed = await areRewardsClaimed(rewardIds)
    return rewardIds.filter((rewardId, position) => areClaimed[position])
}


