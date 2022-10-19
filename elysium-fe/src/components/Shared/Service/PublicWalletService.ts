import {baseService} from "./BaseService";
import {extractResponseDataIfOk} from "../Utils/RequestUtils";
import {GodToken} from "../Models/Token/GodToken";
import {WeaponToken} from "../Models/Token/WeaponToken";
import {GenericToken} from "../Models/Token/GenericToken";
import {StakedToken} from "../Models/Token/StakedToken";

const PUBLIC_WALLET_CONTROLLER = '/api/public/wallet'
const STAKING_STATUS_ENDPOINT = `${PUBLIC_WALLET_CONTROLLER}/staking`
const CLAIMS_STATUS_ENDPOINT = `${PUBLIC_WALLET_CONTROLLER}/claims`
const VAULT_STATUS_ENDPOINT = `${PUBLIC_WALLET_CONTROLLER}/vault`

export type StakingStatusResponse = { gods: GodToken[], weapons: WeaponToken[], stakedGods: StakedToken[], stakedWeapons: StakedToken[] }
const getEmptyStakingStatusResponse = (): StakingStatusResponse => ({ gods: [], weapons: [], stakedGods: [], stakedWeapons: [] })

export const getStakingStatus = async (account: string): Promise<StakingStatusResponse> => {
    try{
        const response = await baseService.get<StakingStatusResponse>(`${STAKING_STATUS_ENDPOINT}/${account}`)
        return extractResponseDataIfOk(response) || getEmptyStakingStatusResponse()
    } catch {
        return getEmptyStakingStatusResponse()
    }
}

export type TokenClaim = { token: GenericToken, amount: number }
export type ClaimsStatusResponse = { godsClaims: TokenClaim[], weaponsClaims: TokenClaim[] }
const getEmptyClaimsStatusResponse = (): ClaimsStatusResponse => ({godsClaims: [], weaponsClaims: []})

export const getClaimsStatus = async (account: string): Promise<ClaimsStatusResponse> => {
    try{
        const response = await baseService.get<ClaimsStatusResponse>(`${CLAIMS_STATUS_ENDPOINT}/${account}`)
        return extractResponseDataIfOk(response) || getEmptyClaimsStatusResponse()
    } catch {
        return getEmptyClaimsStatusResponse()
    }
}

export type VaultStatusResponse = { godsCount: number, stakedGodsCount: number, stakedWeaponsCount: number, inGameBalance: number, blockedBalance: number, claimableBalance: number }
const getEmptyVaultStatusResponse = (): VaultStatusResponse => ({ godsCount: 0, stakedGodsCount: 0, stakedWeaponsCount: 0, inGameBalance: 0, blockedBalance: 0, claimableBalance: 0 })

export const getVaultStatus = async (account: string): Promise<VaultStatusResponse> => {
    try{
        const response = await baseService.get<VaultStatusResponse>(`${VAULT_STATUS_ENDPOINT}/${account}`)
        return extractResponseDataIfOk(response) || getEmptyVaultStatusResponse()
    } catch {
        return getEmptyVaultStatusResponse()
    }
}