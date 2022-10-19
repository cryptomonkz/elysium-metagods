import {fromWei, toWei} from "../Utils/Web3Utils";
import {
    getLootBoxRewardContract,
    getMintPassContract,
    getMintPassStakingContract,
    getTokensContract, getWeaponsContract
} from "../State/Web3/Web3Service";
import {DEFAULT_MINT_PASS_ID} from "../Constants/TokenConstants";
import {MINT_PASS_STAKING_ADDRESS} from "../Constants/ContractConstants";
import {SignAmountResponse, SignMintWeaponsResponse} from "./WalletService";
import {RewardClaimResponse} from "../Models/Lootboxes/RewardClaimResponse";

export const getExternalBalance = async (account: string): Promise<number> => {
    try{
        return fromWei(await getTokensContract()?.methods?.balanceOf(account)?.call())
    } catch {
        return 0
    }
}

export const getUnstakedCelestialPasses = async (account: string): Promise<number> => {
    try{
        return Number(await getMintPassContract()?.methods?.balanceOf(account, DEFAULT_MINT_PASS_ID)?.call())
    } catch {
        return 0
    }
}

export const getStakedCelestialPasses = async (account: string): Promise<number> => {
    try{
        return Number(await getMintPassStakingContract()?.methods?.numberOfStakedPassesByWallet(account)?.call())
    } catch {
        return 0
    }
}

export const getCelestialPassesYield = async (account: string): Promise<number> => {
    try{
        return fromWei(await getMintPassStakingContract()?.methods?.calculateMetaPassesYield(account)?.call())
    } catch {
        return 0
    }
}

export const getWeaponsSupply = async (): Promise<number> => {
    try{
        return Number(await getWeaponsContract()?.methods?.totalSupply()?.call())
    } catch {
        return 0
    }
}

export const getMintedWeapons = async (account: string): Promise<number> => {
    try{
        return Number(await getWeaponsContract()?.methods?.mintedByAddress(account)?.call())
    } catch {
        return 0
    }
}

export const getWeaponsCurrentMaxSupply = async (): Promise<number> => {
    try{
        return Number(await getWeaponsContract()?.methods?.currentSupply()?.call())
    } catch {
        return 0
    }
}

export const areWeaponsPaused = async (): Promise<boolean> => {
    try{
        return !!(await getWeaponsContract()?.methods?.paused()?.call())
    } catch {
        return true
    }
}

export const isMintPassContractApproved = async (account: string): Promise<boolean> => {
    try {
        return (await getMintPassContract()?.methods?.isApprovedForAll(account, MINT_PASS_STAKING_ADDRESS)?.call()) || false
    } catch {
        return false
    }
}

export const areRewardsClaimed = async (rewards: number[]): Promise<boolean[]> => {
    try {
        return (await getLootBoxRewardContract()?.methods?.areRewardsClaimed(rewards)?.call()) || []
    } catch {
        return []
    }
}

export const approveMintPassContract = async (account: string): Promise<void> => {
    try {
        await getMintPassContract()?.methods?.setApprovalForAll(MINT_PASS_STAKING_ADDRESS, true)?.send({ from: account })
    } catch {
        throw new Error("Could not approve the Mint Pass contract")
    }
}

export const stakePasses = async (account: string, amount: number): Promise<void> => {
    try {
        await getMintPassStakingContract()?.methods?.stakePasses(amount)?.send({from: account})
    } catch {
        throw new Error("Could not stake passes")
    }
}

export const unstakePasses = async (account: string, amount: number): Promise<void> => {
    try {
        await getMintPassStakingContract()?.methods?.unStakePasses(amount)?.send({ from: account })
    } catch {
        throw new Error("Could not unstake passes")
    }
}

export const claimAllMintPasses = async (account: string): Promise<void> => {
    try {
        await getMintPassStakingContract()?.methods?.claimPassesYield(account)?.send({ from: account })
    } catch {
        throw new Error("Could not claim all mint passes")
    }
}

export const callDepositTokens = async (account: string, amount: number): Promise<void> => {
    try {
        await getTokensContract()?.methods?.depositTokens(account, toWei(amount))?.send({from: account})
    } catch {
        throw new Error("Could not deposit tokens")
    }
}

export const callWithdrawTokens = async (account: string, signedWithdrawal: SignAmountResponse): Promise<void> => {
    try {
        await getTokensContract()?.methods?.withdraw(
            signedWithdrawal.requestIdentifier,
            signedWithdrawal.amount,
            signedWithdrawal.generationDate,
            signedWithdrawal.signature,
        )?.send({ from: account })
    } catch {
        throw new Error("Could not withdraw tokens")
    }
}

export const callMintWeapons = async (account: string, signedMintWeapons: SignMintWeaponsResponse): Promise<void> => {
    try {
        await getWeaponsContract()?.methods?.mint(
            signedMintWeapons.requestIdentifier,
            signedMintWeapons.mintCount,
            signedMintWeapons.price,
            signedMintWeapons.generationDate,
            signedMintWeapons.signature,
        )?.send({ from: account })
    } catch {
        throw new Error("Could not mint weapons")
    }
}

export const claimERC20Asset = async (account: string, claimResponse: RewardClaimResponse): Promise<void> => {
    try {
        await getLootBoxRewardContract()?.methods?.claimERC20Asset(
            claimResponse.requestIdentifier,
            claimResponse.fromAddress,
            claimResponse.collectionAddress,
            claimResponse.amount,
            claimResponse.signature
        )?.send({ from: account })
    } catch {
        throw new Error("Could not perform claim for ERC20 token")
    }
}

export const callClaimERC721Asset = async (account: string, claimResponse: RewardClaimResponse): Promise<void> => {
    try {
        await getLootBoxRewardContract()?.methods?.claimERC721Asset(
            claimResponse.requestIdentifier,
            claimResponse.fromAddress,
            claimResponse.collectionAddress,
            claimResponse.tokenId,
            claimResponse.signature
        )?.send({ from: account })
    } catch {
        throw new Error("Could not perform claim for ERC721 token")
    }
}

export const claimERC1155Asset = async (account: string, claimResponse: RewardClaimResponse): Promise<void> => {
    try {
        await getLootBoxRewardContract()?.methods?.claimERC1155Asset(
            claimResponse.requestIdentifier,
            claimResponse.fromAddress,
            claimResponse.collectionAddress,
            claimResponse.tokenId,
            claimResponse.amount,
            claimResponse.signature
        )?.send({ from: account })
    } catch {
        throw new Error("Could not perform claim for ERC1155 token")
    }
}