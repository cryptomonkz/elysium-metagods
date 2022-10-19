import {baseService} from "./BaseService";
import {extractResponseDataStrict} from "../Utils/RequestUtils";
import {GenericToken} from "../Models/Token/GenericToken";
import {ItemType} from "../State/GreatHall/ItemType";
import {StakeGod} from "../Models/Staking/StakeGod";
import {StakePairing} from "../Models/Staking/StakePairing";

const STAKING_CONTROLLER = '/api/staking'
const STAKE_ENDPOINT = `${STAKING_CONTROLLER}/stake`
const UNSTAKE_ENDPOINT = `${STAKING_CONTROLLER}/unstake`
const CHANGE_PAIRINGS_ENDPOINT = `${STAKING_CONTROLLER}/change-pairings`
const CHANGE_STAKE_TYPE_ENDPOINT = `${STAKING_CONTROLLER}/change-stake-type`
const CLAIM_YIELD_ENDPOINT = `${STAKING_CONTROLLER}/claim-yield`
const CLAIM_ALL_YIELD_ENDPOINT = `${STAKING_CONTROLLER}/claim-yield-for-all`

export type ClaimResult = { token: GenericToken, type: ItemType, amount: number, withRisk: boolean, hasWon: boolean }

export const callStakeTokens = async (
    stakedGods: StakeGod[] = [], stakedWeapons: number[] = [], stakedPairings: StakePairing[] = []
): Promise<ClaimResult[]> => {
    try {
        const response = await baseService.post<ClaimResult[]>(STAKE_ENDPOINT, {stakedGods, stakedWeapons, stakedPairings})
        return extractResponseDataStrict(response)
    } catch {
        throw new Error("Failed to stake tokens")
    }
}

export const callUnstakeTokens = async (gods: number[] = [], weapons: number[] = []): Promise<ClaimResult[]> => {
    try {
        const response = await baseService.post<ClaimResult[]>(UNSTAKE_ENDPOINT, {gods, weapons})
        return extractResponseDataStrict(response)
    } catch {
        throw new Error("Failed to unstake tokens")
    }
}

export const callChangeTokenLinks = async (
    pairedWeapons: StakePairing[] = [], weapons: number[] = []
): Promise<ClaimResult[]> => {
    try {
        const response = await baseService.post<ClaimResult[]>(CHANGE_PAIRINGS_ENDPOINT, {pairedWeapons, weapons})
        return extractResponseDataStrict(response)
    } catch {
        throw new Error("Failed to change token links")
    }
}

export const callChangeStakeTypes = async (changeRequests: StakeGod[] = []): Promise<ClaimResult[]> => {
    try {
        const response = await baseService.post<ClaimResult[]>(CHANGE_STAKE_TYPE_ENDPOINT, {gods: changeRequests})
        return extractResponseDataStrict(response)
    } catch {
        throw new Error("Failed to change stake types")
    }
}

export const callClaimAllTokens = async (): Promise<ClaimResult[]> => {
    try {
        const response = await baseService.post<ClaimResult[]>(CLAIM_ALL_YIELD_ENDPOINT)
        return extractResponseDataStrict(response)
    } catch {
        throw new Error("Failed to claim all tokens")
    }
}

export const callClaimTokens = async (
    gods: number[] = [], weapons: number[] = []
): Promise<ClaimResult[]> => {
    try {
        const response = await baseService.post<ClaimResult[]>(CLAIM_YIELD_ENDPOINT, {gods, weapons})
        return extractResponseDataStrict(response)
    } catch {
        throw new Error("Failed to claim tokens")
    }
}
