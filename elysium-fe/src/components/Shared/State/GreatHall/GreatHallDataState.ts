import {StakeMode} from "../../Models/Token/StakeMode";
import {isStakedTokenLinked, isTokenStakedForMode} from "../../Utils/TokenUtils";
import {GenericToken} from "../../Models/Token/GenericToken";
import {AreaType, buildPairedArea} from "./AreaType";
import {GodToken} from "../../Models/Token/GodToken";
import {WeaponToken} from "../../Models/Token/WeaponToken";
import {StakingStatusResponse} from "../../Service/PublicWalletService";

type GreatHallDataState = { [key: string]: Map<number, GenericToken> | GenericToken; }

type LinkedTokens = { [key: string]: GenericToken; }
type GroupedTokens = { [key: string]: GenericToken[]; }

const getDefaultStakedGroupedGods = (): GroupedTokens => ({
    [AreaType.STAKED_GODS_1]: [],
    [AreaType.STAKED_GODS_2]: [],
    [AreaType.STAKED_GODS_3]: [],
})

const reduceTokensToMap = (tokens: GenericToken[]): Map<number, GenericToken> => tokens.reduce(
    (currentMap, token) => currentMap.set(token.tokenId, token),
    new Map<number, GenericToken>()
);

const getGroupedStakedGods = (walletTokens: StakingStatusResponse): GroupedTokens => walletTokens.stakedGods
    .reduce((currentGroups, stakedToken) => {
        const stakedGod: GodToken = stakedToken.token
        if (isTokenStakedForMode(stakedToken, StakeMode.FIRST)) {
            currentGroups[AreaType.STAKED_GODS_1].push(stakedGod)
        } else if (isTokenStakedForMode(stakedToken, StakeMode.SECOND)) {
            currentGroups[AreaType.STAKED_GODS_2].push(stakedGod)
        } else if (isTokenStakedForMode(stakedToken, StakeMode.THIRD)) {
            currentGroups[AreaType.STAKED_GODS_3].push(stakedGod)
        }
        return currentGroups
    }, getDefaultStakedGroupedGods())

const getUnlinkedStakedWeapons = (walletTokens: StakingStatusResponse): WeaponToken[] => walletTokens.stakedWeapons
    .filter(stakedToken => !isStakedTokenLinked(stakedToken)).map(staked => staked.token)

const getPairedWeapons = (walletTokens: StakingStatusResponse): LinkedTokens => walletTokens.stakedWeapons
    .filter(isStakedTokenLinked).reduce<LinkedTokens>((currentGroups, stakedWeapon) => {
        const weapon = stakedWeapon.token
        const pairedGod = stakedWeapon.pairedToken
        weapon && pairedGod && (currentGroups[buildPairedArea(pairedGod)] = weapon)
        return currentGroups
    }, {})

export const buildGreatHallDataState = (walletTokens: StakingStatusResponse): GreatHallDataState => {
    const groupedStakedGods = getGroupedStakedGods(walletTokens)
    return {
        [AreaType.UNSTAKED_GODS]: reduceTokensToMap(walletTokens.gods),
        [AreaType.STAKED_GODS_1]: reduceTokensToMap(groupedStakedGods[AreaType.STAKED_GODS_1]),
        [AreaType.STAKED_GODS_2]: reduceTokensToMap(groupedStakedGods[AreaType.STAKED_GODS_2]),
        [AreaType.STAKED_GODS_3]: reduceTokensToMap(groupedStakedGods[AreaType.STAKED_GODS_3]),
        [AreaType.UNSTAKED_WEAPONS]: reduceTokensToMap(walletTokens.weapons),
        [AreaType.UNLINKED_STAKED_WEAPONS]: reduceTokensToMap(getUnlinkedStakedWeapons(walletTokens)),
        ...getPairedWeapons(walletTokens)
    }
}

export const getDefaultDataState = (): GreatHallDataState => Object.keys(AreaType).reduce((currentState, area) => ({
    ...currentState, [area]: new Map<string, GenericToken>()
}), {})

export const isGreatHallDataValid = (walletTokens: StakingStatusResponse): boolean => !!walletTokens.gods.length ||
    !!walletTokens.weapons.length || !!walletTokens.stakedGods.length || !!walletTokens.stakedWeapons.length

export default GreatHallDataState